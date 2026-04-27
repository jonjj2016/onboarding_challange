import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { useBlocker } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import {
  Box,
  Button,
  Divider,
  FormInput,
  FormSelect,
  Loading,
  Modal,
  Typography,
} from '@contently/toolkit';
import { useContentLock } from 'hooks/use-locked';
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

const ContentEditPage = () => {
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
  const { isLocked, owner } = useContentLock();
  const {
    register,
    control,
    watch,
    setValue,
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
    if (blocker.state === 'blocked' && !isDirty && !isLocked) {
      blocker.proceed();
    }
  }, [blocker, isDirty, isLocked]);

  if (isLoadingContent) {
    return <Loading isCentered />;
  }

  const slugError =
    errors.slug?.message ??
    (isAvailable === false && !isChecking ? 'Slug already exists for this site' : undefined);

  return (
    <Box maxWidth={900} mx="auto">
      {isLocked && (
        <Box
          sx={{
            bgcolor: 'warning.light',
            border: '1px solid',
            borderColor: 'warning.main',
            borderRadius: 1,
            px: 2,
            py: 1.5,
            mb: 2,
          }}
        >
          <Typography variant="body2">
            <strong>Read-only:</strong> This content is currently being edited by{' '}
            <strong>{owner}</strong>. Your changes cannot be saved until they finish.
          </Typography>
        </Box>
      )}
      <ContentToolbar
        status={currentStatus}
        isFormValid={isValid && !isLocked}
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
};
export default ContentEditPage;
