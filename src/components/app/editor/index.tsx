'use client';
import { EditorContent } from '@tiptap/react';
import UseEditor from '~/components/hooks/useEditor';

import style from './style.module.css';

function Editor() {
  const { editor, save } = UseEditor();

  return (
    <article className={style.article}>
      <button onClick={() => save(editor?.getJSON())}>Save</button>
      <EditorContent editor={editor} />
    </article>
  );
}

export default Editor;
