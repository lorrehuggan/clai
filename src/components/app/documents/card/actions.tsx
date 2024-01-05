'use client';
import { Package, Star, Trash2 } from 'lucide-react';
import Dialog from '~/components/global/alertDialog';
import Tip from '~/components/global/tip';

import style from './actions.module.css';

export default function Actions() {
  async function deleteDoc() {
    console.log('delete');
    // await mutateAsync();
  }

  return (
    <>
      <div className={style.actions}>
        <Tip content="Delete">
          <Dialog
            action={deleteDoc}
            title="Are you absolutly sure?"
            description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
          >
            <button data-delete="true">
              <Trash2 strokeWidth={1.5} size={18} />
            </button>
          </Dialog>
        </Tip>
        <Tip content="Favourite">
          <button data-favourite={true}>
            <Star strokeWidth={1.5} size={18} />
          </button>
        </Tip>
        <Tip content="Archive">
          <button data-archive="true">
            <Package strokeWidth={1.5} size={18} />
          </button>
        </Tip>
      </div>
    </>
  );
}
