import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAuth } from 'contexts/auth-context';
import { CREATE_CONTENT, UPDATE_CONTENT_PRODUCTS } from 'queries/content';
import { useSiteStore } from 'stores/use-site-store';
import { useSnackbarStore } from 'stores/use-snackbar-store';
import { slugify } from 'utils/slugify';
import { contentEditSchema } from '../content-edit.schema';
import type { ContentEditFormValues, ProductItem } from '../content-edit.types';

export const useContentCreate = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const activeSite = useSiteStore((s) => s.activeSite);
  const show = useSnackbarStore((s) => s.show);

  const [products, setProducts] = useState<ProductItem[]>([]);

  // Track whether the user has manually edited the slug.
  // While false, slug stays in sync with the title automatically.
  const isSlugTouched = useRef(false);

  const form = useForm<ContentEditFormValues>({
    resolver: yupResolver(contentEditSchema),
    defaultValues: { title: '', slug: '', body: '', authorId: user?.id ?? '' },
    mode: 'onChange',
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setValue('title', e.target.value, { shouldValidate: true, shouldDirty: true });
    if (!isSlugTouched.current) {
      form.setValue('slug', slugify(e.target.value), { shouldValidate: true });
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    isSlugTouched.current = true;
    form.setValue('slug', e.target.value, { shouldValidate: true, shouldDirty: true });
  };

  const [createContent, { loading: isCreating }] = useMutation<{
    createContent: { id: string };
  }>(CREATE_CONTENT);

  const [updateProducts] = useMutation(UPDATE_CONTENT_PRODUCTS);

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const { data } = await createContent({
        variables: {
          input: {
            title: values.title,
            slug: values.slug,
            body: values.body,
            authorId: values.authorId,
            site: activeSite,
          },
        },
      });

      const newId = data!.createContent.id;

      if (products.length > 0) {
        await updateProducts({
          variables: { contentId: newId, productIds: products.map((p) => p.id) },
        });
      }

      show('Content created', 'success');
      navigate(`/content/edit/${newId}`, { replace: true });
    } catch {
      show('Failed to create content', 'error');
    }
  });

  return { form, products, setProducts, isCreating, onSubmit, handleTitleChange, handleSlugChange };
};
