export interface ContentEditFormValues {
  title: string;
  slug: string;
  body: string;
  authorId: string;
}

export interface ProductItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

export interface FullContent {
  id: string;
  title: string;
  slug: string;
  body: string;
  status: number;
  authorId: string;
  site: string;
  updatedAt: string;
  author: { id: string; name: string; email: string };
  products: ProductItem[];
}

export const CONTENT_STATUS = {
  Draft: 1,
  Scheduled: 2,
  Published: 3,
  Deleted: 4,
  Unpublished: 5,
} as const;

export const STATUS_LABELS: Record<number, string> = {
  1: 'Draft',
  3: 'Published',
  5: 'Unpublished',
};

export const STATUS_CHIP_COLOR: Record<number, 'default' | 'success' | 'warning'> = {
  1: 'default',
  3: 'success',
  5: 'warning',
};
