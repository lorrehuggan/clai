import EditorProvider from '~/components/hooks/useEditor';

import style from './page.module.css';

export default function Page() {
  return (
    <article className={style.article}>
      <EditorProvider children={null} />
    </article>
  );
}
