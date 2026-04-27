import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Box, ProductCard } from '@contently/toolkit';
import { ProductItem } from 'modules/content-edit';

interface SortableChipProps {
  product: ProductItem;
  onRemove: (id: string) => void;
}
export const SortableProducts = ({ product, onRemove }: SortableChipProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: product.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
    zIndex: isDragging ? 1 : 0,
    cursor: 'grab',
  };

  return (
    <Box ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <ProductCard product={product} onRemove={onRemove} />
    </Box>
  );
};
