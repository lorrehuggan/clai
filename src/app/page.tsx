import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import Heading from '~/components/app/heading';
import { authOptions } from './(api)/api/auth/_lib/options';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) return redirect('/app');

  return (
    <>
      <Heading />
    </>
  );
}
