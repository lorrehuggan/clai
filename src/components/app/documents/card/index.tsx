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
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio ab
        asperiores reprehenderit hic eligendi, voluptatibus a ut rerum. Corrupti
      </p>
      <div className={style.card__actions}>
        <button data-delete="true" onClick={deleteDoc}>
          <Trash2 strokeWidth={1.5} size={18} />
        </button>
        <button data-favourite={true}>
          <Star strokeWidth={1.5} size={18} />
        </button>
        <button data-archive="true">
          <Package strokeWidth={1.5} size={18} />
        </button>
      </div>
    </div>
  );
}
