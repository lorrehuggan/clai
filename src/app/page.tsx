'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

import styles from './page.module.css';

export default function Home() {
  const { data: session } = useSession();
  return (
    <main className={styles.main}>
      {session && <p>{session.user.name}</p>}
      {session && <button onClick={() => signOut()}>Sign out</button>}
      {!session && <button onClick={() => signIn()}>Sign in</button>}
    </main>
  );
}
