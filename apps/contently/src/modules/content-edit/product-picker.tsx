import { closestCenter, DndContext } from '@dnd-kit/core';
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';

import { Box, FormAutocomplete, Typography } from '@contently/toolkit';
import { SortableProducts } from 'components/ui/sortable-product';
import type { ProductItem } from './content-edit.types';
import { useProductPicker } from './hooks/use-product-picker';

interface ProductPickerProps {
  value: ProductItem[];
  onChange: (products: ProductItem[]) => void;
}

export function ProductPicker({ value, onChange }: ProductPickerProps) {
  const { sensors, loadOptions, handleSelect, handleRemove, handleDragEnd } = useProductPicker(
    value,
    onChange,
  );

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
                  <SortableProducts key={product.id} product={product} onRemove={handleRemove} />
                ))}
              </Box>
            </SortableContext>
          </DndContext>
        </Box>
      )}
    </Box>
  );
}
