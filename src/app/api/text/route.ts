import { NextRequest } from 'next/server';
import { getAsciiFromText } from '@/utils/fonts';

export async function GET(req: NextRequest) {
  const text = req.nextUrl.searchParams.get('message');

  if (!text) {
    return Response.json(
      {
        message: 'Invalid message entered.'
      },
      {
        status: 400
      }
    );
  }

  const asciiMatrix = getAsciiFromText(text);

  const data = {
    matrix: asciiMatrix
  };

  return Response.json(data);
}
