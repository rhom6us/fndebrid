const white = '#FFFFFF';
const black = '#161617';
const gray = '#F8F8F9';

export interface Theme {
  background: string;
  body: string;
}

const themeLight = {
  background: 'green',
  body: black,
};

const themeDark = {
  background: black,
  body: white,
};

export default function (mode: 'dark' | 'light'): Theme {
  return mode === 'dark' ? themeDark : themeLight;
}
