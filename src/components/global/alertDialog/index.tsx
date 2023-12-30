'use client';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { useState } from 'react';

import style from './style.module.css';

type Props = {
  title: string;
  children: React.ReactNode;
  description?: string;
  action: () => Promise<void>;
};

export default function Dialog({
  title,
  children,
  description,
  action,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger asChild className={style.trigger}>
        {children}
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className={style.overlay} />
        <AlertDialog.Content className={style.content}>
          <AlertDialog.Title className={style.content__title}>
            {title}
          </AlertDialog.Title>
          <AlertDialog.Description className={style.content__description}>
            {description}
          </AlertDialog.Description>
          <div className={style.content__actions}>
            <AlertDialog.Cancel asChild>
              <button className={style.content__actions_cancel}>Cancel</button>
            </AlertDialog.Cancel>
            <form
              onSubmit={async (e) => {
                await action();
                e.preventDefault();
                setOpen(false);
              }}
            >
              <button type="submit" className={style.content__actions_confirm}>
                Confirm
              </button>
            </form>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
