export type { StatusChipColor, StatusConfigEntry } from '@contently/types';
export { STATUS_CONFIG, STATUS_FILTER_OPTIONS } from '@contently/types';

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

export const PAGE_SIZE = 10;
