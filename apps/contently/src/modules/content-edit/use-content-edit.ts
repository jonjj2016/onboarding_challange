import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbarStore } from 'stores/use-snackbar-store';
import { useSiteStore } from 'stores/use-site-store';
import { GET_CONTENT, UPDATE_CONTENT, UPDATE_CONTENT_PRODUCTS } from 'queries/content';
import { contentEditSchema } from './content-edit.schema';
import type { ContentEditFormValues, FullContent, ProductItem } from './content-edit.types';
import { CONTENT_STATUS } from './content-edit.types';

interface ContentQueryResult {
  content: FullContent;
}

export function useContentEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const activeSite = useSiteStore((s) => s.activeSite);
  const show = useSnackbarStore((s) => s.show);

  const [products, setProducts] = useState<ProductItem[]>([]);
  const [initialProducts, setInitialProducts] = useState<ProductItem[]>([]);

  const { data, loading: isLoadingContent } = useQuery<ContentQueryResult>(GET_CONTENT, {
    variables: { id },
    skip: !id,
    onCompleted: (result) => {
      const content = result.content;
      form.reset({
        title: content.title,
        slug: content.slug,
        body: content.body,
        authorId: content.authorId,
      });
      // Trigger validation so isValid reflects the loaded values immediately
      void form.trigger();
      setProducts(content.products);
      setInitialProducts(content.products);
    },
  });

  const form = useForm<ContentEditFormValues>({
    resolver: yupResolver(contentEditSchema),
    defaultValues: { title: '', slug: '', body: '', authorId: '' },
    mode: 'onChange', // validate on every change so isValid updates immediately
  });

  const [updateContent, { loading: isSaving }] = useMutation(UPDATE_CONTENT);
  const [updateProducts] = useMutation(UPDATE_CONTENT_PRODUCTS);

  const currentStatus = data?.content.status ?? CONTENT_STATUS.Draft;

  const productsChanged =
    JSON.stringify(products.map((p) => p.id)) !== JSON.stringify(initialProducts.map((p) => p.id));

  const isDirty = form.formState.isDirty || productsChanged;

  const save = async (statusOverride?: number) => {
    const values = form.getValues();
    try {
      await updateContent({
        variables: {
          id,
          input: {
            title: values.title,
            slug: values.slug,
            body: values.body,
            authorId: values.authorId,
            ...(statusOverride !== undefined && { status: statusOverride }),
          },
        },
      });

      await updateProducts({
        variables: {
          contentId: id,
          productIds: products.map((p) => p.id),
        },
      });

      setInitialProducts(products);
      form.reset(values);
      show('Saved successfully', 'success');
    } catch {
      show('Failed to save', 'error');
    }
  };

  return {
    form,
    content: data?.content,
    isLoadingContent,
    isSaving,
    isDirty,
    currentStatus,
    products,
    setProducts,
    activeSite,
    contentId: id,
    onSave: () => form.handleSubmit(() => save())(),
    onPublish: () => form.handleSubmit(() => save(CONTENT_STATUS.Published))(),
    onUnpublish: () => form.handleSubmit(() => save(CONTENT_STATUS.Unpublished))(),
    navigate,
  };
}
