import type { Fonts } from 'figlet';

// API is on the same url but different subdomain
const getApiBaseUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3001';
  } else {
    return '';
  }
};

interface SendTextOptions {
  message: string;
  password: string;
  font: Fonts;
  section: string;
}

interface SendMatrixOptions {
  matrix: boolean[][];
  password: string;
}

export const sendTextToDisplay = async (options: SendTextOptions) => {
  const url = getApiBaseUrl() + '/text';

  const font = options.font || 'Banner';

  const data = {
    font: font,
    message: options.message,
    section: options.section,
    password: options.password
  };

  const req = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },

    body: JSON.stringify(data)
  });
};

export const sendMatrixToDisplay = async (options: SendMatrixOptions) => {
  const url = getApiBaseUrl() + '/matrix';

  const data = {
    matrix: options.matrix,
    password: options.password
  };

  const req = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },

    body: JSON.stringify(data)
  });
};
