import { Box, Chip } from '@mui/material';
import { Button } from '@contently/toolkit';
import { CONTENT_STATUS, STATUS_CHIP_COLOR, STATUS_LABELS } from './content-edit.types';

interface ContentToolbarProps {
  status: number;
  isFormValid: boolean;
  isSaving: boolean;
  onSave: () => void;
  onPublish: () => void;
  onUnpublish: () => void;
}

export function ContentToolbar({
  status,
  isFormValid,
  isSaving,
  onSave,
  onPublish,
  onUnpublish,
}: ContentToolbarProps) {
  const isDisabled = !isFormValid || isSaving;

  return (
    <Box display="flex" alignItems="center" gap={2} mb={3}>
      <Chip
        label={STATUS_LABELS[status] ?? 'Unknown'}
        color={STATUS_CHIP_COLOR[status] ?? 'default'}
        size="small"
      />

      <Box flexGrow={1} />

      <Button variant="secondary" isLoading={isSaving} disabled={isDisabled} onClick={onSave}>
        Save
      </Button>

      {(status === CONTENT_STATUS.Draft || status === CONTENT_STATUS.Unpublished) && (
        <Button variant="primary" isLoading={isSaving} disabled={isDisabled} onClick={onPublish}>
          Publish
        </Button>
      )}

      {status === CONTENT_STATUS.Published && (
        <Button variant="danger" isLoading={isSaving} disabled={isDisabled} onClick={onUnpublish}>
          Unpublish
        </Button>
      )}
    </Box>
  );
}
