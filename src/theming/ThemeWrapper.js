import React, { createContext } from "react";
import { CssBaseline } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const ThemeContext = createContext(null);
export default function ThemeWrapper({ children }) {
  const theme = createMuiTheme({
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
      },
      MuiListItem: {
        root: {
          "&$selected": {
            backgroundColor: "red",
            "&:hover": {
              backgroundColor: "orange",
            },
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
