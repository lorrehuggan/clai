import { get } from './_handlers';

export async function GET(req: Request) {
  return get(req);
}
