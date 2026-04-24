import { useEffect, useState } from 'react';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { Loading } from '../loading/loading';

export interface SelectOption {
  value: string;
  label: string;
}

export interface FormSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[] | (() => Promise<SelectOption[]>);
  error?: string;
  isDisabled?: boolean;
}

export function FormSelect({
  label,
  value,
  onChange,
  options,
  error,
  isDisabled = false,
}: FormSelectProps) {
  const [resolvedOptions, setResolvedOptions] = useState<SelectOption[]>(
    Array.isArray(options) ? options : [],
  );
  const [isLoading, setIsLoading] = useState(!Array.isArray(options));

  useEffect(() => {
    if (typeof options === 'function') {
      setIsLoading(true);
      options()
        .then(setResolvedOptions)
        .finally(() => setIsLoading(false));
    }
  }, [options]);

  const labelId = `form-select-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <FormControl fullWidth error={!!error} disabled={isDisabled || isLoading}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        value={value}
        label={label}
        onChange={(e) => onChange(e.target.value)}
        endAdornment={isLoading ? <Loading size="small" /> : undefined}
      >
        {resolvedOptions.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
