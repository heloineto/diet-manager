import resolveConfig from 'tailwindcss/resolveConfig';
import { createTheme } from '@material-ui/core/styles';

import { hexToRgb } from '@utils/styles';

import tailwindConfig from '../tailwind.config.js';

const tw = resolveConfig(tailwindConfig);

const theme = createTheme({
  breakpoints: {
    keys: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    values: {
      sm: parseInt(tw.theme.screens.sm),
      md: parseInt(tw.theme.screens.md),
      lg: parseInt(tw.theme.screens.lg),
      xl: parseInt(tw.theme.screens.xl),
      '2xl': parseInt(tw.theme.screens['2xl']),
    },
  },
  palette: {
    primary: {
      light: tw.theme.colors.primary[400],
      main: tw.theme.colors.primary[500],
      dark: tw.theme.colors.primary[600],
    },
    secondary: {
      light: tw.theme.colors.blue[400],
      main: tw.theme.colors.blue[500],
      dark: tw.theme.colors.blue[600],
    },
    error: {
      light: tw.theme.colors.red[400],
      main: tw.theme.colors.red[500],
      dark: tw.theme.colors.red[600],
    },
    warning: {
      light: tw.theme.colors.yellow[400],
      main: tw.theme.colors.yellow[500],
      dark: tw.theme.colors.yellow[600],
    },
    info: {
      light: tw.theme.colors.blue[400],
      main: tw.theme.colors.blue[500],
      dark: tw.theme.colors.blue[600],
    },
    success: {
      light: tw.theme.colors.green[400],
      main: tw.theme.colors.green[500],
      dark: tw.theme.colors.green[600],
    },
    grey: {
      50: tw.theme.colors.gray[50],
      100: tw.theme.colors.gray[100],
      200: tw.theme.colors.gray[200],
      300: tw.theme.colors.gray[300],
      400: tw.theme.colors.gray[400],
      500: tw.theme.colors.gray[500],
      600: tw.theme.colors.gray[600],
      700: tw.theme.colors.gray[700],
      800: tw.theme.colors.gray[800],
      900: tw.theme.colors.gray[900],
    },
  },
  typography: {
    fontFamily: tw.theme.fontFamily.sans.join(','),
    fontSize: parseFloat(tw.theme.fontSize.base[0]) * 16,
    fontWeightLight: Number(tw.theme.fontWeight.light),
    fontWeightRegular: Number(tw.theme.fontWeight.normal),
    fontWeightMedium: Number(tw.theme.fontWeight.medium),
    fontWeightBold: Number(tw.theme.fontWeight.bold),
    h1: {
      fontWeight: 600,
      fontSize: tw.theme.fontSize['8xl'][0],
      lineHeight: tw.theme.fontSize['8xl'][1].lineHeight,
    },
    body1: {
      fontWeight: 500,
      fontSize: tw.theme.fontSize['base'][0],
      lineHeight: tw.theme.fontSize['base'][1].lineHeight,
    },
  },
  shape: {
    borderRadius: 8,
  },
  overrides: {
    // MuiContainer: {
    //   root: {

    //   }
    // },
    MuiButton: {
      root: {
        textTransform: 'none',
        fontWeight: '700',
        fontSize: tw.theme.fontSize['xl'][0],
        lineHeight: tw.theme.fontSize['xl'][1].lineHeight,
      },
      label: {
        position: 'relative',
      },
      startIcon: {
        position: 'absolute',
        left: '0',
      },
      containedPrimary: {
        color: 'white',
        boxShadow: () => {
          const primaryRgb = hexToRgb(tw.theme.colors.primary[600]);

          return `0px 3px 1px -2px rgb(${primaryRgb} / 30%), 0px 2px 2px 0px rgb(${primaryRgb} / 24%), 0px 1px 5px 0px rgb(${primaryRgb} / 22%)`;
        },
        '&:hover': {
          boxShadow: () => {
            const primaryRgb = hexToRgb(tw.theme.colors.primary[600]);

            return `0px 2px 4px -1px rgb(${primaryRgb} / 40%), 0px 4px 5px 0px rgb(${primaryRgb} / 34%), 0px 1px 10px 0px rgb(${primaryRgb} / 32%)`;
          },
        },
      },
    },
    MuiTextField: {
      root: {},
    },
    MuiInputLabel: {
      root: {
        fontWeight: '600',
      },
    },
    MuiOutlinedInput: {
      root: {
        backgroundColor: tw.theme.colors.gray[200],
        borderColor: tw.theme.colors.gray[400],
        boxShadow: tw.theme.boxShadow['DEFAULT'],
        '&$focused': {
          backgroundColor: 'white',
        },
      },
    },
    MuiFormHelperText: {
      root: {
        fontWeight: '500',
      },
    },
  },
  props: {
    MuiTextField: {
      variant: 'outlined',
      size: 'small',
      color: 'secondary',
    },
    MuiButton: {
      variant: 'contained',
      color: 'primary',
    },
    MuiContainer: {
      maxWidth: false,
      fixed: true,
    },
    MuiCheckbox: {
      size: 'small',
    },
  },
});

export default theme;
