import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { Box, FormHelperText } from '@mui/material';
import {
  type BaseEditor,
  createEditor,
  type Descendant,
  Editor,
  Element as SlateElement,
  Range,
  Transforms,
} from 'slate';
import { type HistoryEditor, withHistory } from 'slate-history';
import { Editable, type ReactEditor, Slate, withReact } from 'slate-react';

import { deserializeFromHtml, serializeToHtml } from './html-utils';
import { EditorToolbar } from './toolbar';

type CustomText = { text: string; bold?: boolean; italic?: boolean; underline?: boolean };
type BlockType = 'p' | 'h2' | 'ul' | 'ol' | 'li' | 'blockquote';
type BlockElement = { type: BlockType; children: Descendant[] };
type LinkElement = { type: 'a'; url: string; children: Descendant[] };
type CustomElement = BlockElement | LinkElement;

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const withLinks = <T extends BaseEditor & ReactEditor & HistoryEditor>(ed: T): T => {
  const { isInline } = ed;
  ed.isInline = (element) => (element as CustomElement).type === 'a' || isInline(element);
  return ed;
};

export const SlateEditorContext = createContext<(BaseEditor & ReactEditor & HistoryEditor) | null>(
  null,
);

export const useSlateEditor = () => {
  const editor = useContext(SlateEditorContext);
  if (!editor) throw new Error('Must be inside RichTextEditor');
  return editor;
};

export const isMarkActive = (
  editor: BaseEditor & ReactEditor & HistoryEditor,
  format: string,
): boolean => {
  const marks = Editor.marks(editor);
  return marks ? (marks as Record<string, boolean>)[format] === true : false;
};

