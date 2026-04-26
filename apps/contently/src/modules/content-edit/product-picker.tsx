import { useCallback } from 'react';
import { useLazyQuery } from '@apollo/client';
import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box, Chip, Typography } from '@mui/material';

import { FormAutocomplete } from '@contently/toolkit';
import { GET_PRODUCTS } from 'queries/products';
import type { ProductItem } from './content-edit.types';

interface ProductsQueryResult {
  products: { data: ProductItem[] };
}

interface SortableChipProps {
  product: ProductItem;
  onRemove: (id: string) => void;
}

function SortableChip({ product, onRemove }: SortableChipProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: product.id,
  });

  return (
    <Box
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      sx={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'grab',
      }}
    >
      <Chip
        label={product.name}
        onDelete={() => onRemove(product.id)}
        size="small"
        sx={{ userSelect: 'none' }}
      />
    </Box>
  );
}

interface ProductPickerProps {
  value: ProductItem[];
  onChange: (products: ProductItem[]) => void;
}

export function ProductPicker({ value, onChange }: ProductPickerProps) {
  const sensors = useSensors(useSensor(PointerSensor));

  const [fetchProducts] = useLazyQuery<ProductsQueryResult>(GET_PRODUCTS, {
    fetchPolicy: 'network-only',
  });

  const loadOptions = useCallback(
    async (search: string) => {
      const result = await fetchProducts({
        variables: { search: search || undefined, pageSize: 20 },
      });
      return result.data?.products.data ?? [];
    },
    [fetchProducts],
  );

  const handleSelect = (selected: ProductItem[]) => {
    // Merge: keep existing order, append new items
    const existing = new Map(value.map((p) => [p.id, p]));
    const merged = [
      ...value.filter((p) => selected.some((s) => s.id === p.id)),
      ...selected.filter((s) => !existing.has(s.id)),
    ];
    onChange(merged);
  };

  const handleRemove = (id: string) => {
    onChange(value.filter((p) => p.id !== id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = value.findIndex((p) => p.id === active.id);
    const newIndex = value.findIndex((p) => p.id === over.id);
    onChange(arrayMove(value, oldIndex, newIndex));
  };

  return (
    <Box>
      <FormAutocomplete<ProductItem>
        label="Products"
        value={value}
        onChange={handleSelect}
        loadOptions={loadOptions}
        getOptionLabel={(p) => p.name}
        getOptionKey={(p) => p.id}
        debounceMs={300}
      />

      {value.length > 0 && (
        <Box mt={2}>
          <Typography variant="caption" color="text.secondary" mb={1} display="block">
            Drag to reorder
          </Typography>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={value.map((p) => p.id)}
              strategy={horizontalListSortingStrategy}
            >
              <Box display="flex" flexWrap="wrap" gap={1}>
                {value.map((product) => (
                  <SortableChip key={product.id} product={product} onRemove={handleRemove} />
                ))}
              </Box>
            </SortableContext>
          </DndContext>
        </Box>
      )}
    </Box>
  );
}
