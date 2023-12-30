import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { useQueryClient } from '@tanstack/react-query';
import { Package, Star, Trash2 } from 'lucide-react';
import Dialog from '~/components/global/alertDialog';
import Tip from '~/components/global/tip';
import { Document } from '~/lib/db/schema/document';
import { deleteDocument } from '~/lib/services/documents/client';

import style from './style.module.css';

type Props = {
  doc: Document;
};

export default function Card({ doc }: Props) {
  const { mutateAsync } = deleteDocument(doc.id);
  const queryClient = useQueryClient();

  async function deleteDoc() {
    console.log('delete');
    await mutateAsync();
  }

  return (
    <div className={style.card}>
      <h5>{doc.title}</h5>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio ab
        asperiores reprehenderit hic eligendi, voluptatibus a ut rerum. Corrupti
      </p>
      <div className={style.card__actions}>
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
    </div>
  );
}
