import { Theme } from "@/types/settings";

export function isValidTheme(theme: string): theme is Theme {
  return ['light', 'dark', 'system'].includes(theme);
}

export function validateProfileTheme(theme: string | null): Theme {
  if (!theme || !isValidTheme(theme)) {
    return 'system';
  }
  return theme;
}