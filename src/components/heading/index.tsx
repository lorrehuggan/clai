'use client';
import { signIn, signOut, useSession } from 'next-auth/react';

import style from './style.module.css';

export default function Heading() {
  const { data: session } = useSession();
  return (
    <div className={style.main}>
      {session && <p>{session.user.name}</p>}
      {session && <button onClick={() => signOut()}>Sign out</button>}
      {!session && <button onClick={() => signIn()}>Sign in</button>}
    </div>
  );
}
