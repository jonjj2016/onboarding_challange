import { create } from 'zustand';

type Severity = 'success' | 'error' | 'info' | 'warning';

interface SnackbarStore {
  isOpen: boolean;
  message: string;
  severity: Severity;
  show: (message: string, severity?: Severity) => void;
  hide: () => void;
}

export const useSnackbarStore = create<SnackbarStore>((set) => ({
  isOpen: false,
  message: '',
  severity: 'success',
  show: (message, severity = 'success') => set({ isOpen: true, message, severity }),
  hide: () => set({ isOpen: false }),
}));
