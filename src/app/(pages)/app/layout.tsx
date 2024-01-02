import { Metadata } from 'next';
import Heading from '~/components/app/heading';
import Sidebar from '~/components/app/sidebar';

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '~/app/(api)/api/auth/_lib/options';
import style from './_css/app.module.css';

export const metadata: Metadata = {
  title: 'Lapis Home',
  description: 'Ai Enhanced Zettelkasten Notation App',
};

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) return redirect('/');

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
