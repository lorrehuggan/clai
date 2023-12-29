import { Package, Star, Trash2 } from 'lucide-react';
import { Document } from '~/lib/db/schema/document';
import { deleteDocument } from '~/lib/services/documents/client';
import style from './style.module.css';

type Props = {
  doc: Document;
};

export default function Card({ doc }: Props) {
  const { mutateAsync } = deleteDocument(doc.id);

  const deleteDoc = async () => {
    await mutateAsync();
  };

  return (
    <div className={style.card}>
      <h5>{doc.title}</h5>
      <div className={style.card__actions}>
        <button onClick={deleteDoc}>
          <Trash2 strokeWidth={1.5} size={18} />
        </button>
        <button>
          <Star strokeWidth={1.5} size={18} />
        </button>
        <button>
          <Package strokeWidth={1.5} size={18} />
        </button>
      </div>
    </div>
  );
}
