'use client';
import * as Avatar from '@radix-ui/react-avatar';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { signIn, signOut, useSession } from 'next-auth/react';

import { Cog, Command, LogOut, Settings } from 'lucide-react';
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
        {!session && (
          <button
            onClick={() => {
              signIn();
            }}
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
}

function User({ session }: { session: Session }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Avatar.Root className={style.heading__auth_avatar}>
          <Avatar.Image
            src={undefined}
            alt={session?.user.name}
            className={style.heading__auth_avatar__image}
          />
          <Avatar.Fallback className={style.heading__auth_avatar}>
            <span>{session?.user.name?.charAt(0).toUpperCase()}</span>
          </Avatar.Fallback>
        </Avatar.Root>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={style.heading__auth_content}
          sideOffset={10}
        >
          <DropdownMenu.Arrow className={style.heading__auth_content_arrow} />
          <DropdownMenu.Label
            className={style.heading__auth_content_label}
          >{`${session.user.name}`}</DropdownMenu.Label>
          <DropdownMenu.Separator
            className={style.heading__auth_content_separator}
          />
          <DropdownMenu.Item
            className={style.heading__auth_content_item}
            onSelect={() => {
              signOut();
            }}
          >
            New Document
            <div className={style.heading__auth_content_rightslot}>
              <Command size={14} /> +N
            </div>
          </DropdownMenu.Item>

          <DropdownMenu.Separator
            className={style.heading__auth_content_separator}
          />

          <DropdownMenu.Item
            className={style.heading__auth_content_item}
            onSelect={() => {
              signOut();
            }}
          >
            Settings
            <div className={style.heading__auth_content_rightslot}>
              <Settings size={16} />
            </div>
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className={style.heading__auth_content_item}
            onSelect={() => {
              signOut();
            }}
          >
            Sign out
            <div className={style.heading__auth_content_rightslot}>
              <LogOut size={16} />
            </div>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
