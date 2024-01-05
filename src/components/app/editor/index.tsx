'use client';
import { EditorContent } from '@tiptap/react';
import UseEditor from '~/components/hooks/useEditor';

import style from './style.module.css';
import Toolbar from './toolbar';

function Editor() {
  const { editor } = UseEditor();

  return (
    <>
      <Toolbar />
      <article className={style.article}>
        <EditorContent editor={editor} />
      </article>
    </>
  );
}

export default Editor;
