import { getApiBaseUrl } from '@/app/api/utils/api';
import type { Fonts } from 'figlet';
import type { NextRequest } from 'next/server';

export interface SendMatrixOptions {
  matrix: boolean[][];
  password: string;
  font: Fonts;
  message: string;
}

export async function POST(req: NextRequest) {
  const data = (await req.json()) as SendMatrixOptions;
  const url = getApiBaseUrl() + '/matrix';

  const body = {
    matrix: data.matrix,
    password: data.password,
    message: data.message,
    font: data.font
  };

  const apiReq = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });

  return apiReq;
}
