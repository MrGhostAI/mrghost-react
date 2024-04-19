import { createTheme } from "@mui/material";

//TODO: FIX TS ERRORS

const primaryColor = "#059169";
const secondaryColor = "#34ED92";
export const defaultChatStyles = {
  primaryColor: "#059169",
  secondaryColor: "#efefef",
  fontColor: "#ffffff",
  fontType: "Arial",
  backgroundColor: "#ffffff",
};
export const theme = createTheme({
  palette: {
    primary: {
      main: primaryColor, // Change the primary color to orange (#ff5722)
    },
    secondary: {
      main: secondaryColor, // Change the secondary color to orange (#ff5722)
      contrastText: "#000",
    },
    // @ts-ignore
    tertiary: {
      main: "#dd5a33",
      contrastText: "#fff",
      light: "#ff7e4a",
      dark: "#c24c1a",
    },
    success: {
      main: "#34ED92",
      contrastText: "#000",
    },
    info: {
      main: "#2A44DF",
    },
    error: {
      main: "#F44336",
    },
    warning: {
      main: "#F7D269",
    },
    white: {
      main: "#FFF",
      dark: "#F2F2F2",
    },
    offBlack: {
      main: "#333",
      light: "#444",
      dark: "#222",
      contrastText: "#fff",
    },
    background: {
      default: "#F9F9F7",
      paper: "#FFF",
    },
    offWhite: {
      default: "#EEE",
      main: "#EEE",
    },
    // divider: {
    //   main: '#EEE',
    //   default: '#EEE',
    // },
    linkMenu: {
      main: primaryColor,
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif", // Change the default font-family to "Work Sans"
    h1: {
      fontSize: "3rem",
      fontWeight: 500,
      fontFamily: "ExconBlack, sans-serif",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 400,
      fontFamily: "Roboto, sans-serif",
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 400,
      fontFamily: "ExconBlack, sans-serif",
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 300,
      fontFamily: "Roboto, sans-serif",
      // padding: '0rem 0rem 1rem 0rem'
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 300,
      fontFamily: "ExconBlack, sans-serif",
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 300,
      fontFamily: "Roboto, sans-serif",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "transparent",
        },
        "*": {
          // Add scrollbar styles
          "&::-webkit-scrollbar": {
            width: "8px", // Width of the scrollbar
            backgroundColor: "#F5F5F5", // Background color of the entire scrollbar
          },

          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888", // Color of the draggable scroll handle
            borderRadius: "4px", // Rounded corners
            "&:hover": {
              backgroundColor: "#555", // Change color when hovering over the scroll handle
            },
          },

          "&::-webkit-scrollbar-track": {
            backgroundColor: "#F5F5F5", // Background color of the track
          },
          scrollbarWidth: "medium",
          scrollbarColor: "#888 #F5F5F5",
        },
        a: {
          wordBreak: "break-all",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          //   boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.05)',
          boxShadow: "none",
          border: "1px solid #EEE",
          borderRadius: "0.5em",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          border: "none",
          borderRadius: "0",
        },
      },
    },
    // Adding default styles for Button
    MuiButton: {
      styleOverrides: {
        root: {
          // Add your default styles here
          textTransform: "none", // for example, to disable uppercase text
          boxShadow: "none",
          borderRadius: "0.5em",
          padding: "0.5em 1.25em",

          "&:hover": {
            boxShadow: "none",
          },
        },
      },
      defaultProps: {
        // Set default props here if needed
        variant: "contained", // For instance, make every button "contained" by default
      },
    },
    // @ts-ignore

    DefaultChatStyles: defaultChatStyles,
  },
});

const darkBackground = "#262638";
const darkBackgroundDarker = "#151527";
const darkBackgroundLight = "#484873";
export const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#059169", // Change the primary color to orange (#ff5722)
    },
    secondary: {
      main: "#34ED92", // Change the secondary color to orange (#ff5722)
      contrastText: "#000",
    },
    success: {
      main: "#34ED92",
      contrastText: "#000",
    },
    info: {
      main: "#2A44DF",
    },
    error: {
      main: "#F44336",
    },
    warning: {
      main: "#F7D269",
    },
    white: {
      main: "#FFF",
      dark: "#F2F2F2",
    },
    offBlack: {
      main: "#EEE",
      light: "#FFF",
      dark: "#CCC",
      contrastText: "#111",
    },
    background: {
      default: darkBackground,
      // @ts-ignore

      light: darkBackgroundLight,
    },
    // @ts-ignore

    divider: {
      main: darkBackgroundDarker,
      default: darkBackgroundDarker,
    },
    text: {
      primary: "#EEE",
      secondary: "#CCC",
    },
    action: {
      active: "#EEE",
      // @ts-ignore

      secondary: "#CCC",
    },
    linkMenu: {
      main: secondaryColor,
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif", // Change the default font-family to "Work Sans"
    // @ts-ignore

    color: "#EEE",
    h1: {
      fontSize: "3rem",
      fontWeight: 500,
      fontFamily: "ExconBlack, sans-serif",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 400,
      fontFamily: "Roboto, sans-serif",
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 400,
      fontFamily: "ExconBlack, sans-serif",
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 300,
      fontFamily: "Roboto, sans-serif",
      // padding: '0rem 0rem 1rem 0rem'
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 300,
      fontFamily: "ExconBlack, sans-serif",
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 300,
      fontFamily: "Roboto, sans-serif",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "transparent",
        },
        "*": {
          // Add scrollbar styles
          "&::-webkit-scrollbar": {
            width: "8px", // Width of the scrollbar
            backgroundColor: darkBackgroundDarker, // Background color of the entire scrollbar
          },

          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888", // Color of the draggable scroll handle
            borderRadius: "4px", // Rounded corners
            "&:hover": {
              backgroundColor: "#555", // Change color when hovering over the scroll handle
            },
          },

          "&::-webkit-scrollbar-track": {
            backgroundColor: darkBackgroundDarker, // Background color of the track
          },
          scrollbarWidth: "medium",
          scrollbarColor: "#888 #F5F5F5",
        },
        a: {
          wordBreak: "break-all",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          //   boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.05)',
          boxShadow: "none",
          border: `1px solid ${darkBackgroundDarker}`,
          borderRadius: "0.5em",
          backgroundColor: darkBackgroundLight,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          border: "none",
          borderRadius: "0",
        },
      },
    },
    // Adding default styles for Button
    MuiButton: {
      styleOverrides: {
        root: {
          // Add your default styles here
          textTransform: "none", // for example, to disable uppercase text
          boxShadow: "none",
          borderRadius: "0.5em",
          padding: "0.5em 1.25em",

          "&:hover": {
            boxShadow: "none",
          },
        },
      },
      defaultProps: {
        // Set default props here if needed
        variant: "contained", // For instance, make every button "contained" by default
      },
    },
    // @ts-ignore

    AdminChatStyles: {
      primaryColor: "#059169",
      secondaryColor: darkBackground,
      fontColor: "#ffffff",
      secondaryFontColor: "#ffffff",
      backgroundFontColor: "#ffffff",
      fontType: "Arial",
      backgroundColor: darkBackgroundLight,
    },
    DefaultChatStyles: defaultChatStyles,
  },
});
