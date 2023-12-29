import { Document } from '~/lib/db/schema/document';

export default function Document(doc: Document) {
  return (
    <div>
      <h1>{doc.title}</h1>
    </div>
  );
}
