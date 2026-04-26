import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { useDebounce } from 'hooks/use-debounce';
import { GET_CONTENT_IDS_BY_PRODUCT_SEARCH, GET_CONTENTS } from 'queries/content';
import { useSiteStore } from 'stores/use-site-store';
import type { ContentListItem, SortOption } from './content-list.types';
import { PAGE_SIZE } from './content-list.types';

interface ContentsQueryResult {
  contents: {
    data: ContentListItem[];
    meta: { total: number; page: number; pageSize: number };
  };
}

export interface UseContentListReturn {
  contents: ContentListItem[];
  total: number;
  isLoading: boolean;
  page: number;
  search: string;
  status: string;
  authorId: string;
  sort: SortOption;
  setSearch: (val: string) => void;
  setStatus: (val: string) => void;
  setAuthorId: (val: string) => void;
  setSort: (val: SortOption) => void;
  setPage: (val: number) => void;
}

export function useContentList(): UseContentListReturn {
  const [params, setParams] = useSearchParams();
  const activeSite = useSiteStore((s) => s.activeSite);

  const search = params.get('search') ?? '';
  const status = params.get('status') ?? '';
  const authorId = params.get('authorId') ?? '';
  const sort = (params.get('sort') ?? 'updated_desc') as SortOption;
  const page = Number(params.get('page') ?? '1');

  const debouncedSearch = useDebounce(search, 500);

  const { data: productSearchData } = useQuery<{ contentIdsByProductSearch: string[] }>(
    GET_CONTENT_IDS_BY_PRODUCT_SEARCH,
    { variables: { search: debouncedSearch }, skip: !debouncedSearch },
  );

  const productMatchedIds = productSearchData?.contentIdsByProductSearch ?? [];

  const { data, loading } = useQuery<ContentsQueryResult>(GET_CONTENTS, {
    variables: {
      site: activeSite,
      page,
      pageSize: PAGE_SIZE,
      search: debouncedSearch || undefined,
      status: status ? Number(status) : undefined,
      authorId: authorId || undefined,
      sort,
      contentIds: debouncedSearch && productMatchedIds.length ? productMatchedIds : undefined,
    },
  });

  // Update a single param and reset page to 1
  const setParam = useCallback(
    (key: string, value: string) => {
      setParams((prev) => {
        const next = new URLSearchParams(prev);
        if (value) {
          next.set(key, value);
        } else {
          next.delete(key);
        }
        next.set('page', '1');
        return next;
      });
    },
    [setParams],
  );

  const setPage = useCallback(
    (val: number) => {
      setParams((prev) => {
        const next = new URLSearchParams(prev);
        next.set('page', String(val));
        return next;
      });
    },
    [setParams],
  );

  return {
    contents: data?.contents.data ?? [],
    total: data?.contents.meta.total ?? 0,
    isLoading: loading,
    page,
    search,
    status,
    authorId,
    sort,
    setSearch: (val) => setParam('search', val),
    setStatus: (val) => setParam('status', val),
    setAuthorId: (val) => setParam('authorId', val),
    setSort: (val) => setParam('sort', val),
    setPage,
  };
}
