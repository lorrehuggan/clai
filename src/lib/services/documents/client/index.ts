import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Document } from '~/lib/db/schema/document';

export const allDocuments = () => {
  return useQuery<Document[]>({
    queryKey: ['documents', 'all'],
    queryFn: async () => {
      const result = await fetch('/api/user/documents');
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
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['document', 'all'] });
      const previousValue = queryClient.getQueryData<Document[]>([
        'document',
        'all',
      ]);
      queryClient.setQueryData<Document[]>(['document', 'all'], (old) => {
        return old?.filter((doc) => doc.id !== id) ?? [];
      });
      return { previousValue };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData<Document[]>(
        ['document', 'all'],
        context?.previousValue
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['document', 'all'] });
    },
  });
};
