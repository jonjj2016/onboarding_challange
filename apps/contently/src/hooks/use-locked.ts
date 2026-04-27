import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface LockStatus {
  isLocked: boolean;
  owner: string | null;
}

export const useContentLock = (): LockStatus => {
  const { id } = useParams<{ id: string }>();

  const [lockStatus, setLockStatus] = useState<LockStatus>({
    isLocked: false,
    owner: null,
  });

  // Memoize acquireLock so it only changes when 'id' changes
  const acquireLock = useCallback(async () => {
    if (!id) return;
    try {
      const response = await fetch(`/api/locks/${id}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        // Successfully acquired or renewed the lock
        setLockStatus({ isLocked: false, owner: null });
      } else if (response.status === 423) {
        // 423 Locked: Someone else has it
        const data = (await response.json()) as { user: string };
        setLockStatus({ isLocked: true, owner: data.user });
      }
    } catch {
      // Network error — keep current lock status
    }
  }, [id]);

  // Memoize releaseLock
  const releaseLock = useCallback(() => {
    if (!id) return;
    fetch(`/api/locks/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    }).catch(() => {
      // Best-effort release — server TTL handles cleanup
    });
  }, [id]);

  useEffect(() => {
    if (!id) return;

    // Initial acquisition
    acquireLock();

    // Setup polling interval
    const interval = setInterval(acquireLock, 5000);

    return () => {
      clearInterval(interval);
      releaseLock();
    };

    // Including stable function references satisfies exhaustive-deps
  }, [id, acquireLock, releaseLock]);

  return lockStatus;
};
