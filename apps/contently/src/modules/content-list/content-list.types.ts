export interface ContentListItem {
  id: string;
  title: string;
  slug: string;
  status: number;
  updatedAt: string;
  author: { id: string; name: string };
  products: { id: string }[];
}

export type SortOption = 'updated_desc' | 'updated_asc' | 'title_asc' | 'title_desc';

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'updated_desc', label: 'Recently updated' },
  { value: 'updated_asc', label: 'Oldest updated' },
  { value: 'title_asc', label: 'Title A–Z' },
  { value: 'title_desc', label: 'Title Z–A' },
];

export const STATUS_CONFIG = {
  1: { label: 'Draft', color: 'default' as const },
  3: { label: 'Published', color: 'success' as const },
  5: { label: 'Unpublished', color: 'warning' as const },
};

export const STATUS_FILTER_OPTIONS = [
  { value: '', label: 'All statuses' },
  { value: '1', label: 'Draft' },
  { value: '3', label: 'Published' },
  { value: '5', label: 'Unpublished' },
];

export const PAGE_SIZE = 10;
