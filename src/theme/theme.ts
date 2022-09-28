import {
  Components,
  createTheme,
  PaletteMode,
  PaletteOptions,
  Theme,
} from '@mui/material';
import darkPalette from './DarkTheme';

// Put component styles here
const components: Components<Theme> = {};

// Color palettes
const lightPalette: PaletteOptions = {};

export function GetTheme(mode: PaletteMode) {
  return createTheme({
    palette: mode === 'light' ? lightPalette : darkPalette,
    components,
  });
}

const defaultTheme = createTheme({
  palette: darkPalette,
  components,
});
export default defaultTheme;
