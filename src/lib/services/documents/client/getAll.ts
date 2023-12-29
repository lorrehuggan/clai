import { useMutation, useQuery } from '@tanstack/react-query';
import { Document } from '~/lib/db/schema/document';

export const useAllDocuments = () => {
  return useQuery<Document[]>({
    queryKey: ['documnets', 'all'],
    queryFn: async () => {
      const result = await fetch('/api/user/document');
      return result.json();
    },
    refetchOnWindowFocus: false,
  });
};
