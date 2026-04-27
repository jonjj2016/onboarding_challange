import styled from '@emotion/styled';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import TitleIcon from '@mui/icons-material/Title';

import { Box, Divider, IconButton, Tooltip } from '@contently/toolkit';
import { isBlockActive, isMarkActive, toggleBlock, toggleMark, useSlateEditor } from './index';

const ToolbarWrapper = styled(Box)`
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 4px 8px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  background: #fafafa;
`;

const MarkButton = ({
  format,
  icon,
  title,
}: {
  format: string;
  icon: React.ReactNode;
  title: string;
}) => {
  const editor = useSlateEditor();
  const isActive = isMarkActive(editor, format);
  return (
    <Tooltip title={title}>
      <IconButton
        size="small"
        onMouseDown={(e) => {
          e.preventDefault();
          toggleMark(editor, format);
        }}
        sx={{ backgroundColor: isActive ? 'action.selected' : 'transparent', borderRadius: 1 }}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
};

const BlockButton = ({
  type,
  icon,
  title,
  wrap = false,
}: {
  type: 'h2' | 'ul' | 'ol';
  icon: React.ReactNode;
  title: string;
  wrap?: boolean;
}) => {
  const editor = useSlateEditor();
  const isActive = isBlockActive(editor, type);
  return (
    <Tooltip title={title}>
      <IconButton
        size="small"
        onMouseDown={(e) => {
          e.preventDefault();
          toggleBlock(editor, type, wrap);
        }}
        sx={{ backgroundColor: isActive ? 'action.selected' : 'transparent', borderRadius: 1 }}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export const EditorToolbar = () => {
  return (
    <ToolbarWrapper>
      <MarkButton format="bold" icon={<FormatBoldIcon fontSize="small" />} title="Bold (Ctrl+B)" />
      <MarkButton
        format="italic"
        icon={<FormatItalicIcon fontSize="small" />}
        title="Italic (Ctrl+I)"
      />
      <MarkButton
        format="underline"
        icon={<FormatUnderlinedIcon fontSize="small" />}
        title="Underline (Ctrl+U)"
      />
      <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
      <BlockButton type="h2" icon={<TitleIcon fontSize="small" />} title="Heading 2" />
      <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
      <BlockButton
        type="ul"
        icon={<FormatListBulletedIcon fontSize="small" />}
        title="Bullet list"
        wrap
      />
      <BlockButton
        type="ol"
        icon={<FormatListNumberedIcon fontSize="small" />}
        title="Numbered list"
        wrap
      />
    </ToolbarWrapper>
  );
};
