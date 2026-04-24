import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const SITES = ['site-us-cooking', 'site-us-fashion', 'site-us-travel'] as const;

export type Site = (typeof SITES)[number];

interface SiteStore {
  activeSite: Site;
  setActiveSite: (site: Site) => void;
}

export const useSiteStore = create<SiteStore>()(
  persist(
    (set) => ({
      activeSite: 'site-us-cooking',
      setActiveSite: (site) => set({ activeSite: site }),
    }),
    { name: 'contently-site' },
  ),
);
