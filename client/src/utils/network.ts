import { TextPreviewOptions } from '@/app/api/preview/text/route';
import type { SendMatrixOptions } from '@/app/api/screen/matrix/route';
import type { SendTextOptions } from '@/app/api/screen/text/route';

const API = {
  preview: {
    text: '/api/preview/text',
    matrix: 'api/preview/matrix'
  },
  screen: {
    text: '/api/screen/text',
    matrix: '/api/screen/matrix'
  }
};

export const sendTextToDisplay = async (options: SendTextOptions) => {
  const font = options.font || 'Banner';

  const data = {
    font: font,
    message: options.message,
    section: options.section,
    password: options.password
  };

  const req = await fetch(API.screen.text, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },

    body: JSON.stringify(data)
  });

  return req;
};

export const sendMatrixToDisplay = async (options: SendMatrixOptions) => {
  const req = await fetch(API.screen.matrix, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },

    body: JSON.stringify(options)
  });

  return req;
};

export const getPreviewFromText = async (options: TextPreviewOptions) => {
  const data = {
    text: options.text,
    font: options.font
  };

  const textRes = await fetch('/api/preview/text', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });

  const resJSON = await textRes.json();
  return resJSON;
};
