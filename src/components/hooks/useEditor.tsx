'use client';
import Blockquote from '@tiptap/extension-blockquote';
import BulletList from '@tiptap/extension-bullet-list';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import ListItem from '@tiptap/extension-list-item';
import { JSONContent, generateHTML, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { revalidatePath } from 'next/cache';
import { useCallback, useState } from 'react';
import ZettelkastenMark from '~/lib/extensions/zettelkasten/mark';

const extensions = [
  StarterKit,
  ZettelkastenMark,
  BulletList,
  ListItem,
  Link,
  Blockquote,
  Image,
];

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
<a href="https://www.johnson.com/">Career measure Democrat star Mrs admit.</a>
<blockquote>Skill under decade wear voice that.</blockquote>
<img src="https://images.pexels.com/photos/19541342/pexels-photo-19541342/free-photo-of-geometric-modern-house.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
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

  const save = useCallback(async (content: JSONContent | undefined) => {
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
  }, []);

  const clear = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().clearContent().run();
  }, []);

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  return {
    editor,
    save,
    clear,
    setLink,
  };
}
