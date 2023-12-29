import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Document } from '~/lib/db/schema/document';

export const allDocuments = () => {
  return useQuery<Document[]>({
    queryKey: ['document', 'all'],
    queryFn: async () => {
      const result = await fetch('/api/user/document');
      return result.json();
    },
    refetchOnWindowFocus: false,
  });
};

export const deleteDocument = (id: Document['id']) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['document', id],
    mutationFn: async () => {
      await fetch('/api/user/document', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['document', 'all'] });
    },
  });
};
