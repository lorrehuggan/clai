import { get } from './get';
import { post } from './post';

export async function POST(req: Request, res: Response) {
  return post(req, res);
}

export async function GET(req: Request) {
  return get(req);
}
