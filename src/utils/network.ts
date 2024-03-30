import type { Fonts } from 'figlet';

// API is on the same url but different subdomain
const getTextAPIUrl = () => {
  var parts = location.hostname.split('.');
  if (parts[0] !== 'localhost') {
    parts.shift();
  }
  var tldHostname = parts.join('.');

  const protocol = window.location.protocol;
  const apiUrl = `${protocol}://${tldHostname}/text`;

  return apiUrl;
};

interface SendTextOptions {
  message: string;
  password: string;
  font: Fonts;
}

export const sendTextToDisplay = async (options: SendTextOptions) => {
  const url = 'https://isitnice.co.uk/text'; // getTextAPIUrl();

  const font = options.font || 'Banner';

  const data = {
    font: font,
    message: options.message,
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

  console.log(req);
};

export const sendMatrixToDisplay = () => {
  // TODO
};
