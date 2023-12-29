import { revalidatePath } from 'next/cache';
import { Document } from '~/lib/db/schema/document';

export async function getAllDocumnets() {
  let data: Document[] = [];
  try {
    const request = await fetch('http://localhost:3000/api/user/document', {
      cache: 'no-store',
      method: 'GET',
    });
    if (!request.ok) {
      throw new Error(`HTTP error! status: ${request.status}`);
    }
    const response = await request.json();
    data = response.data;
    revalidatePath('/app/files');
  } catch (error) {
    throw new Error(`HTTP error! status: ${error}`);
  }
  return data;
}
