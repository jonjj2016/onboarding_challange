import { act } from '@testing-library/react';
import { useSiteStore } from '../stores/use-site-store';

// Reset store between tests
beforeEach(() => {
  useSiteStore.setState({ activeSite: 'site-us-cooking' });
});

describe('useSiteStore', () => {
  it('has site-us-cooking as default', () => {
    const site = useSiteStore.getState().activeSite;
    expect(site).toBe('site-us-cooking');
  });

  it('updates active site via setActiveSite', () => {
    act(() => {
      useSiteStore.getState().setActiveSite('site-us-fashion');
    });
    expect(useSiteStore.getState().activeSite).toBe('site-us-fashion');
  });

  it('can switch to all three sites', () => {
    const sites = ['site-us-cooking', 'site-us-fashion', 'site-us-travel'] as const;
    for (const site of sites) {
      act(() => {
        useSiteStore.getState().setActiveSite(site);
      });
      expect(useSiteStore.getState().activeSite).toBe(site);
    }
  });
});
