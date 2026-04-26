import { useQuery } from '@apollo/client';
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';

import { FormInput } from '@contently/toolkit';
import { GET_AUTHORS } from 'queries/authors';
import type { SortOption } from './content-list.types';
import { SORT_OPTIONS, STATUS_FILTER_OPTIONS } from './content-list.types';

interface Author {
  id: string;
  name: string;
}

interface AuthorsQueryResult {
  authors: { data: Author[] };
}

interface ContentFiltersProps {
  search: string;
  status: string;
  authorId: string;
  sort: SortOption;
  onSearchChange: (val: string) => void;
  onStatusChange: (val: string) => void;
  onAuthorChange: (val: string) => void;
  onSortChange: (val: SortOption) => void;
}

export default function ContentFilters({
  search,
  status,
  authorId,
  sort,
  onSearchChange,
  onStatusChange,
  onAuthorChange,
  onSortChange,
}: ContentFiltersProps) {
  const { data: authorsData } = useQuery<AuthorsQueryResult>(GET_AUTHORS, {
    variables: { pageSize: 100 },
  });

  const authors = authorsData?.authors.data ?? [];

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="subtitle2" fontWeight={600} color="text.secondary">
        FILTERS
      </Typography>

      <FormInput
        label="Search"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search title or body…"
        size="small"
      />

      <FormControl fullWidth size="small">
        <InputLabel>Status</InputLabel>
        <Select label="Status" value={status} onChange={(e) => onStatusChange(e.target.value)}>
          {STATUS_FILTER_OPTIONS.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth size="small">
        <InputLabel>Author</InputLabel>
        <Select label="Author" value={authorId} onChange={(e) => onAuthorChange(e.target.value)}>
          <MenuItem value="">All authors</MenuItem>
          {authors.map((a) => (
            <MenuItem key={a.id} value={a.id}>
              {a.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth size="small">
        <InputLabel>Sort</InputLabel>
        <Select
          label="Sort"
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
        >
          {SORT_OPTIONS.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
