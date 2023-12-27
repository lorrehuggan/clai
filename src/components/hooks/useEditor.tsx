'use client';
import { EditorProvider } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ZettelkastenMark from '~/lib/extensions/zettelkasten/mark';
import ZettelkastenNode from '~/lib/extensions/zettelkasten/node';

const extensions = [StarterKit, ZettelkastenNode, ZettelkastenMark];

const content = `
<p>test</p>
`;

export default function Editor({ children }: { children: React.ReactNode }) {
  return (
    <EditorProvider extensions={extensions} content={content}>
      {children}
    </EditorProvider>
  );
}
