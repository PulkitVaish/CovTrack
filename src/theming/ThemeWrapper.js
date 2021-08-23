import React, { createContext } from "react";
import { CssBaseline } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

const ThemeContext = createContext(null);
export default function ThemeWrapper({ children }) {
  const theme = createTheme({
    overrides: {
      MuiCard: {
        root: {
          backgroundColor: "#6a5d5d",
        },
      },
      MuiMenu: {
        list: {
          paddingTop: "0",
          paddingBottom: "0",
        },
        paper: {
          "&::-webkit-scrollbar": {
            width: "0.5em",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#6a5d5d",
          },
          "::-webkit-scrollbar-thumb": {
            backgroundColor: "#ccc",
            borderRadius: "5px",
          },
        },
      },
      MuiListItem: {
        root: {
          "&$selected": {
            backgroundColor: "#ffa500",
            color: "white",
            "&:hover": {
              backgroundColor: "orange",
            },
          },
        },
      },
      MuiInput: {
        underline: {
          "&:after": {
            borderBottom: "none",
          },
        },
      },
      MuiFormControl: {
        root: {
          borderRadius: "4px",
          backgroundColor: "#6a5d5d",
        },
      },
      MuiPaper: {
        elevation1: {
          borderRadius: "4px",
        },
      },
    },
  });
  return (
    <ThemeContext.Provider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
