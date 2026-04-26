import { useQuery } from '@apollo/client';

import { Box, FormInput, FormSelect, Typography } from '@contently/toolkit';
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

      <FormSelect
        label="Status"
        value={status}
        onChange={onStatusChange}
        options={STATUS_FILTER_OPTIONS}
        size="small"
      />

      <FormSelect
        label="Author"
        value={authorId}
        onChange={onAuthorChange}
        options={[
          { value: '', label: 'All authors' },
          ...authors.map((a) => ({ value: a.id, label: a.name })),
        ]}
        size="small"
      />

      <FormSelect
        label="Sort"
        value={sort}
        onChange={(val) => onSortChange(val as SortOption)}
        options={SORT_OPTIONS}
        size="small"
      />
    </Box>
  );
}
