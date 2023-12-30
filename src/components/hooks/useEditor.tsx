'use client';
import { JSONContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { revalidatePath } from 'next/cache';
import { useState } from 'react';
import ZettelkastenMark from '~/lib/extensions/zettelkasten/mark';
import ZettelkastenSuggestion from '~/lib/extensions/zettelkasten/suggetion';

const extensions = [StarterKit, ZettelkastenMark];

export default function UseEditor() {
  const [editable, setEditable] = useState(true);
  const [content, setContent] = useState(``);

  const editor = useEditor({
    extensions,
    content,
    editable,
    autofocus: true,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  async function save(content: JSONContent | undefined) {
    if (!content) return;

    try {
      setEditable(false);
      const request = await fetch('/api/user/document', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });
      const response = await request.json();
      revalidatePath('/app/files');
      setEditable(true);
    } catch (error) {
      console.error(error);
    }
  }

  async function clear() {
    if (!editor) return;
    editor.commands.clearContent();
  }

  return {
    editor,
    save,
    clear,
  };
}
