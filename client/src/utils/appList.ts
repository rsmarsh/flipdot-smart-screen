export const appList = ['TextEntry'] as const;

export const defaultApp: AppOption = 'TextEntry';

// [number] gives us a union of all possible values
export type AppOption = (typeof appList)[number];
