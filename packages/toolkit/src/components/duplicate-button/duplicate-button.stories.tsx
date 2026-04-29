import { createTheme, ThemeProvider } from '@mui/material/styles';
import type { Meta, StoryObj } from '@storybook/react';

import { DuplicateButton } from './duplicate-button';

const cooking = createTheme({
  palette: { primary: { main: '#E65100' } },
  shape: { borderRadius: 6 },
});

const fashion = createTheme({
  palette: { primary: { main: '#880E4F' } },
  typography: { fontFamily: '"Playfair Display", Georgia, serif' },
  shape: { borderRadius: 2 },
});

const travel = createTheme({
  palette: { primary: { main: '#006064' } },
  shape: { borderRadius: 12 },
});

const meta: Meta<typeof DuplicateButton> = {
  title: 'Components/DuplicateButton',
  component: DuplicateButton,
  tags: ['autodocs'],
  args: { onClick: () => {} },
};

export default meta;
type Story = StoryObj<typeof DuplicateButton>;

export const Default: Story = {};

export const Small: Story = { args: { size: 'small' } };

export const Disabled: Story = { args: { disabled: true } };

export const DisabledSmall: Story = { args: { size: 'small', disabled: true } };

export const AllSiteThemes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <ThemeProvider theme={cooking}>
        <DuplicateButton {...args} />
      </ThemeProvider>
      <ThemeProvider theme={fashion}>
        <DuplicateButton {...args} />
      </ThemeProvider>
      <ThemeProvider theme={travel}>
        <DuplicateButton {...args} />
      </ThemeProvider>
    </div>
  ),
};

export const AllSiteThemesSmall: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <ThemeProvider theme={cooking}>
        <DuplicateButton {...args} size="small" />
      </ThemeProvider>
      <ThemeProvider theme={fashion}>
        <DuplicateButton {...args} size="small" />
      </ThemeProvider>
      <ThemeProvider theme={travel}>
        <DuplicateButton {...args} size="small" />
      </ThemeProvider>
    </div>
  ),
};
