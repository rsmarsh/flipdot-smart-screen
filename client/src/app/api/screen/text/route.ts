import { getApiBaseUrl } from '@/app/api/utils/api';
import type { Fonts } from 'figlet';
import type { NextRequest } from 'next/server';

export interface SendTextOptions {
  message: string;
  password: string;
  font: Fonts;
  section: string;
}

export async function POST(req: NextRequest) {
  const data = (await req.json()) as SendTextOptions;
  const url = getApiBaseUrl() + '/text';

  const font = data.font || 'Banner';

  const body = {
    font: font,
    message: data.message,
    section: data.section,
    password: data.password
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