export const toggleMark = (
  editor: BaseEditor & ReactEditor & HistoryEditor,
  format: string,
): void => {
  if (isMarkActive(editor, format)) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const isBlockActive = (
  editor: BaseEditor & ReactEditor & HistoryEditor,
  type: string,
): boolean => {
  const [match] = Editor.nodes(editor, {
    match: (n) => SlateElement.isElement(n) && (n as CustomElement).type === type,
  });
  return !!match;
};

export const toggleBlock = (
  editor: BaseEditor & ReactEditor & HistoryEditor,
  type: BlockType,
  wrap = false,
): void => {
  const isActive = isBlockActive(editor, type);
  if (wrap) {
    Transforms.unwrapNodes(editor, {
      match: (n) => SlateElement.isElement(n) && ['ul', 'ol'].includes((n as CustomElement).type),
      split: true,
    });
    if (!isActive) {
      Transforms.wrapNodes(editor, { type, children: [] });
      Transforms.setNodes(editor, { type: 'li' });
    } else {
      Transforms.setNodes(editor, { type: 'p' });
    }
    return;
  }
  Transforms.setNodes(editor, { type: isActive ? 'p' : type });
};

export const isLinkActive = (editor: BaseEditor & ReactEditor & HistoryEditor): boolean => {
  const [link] = Editor.nodes(editor, {
    match: (n) => SlateElement.isElement(n) && (n as CustomElement).type === 'a',
  });
  return !!link;
};

export const toggleLink = (editor: BaseEditor & ReactEditor & HistoryEditor): void => {
  if (isLinkActive(editor)) {
    Transforms.unwrapNodes(editor, {
      match: (n) => SlateElement.isElement(n) && (n as CustomElement).type === 'a',
    });
    return;
  }

  const url = window.prompt('Enter URL:');
  if (!url) return;

  const { selection } = editor;
  if (!selection) return;

  if (Range.isCollapsed(selection)) {
    Transforms.insertNodes(editor, { type: 'a', url, children: [{ text: url }] });
  } else {
    Transforms.wrapNodes(editor, { type: 'a', url, children: [] }, { split: true });
    Transforms.collapse(editor, { edge: 'end' });
  }
};

const renderElement = ({
  attributes,
  children,
  element,
}: {
  attributes: Record<string, unknown>;
  children: React.ReactNode;
  element: CustomElement;
}) => {
  if (element.type === 'a') {
    return (
      <a {...attributes} href={element.url} style={{ color: '#1976d2' }}>
        {children}
      </a>
    );
  }
  switch (element.type) {
    case 'h2':
      return <h2 {...attributes}>{children}</h2>;
    case 'blockquote':
      return (
        <blockquote
          {...attributes}
          style={{
            borderLeft: '4px solid #e0e0e0',
            margin: '8px 0',
            paddingLeft: '16px',
            color: '#666',
            fontStyle: 'italic',
          }}
        >
          {children}
        </blockquote>
      );
    case 'ul':
      return (
        <ul {...attributes} style={{ listStyleType: 'disc', paddingLeft: 24 }}>
          {children}
        </ul>
      );
    case 'ol':
      return (
        <ol {...attributes} style={{ listStyleType: 'decimal', paddingLeft: 24 }}>
          {children}
        </ol>
      );
    case 'li':
      return <li {...attributes}>{children}</li>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const renderLeaf = ({
  attributes,
  children,
  leaf,
}: {
  attributes: Record<string, unknown>;
  children: React.ReactNode;
  leaf: CustomText;
}) => {
  let content = children;
  if (leaf.bold) content = <strong>{content}</strong>;
  if (leaf.italic) content = <em>{content}</em>;
  if (leaf.underline) content = <u>{content}</u>;
  return <span {...attributes}>{content}</span>;
};

const EditorContainer = styled(Box)`
  position: relative;
`;

// The overlay that blocks interaction
const DisabledOverlay = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  cursor: not-allowed;
  background-color: rgba(255, 255, 255, 0.3); // Optional: slight fade effect
`;
const EditorWrapper = styled(Box)`
  border: 1px solid rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  &:focus-within {
    border-color: #1976d2;
    box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2);
  }
`;

const EditableArea = styled(Editable)`
  padding: 12px 16px;
  min-height: 200px;
  outline: none;
  font-family: inherit;
  font-size: 1rem;
  line-height: 1.6;
`;

export interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  error?: string;
  disabled?: boolean;
}

export const RichTextEditor = ({
  value,
  onChange,
  error,
  disabled = false,
}: RichTextEditorProps) => {
  const editor = useMemo(() => withLinks(withHistory(withReact(createEditor()))), []);

  // oxlint-disable-next-line react-hooks/exhaustive-deps -- intentional: editor initialises once
  const initialValue = useMemo(() => deserializeFromHtml(value) as Descendant[], []);
  const [editorValue, setEditorValue] = useState<Descendant[]>(initialValue);

  const handleChange = useCallback(
    (nodes: Descendant[]) => {
      setEditorValue(nodes);
      onChange(serializeToHtml(nodes));
    },
    [onChange],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const isMod = event.ctrlKey || event.metaKey;
      if (!isMod) return;
      if (event.key === 'b') {
        event.preventDefault();
        toggleMark(editor, 'bold');
      }
      if (event.key === 'i') {
        event.preventDefault();
        toggleMark(editor, 'italic');
      }
      if (event.key === 'u') {
        event.preventDefault();
        toggleMark(editor, 'underline');
      }
      if (event.key === 'k') {
        event.preventDefault();
        toggleLink(editor);
      }
    },
    [editor],
  );

  return (
    <SlateEditorContext.Provider value={editor}>
      <Slate editor={editor} initialValue={editorValue} onChange={handleChange}>
        <EditorWrapper>
          <EditorToolbar />
          {/* <EditableArea
            disabled={disabled}
            renderElement={renderElement as never}
            renderLeaf={renderLeaf as never}
            onKeyDown={handleKeyDown}
            placeholder="Start writing…"
          /> */}
          {/* New Container for positioning */}
          <EditorContainer>
            {disabled && <DisabledOverlay />}

            <EditableArea
              readOnly={disabled} // Changed from 'disabled' to 'readOnly'
              renderElement={renderElement as never}
              renderLeaf={renderLeaf as never}
              onKeyDown={handleKeyDown}
              placeholder="Start writing…"
            />
          </EditorContainer>
        </EditorWrapper>
        {error && <FormHelperText error>{error}</FormHelperText>}
      </Slate>
    </SlateEditorContext.Provider>
  );
};
