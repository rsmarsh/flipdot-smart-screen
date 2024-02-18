interface DotData {
  col: number | string;
  row: number | string;
  lit: boolean;
}

export interface DotMatrix {
  [row: string]: {
    [col: string]: DotData;
  };
}
