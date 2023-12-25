'use client';
import * as Avatar from '@radix-ui/react-avatar';
import { signIn, signOut, useSession } from 'next-auth/react';

import { Session } from 'next-auth';
import ThemeSwitcher from '~/components/global/themeSwitcher';
import style from './style.module.css';

export default function Heading() {
  const { data: session } = useSession();
  return (
    <div className={style.heading}>
      {/* <div>{null}</div> */}
      <ThemeSwitcher />
      <div className={style.heading__auth}>
        {session && <User session={session} />}
        {session && <button onClick={() => signOut()}>Sign out</button>}
        {!session && <button onClick={() => signIn()}>Sign in</button>}
      </div>
    </div>
  );
}

function User({ session }: { session: Session }) {
  return (
    <Avatar.Root className={style.heading__auth_avatar}>
      <Avatar.Image
        src={session?.user.image}
        alt={session?.user.name}
        className={style.heading__auth_avatar__image}
      />
      <Avatar.Fallback className={style.heading__auth_avatar__fallback}>
        {session?.user.name?.charAt(0).toUpperCase()}
      </Avatar.Fallback>
    </Avatar.Root>
  );
}
