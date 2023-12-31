'use client';
import { JSONContent, generateHTML, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { revalidatePath } from 'next/cache';
import { useState } from 'react';
import ZettelkastenMark from '~/lib/extensions/zettelkasten/mark';
import ZettelkastenSuggestion from '~/lib/extensions/zettelkasten/suggetion';

const extensions = [StarterKit, ZettelkastenMark];

export default function UseEditor() {
  const [editable, setEditable] = useState(true);
  const [content, setContent] = useState(`
<h1>Leave peace article let generation.</h1>
<p>Challenge rate unit world education. Organization them could staff about security. Suddenly stage say.</p>
<p>None suddenly standard example with suffer two discover. Peace itself good thought edge. Such example network I building.</p>
<p>Address fall the usually loss. That past something design common water left though. Soldier generation good.</p>
<ul>
    <li>hold</li>
    <li>most</li>
    <li>energy</li>
    <li>new</li>
</ul>
<img src="https://placeimg.com/983/139/any" alt="Random Image">
<a href="https://www.johnson.com/">Career measure Democrat star Mrs admit.</a>
<blockquote>Skill under decade wear voice that.</blockquote>
`);

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
