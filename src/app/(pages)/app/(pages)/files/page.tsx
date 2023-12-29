import Documents from '~/components/app/documents';

import style from './page.module.css';

export default async function Page() {
  return (
    <div className={style.page}>
      <h1>My Documents</h1>
      <Documents />
    </div>
  );
}
