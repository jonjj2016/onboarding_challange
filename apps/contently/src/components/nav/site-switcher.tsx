import { MenuItem, Select } from '@contently/toolkit';
import type { Site } from 'stores/use-site-store';
import { SITES, useSiteStore } from 'stores/use-site-store';

const SITE_LABELS: Record<Site, string> = {
  'site-us-cooking': 'US Cooking',
  'site-us-fashion': 'US Fashion',
  'site-us-travel': 'US Travel',
};

const SiteSwitcher = () => {
  const activeSite = useSiteStore((s) => s.activeSite);
  const setActiveSite = useSiteStore((s) => s.setActiveSite);

  return (
    <Select
      value={activeSite}
      onChange={(e) => setActiveSite(e.target.value as Site)}
      size="small"
      sx={{
        color: 'white',
        '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
        '& .MuiSvgIcon-root': { color: 'white' },
      }}
    >
      {SITES.map((site) => (
        <MenuItem key={site} value={site}>
          {SITE_LABELS[site]}
        </MenuItem>
      ))}
    </Select>
  );
};
export default SiteSwitcher;
