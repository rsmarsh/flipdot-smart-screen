import { NextRequest } from 'next/server';
import { getAsciiFromText } from '@/utils/fonts';
import type { Fonts } from 'figlet';

export interface TextPreviewOptions {
  text: string;
  font: Fonts;
}

// TODO: change to GET
export async function POST(req: NextRequest) {
  const { text, font } = await req.json();

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

  const asciiMatrix = getAsciiFromText(text, font);
  const data = {
    matrix: asciiMatrix
  };

  return Response.json(data);
}
