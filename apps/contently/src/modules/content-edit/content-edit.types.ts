export type { StatusChipColor } from '@contently/types';
export { CONTENT_STATUS, STATUS_CHIP_COLOR, STATUS_LABELS } from '@contently/types';

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
