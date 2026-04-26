import { Controller } from 'react-hook-form';
import { useQuery } from '@apollo/client';

import { Box, Button, Divider, FormInput, FormSelect, Typography } from '@contently/toolkit';
import {
  ProductPicker,
  RichTextEditor,
  useContentCreate,
  useSlugCheck,
} from 'modules/content-edit';
import { GET_AUTHORS } from 'queries/authors';
import { useSiteStore } from 'stores/use-site-store';

interface AuthorsResult {
  authors: { data: { id: string; name: string }[] };
}

export default function ContentNewPage() {
  const { form, products, setProducts, isCreating, onSubmit, handleTitleChange, handleSlugChange } =
    useContentCreate();

  const activeSite = useSiteStore((s) => s.activeSite);
  const {
    control,
    watch,
    setValue,
    formState: { errors, isValid },
  } = form;

  const slug = watch('slug');
  const { isAvailable, isChecking } = useSlugCheck(slug);

  const { data: authorsData } = useQuery<AuthorsResult>(GET_AUTHORS, {
    variables: { pageSize: 100 },
  });
  const authors = authorsData?.authors.data ?? [];

  const slugError =
    errors.slug?.message ??
    (isAvailable === false && !isChecking ? 'Slug already exists for this site' : undefined);

  return (
    <Box maxWidth={900} mx="auto">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h5" fontWeight={700}>
            New content
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {activeSite} · Draft
          </Typography>
        </Box>
        <Button
          variant="primary"
          isLoading={isCreating}
          disabled={!isValid || isCreating || isAvailable === false}
          onClick={onSubmit}
        >
          Create
        </Button>
      </Box>

      <Box display="flex" flexDirection="column" gap={3}>
        {/* Title drives slug auto-fill until slug is manually edited */}
        <FormInput
          label="Title"
          value={watch('title')}
          onChange={handleTitleChange}
          error={errors.title?.message}
          maxLength={120}
        />

        <FormInput
          label="Slug"
          value={watch('slug')}
          onChange={handleSlugChange}
          error={slugError}
          helperText={isChecking ? 'Checking…' : isAvailable === true ? '✓ Available' : undefined}
        />

        <FormSelect
          label="Author"
          value={watch('authorId')}
          onChange={(val) => setValue('authorId', val, { shouldValidate: true })}
          options={[
            { value: '', label: 'Select author…' },
            ...authors.map((a) => ({ value: a.id, label: a.name })),
          ]}
          error={errors.authorId?.message}
          size="small"
        />

        <Divider />

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>
            Products
          </Typography>
          <ProductPicker value={products} onChange={setProducts} />
        </Box>

        <Divider />

        <Box>
          <Typography variant="body2" color="text.secondary" mb={0.5}>
            Body
          </Typography>
          <Controller
            name="body"
            control={control}
            render={({ field }) => (
              <RichTextEditor
                value={field.value}
                onChange={field.onChange}
                error={errors.body?.message}
              />
            )}
          />
        </Box>
      </Box>
    </Box>
  );
}
