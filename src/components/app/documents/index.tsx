'use client';
import { useAllDocuments } from '~/lib/services/documents/client/getAll';

export default function Documents() {
  const { data, isLoading, isError } = useAllDocuments();
  return <div>{data?.map((doc) => <div>{doc.id}</div>)}</div>;
}
