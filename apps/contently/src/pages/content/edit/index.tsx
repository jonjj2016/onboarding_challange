import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { useBlocker } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Box, Divider, MenuItem, Select, Typography } from '@mui/material';

import { Button, FormInput, Loading, Modal } from '@contently/toolkit';
import {
  ContentToolbar,
  ProductPicker,
  RichTextEditor,
  useContentEdit,
  useSlugCheck,
} from 'modules/content-edit';
import { GET_AUTHORS } from 'queries/authors';

interface AuthorsResult {
  authors: { data: { id: string; name: string }[] };
}

export default function ContentEditPage() {
  const {
    form,
    content,
    isLoadingContent,
    isSaving,
    isDirty,
    currentStatus,
    products,
    setProducts,
    contentId,
    onSave,
    onPublish,
    onUnpublish,
  } = useContentEdit();

  const {
    register,
    control,
    watch,
    formState: { errors, isValid },
  } = form;

  const slug = watch('slug');
  const { isAvailable, isChecking } = useSlugCheck(slug, contentId);

  const { data: authorsData } = useQuery<AuthorsResult>(GET_AUTHORS, {
    variables: { pageSize: 100 },
  });
  const authors = authorsData?.authors.data ?? [];

  // Unsaved changes guard
  const blocker = useBlocker(isDirty);

  useEffect(() => {
    if (blocker.state === 'blocked' && !isDirty) {
      blocker.proceed();
    }
  }, [blocker, isDirty]);

  if (isLoadingContent) {
    return <Loading isCentered />;
  }

  const slugError =
    errors.slug?.message ??
    (isAvailable === false && !isChecking ? 'Slug already exists for this site' : undefined);

  return (
    <Box maxWidth={900} mx="auto">
      <ContentToolbar
        status={currentStatus}
        isFormValid={isValid}
        isSaving={isSaving}
        onSave={onSave}
        onPublish={onPublish}
        onUnpublish={onUnpublish}
      />

      <Box display="flex" flexDirection="column" gap={3}>
        <FormInput
          {...register('title')}
          label="Title"
          error={errors.title?.message}
          maxLength={120}
          value={watch('title')}
        />

        <FormInput
          {...register('slug')}
          label="Slug"
          error={slugError}
          helperText={isChecking ? 'Checking…' : isAvailable === true ? '✓ Available' : undefined}
          value={watch('slug')}
        />

        <Box>
          <Typography variant="body2" color="text.secondary" mb={0.5}>
            Author
          </Typography>
          <Controller
            name="authorId"
            control={control}
            render={({ field }) => (
              <Select {...field} fullWidth size="small" error={!!errors.authorId}>
                <MenuItem value="">Select author…</MenuItem>
                {authors.map((a) => (
                  <MenuItem key={a.id} value={a.id}>
                    {a.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </Box>

        <Box>
          <Typography variant="body2" color="text.secondary" mb={0.5}>
            Body
          </Typography>
          {/* Only mount the editor once content.body is available.
              field.value may be '' on first render due to React 18 batching
              the Apollo update and RHF reset separately — content.body is
              the source of truth for initialization. */}
          {content && (
            <Controller
              name="body"
              control={control}
              render={({ field }) => (
                <RichTextEditor
                  key={content.id}
                  value={content.body}
                  onChange={field.onChange}
                  error={errors.body?.message}
                />
              )}
            />
          )}
        </Box>

        <Divider />

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>
            Products
          </Typography>
          <ProductPicker value={products} onChange={setProducts} />
        </Box>
      </Box>

      {/* Unsaved changes modal */}
      <Modal
        isOpen={blocker.state === 'blocked'}
        onClose={() => blocker.reset?.()}
        title="Unsaved changes"
      >
        <Typography mb={3}>You have unsaved changes. Leave without saving?</Typography>
        <Box display="flex" gap={2} justifyContent="flex-end">
          <Button variant="secondary" onClick={() => blocker.reset?.()}>
            Stay
          </Button>
          <Button variant="danger" onClick={() => blocker.proceed?.()}>
            Leave
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
