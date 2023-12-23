import { Metadata } from 'next';
import Heading from '~/components/app/heading';
import Sidebar from '~/components/app/sidebar';

import style from './_css/app.module.css';

export const metadata: Metadata = {
  title: 'Lapis Home',
  description: 'Ai Enhanced Zettelkasten Notation App',
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={style.main}>
      <Sidebar />
      <section>
        <Heading />
        {children}
      </section>
    </main>
  );
}
