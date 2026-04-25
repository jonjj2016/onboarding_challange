import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useDebounce } from 'hooks/use-debounce';
import { useSiteStore } from 'stores/use-site-store';
import { IS_SLUG_AVAILABLE } from 'queries/content';

interface SlugCheckResult {
  isAvailable: boolean | null;
  isChecking: boolean;
}

export function useSlugCheck(slug: string, excludeId?: string): SlugCheckResult {
  const activeSite = useSiteStore((s) => s.activeSite);
  const debouncedSlug = useDebounce(slug, 500);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  const [checkSlug, { loading }] = useLazyQuery<{ isSlugAvailable: boolean }>(IS_SLUG_AVAILABLE, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => setIsAvailable(data.isSlugAvailable),
  });

  useEffect(() => {
    if (!debouncedSlug) {
      setIsAvailable(null);
      return;
    }
    checkSlug({
      variables: { slug: debouncedSlug, site: activeSite, excludeId },
    });
  }, [debouncedSlug, activeSite, excludeId, checkSlug]);

  return { isAvailable, isChecking: loading };
}
