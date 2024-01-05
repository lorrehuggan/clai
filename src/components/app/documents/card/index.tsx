import { Document } from '~/lib/db/schema/document';
import Actions from './actions';

import style from './style.module.css';

type Props = {
  doc: Document;
};

export default function Card({ doc }: Props) {
  return (
    <div className={style.card}>
      <h5>{doc.title}</h5>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio ab
        asperiores reprehenderit hic eligendi, voluptatibus a ut rerum. Corrupti
      </p>
      <Actions />
    </div>
  );
}
