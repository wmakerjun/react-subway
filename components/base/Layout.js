import { Box, Container, ThemeProvider } from "@mui/material";
import DefaultHead from "./DefaultHead";
import Header from "./Header";
import { createTheme } from "@mui/material/styles";
import { amber, red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: amber[400],
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

export default function Layout({ children, head }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="container">
          <DefaultHead head={head} />
          <Header />
          <main>
            <Container sx={{ mt: 12, display: "flex", justifyContent: "center" }}>{children}</Container>
          </main>
          <style jsx global>{`
            html,
            body {
              padding: 0;
              margin: 0;
              font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
                Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
                sans-serif;
            }

            * {
              box-sizing: border-box;
            }
          `}</style>
        </div>
      </ThemeProvider>
    </>
  );
}
