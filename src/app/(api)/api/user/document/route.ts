import { remove } from './_handlers/delete';
import { get } from './_handlers/get';
import { post } from './_handlers/post';

export async function POST(req: Request, res: Response) {
  return post(req, res);
}

export async function GET(req: Request) {
  return get(req);
}

export async function DELETE(req: Request) {
  return remove(req);
}
