export enum ContentStatus {
  Draft = 1,
  Scheduled = 2,
  Published = 3,
  Deleted = 4,
  Unpublished = 5,
}

export type StatusChipColor = 'default' | 'success' | 'warning';

export interface StatusConfigEntry {
  label: string;
  color: StatusChipColor;
}

export const STATUS_CONFIG: Record<number, StatusConfigEntry> = {
  [ContentStatus.Draft]: { label: 'Draft', color: 'default' },
  [ContentStatus.Published]: { label: 'Published', color: 'success' },
  [ContentStatus.Unpublished]: { label: 'Unpublished', color: 'warning' },
};

export const STATUS_FILTER_OPTIONS: { value: string; label: string }[] = [
  { value: '', label: 'All statuses' },
  { value: String(ContentStatus.Draft), label: 'Draft' },
  { value: String(ContentStatus.Published), label: 'Published' },
  { value: String(ContentStatus.Unpublished), label: 'Unpublished' },
];

export const STATUS_LABELS: Record<number, string> = Object.fromEntries(
  Object.entries(STATUS_CONFIG).map(([k, v]) => [k, v.label]),
);

export const STATUS_CHIP_COLOR: Record<number, StatusChipColor> = Object.fromEntries(
  Object.entries(STATUS_CONFIG).map(([k, v]) => [k, v.color]),
);

export const CONTENT_STATUS = {
  Draft: ContentStatus.Draft,
  Scheduled: ContentStatus.Scheduled,
  Published: ContentStatus.Published,
  Deleted: ContentStatus.Deleted,
  Unpublished: ContentStatus.Unpublished,
} as const;
