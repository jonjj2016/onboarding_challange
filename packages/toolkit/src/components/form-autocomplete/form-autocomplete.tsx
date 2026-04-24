import { useCallback, useEffect, useRef, useState } from 'react';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';

export interface FormAutocompleteProps<T> {
  label: string;
  value: T[];
  onChange: (value: T[]) => void;
  loadOptions: (search: string) => Promise<T[]>;
  getOptionLabel: (option: T) => string;
  getOptionKey: (option: T) => string;
  debounceMs?: number;
  error?: string;
  isDisabled?: boolean;
}

export function FormAutocomplete<T>({
  label,
  value,
  onChange,
  loadOptions,
  getOptionLabel,
  getOptionKey,
  debounceMs = 300,
  error,
  isDisabled = false,
}: FormAutocompleteProps<T>) {
  const [options, setOptions] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchOptions = useCallback(
    (search: string) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(async () => {
        setIsLoading(true);
        try {
          const results = await loadOptions(search);
          setOptions(results);
        } finally {
          setIsLoading(false);
        }
      }, debounceMs);
    },
    [loadOptions, debounceMs],
  );

  useEffect(() => {
    fetchOptions('');
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [fetchOptions]);

  return (
    <Autocomplete
      multiple
      value={value}
      options={options}
      loading={isLoading}
      disabled={isDisabled}
      inputValue={inputValue}
      onInputChange={(_, newInput) => {
        setInputValue(newInput);
        fetchOptions(newInput);
      }}
      onChange={(_, newValue) => onChange(newValue)}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={(option, val) => getOptionKey(option) === getOptionKey(val)}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          error={!!error}
          helperText={error}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading && <CircularProgress size={16} />}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}
