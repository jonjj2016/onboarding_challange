import { useCallback } from 'react';
import { useLazyQuery } from '@apollo/client';
import { type DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

import { GET_PRODUCTS } from 'queries/products';
import { ProductItem } from '../content-edit.types';

interface ProductsQueryResult {
  products: { data: ProductItem[] };
}

export const useProductPicker = (
  value: ProductItem[],
  onChange: (products: ProductItem[]) => void,
) => {
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

  return {
    sensors,
    loadOptions,
    handleSelect,
    handleRemove,
    handleDragEnd,
  };
};
