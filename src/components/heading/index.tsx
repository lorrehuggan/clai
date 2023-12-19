'use client';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Heading() {
  const { data: session } = useSession();
  return (
    <main>
      {session && <p>{session.user.name}</p>}
      {session && <button onClick={() => signOut()}>Sign out</button>}
      {!session && <button onClick={() => signIn()}>Sign in</button>}
    </main>
  );
}
