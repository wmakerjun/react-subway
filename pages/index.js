import DefaultHead from "../components/base/DefaultHead";
import Header from "../components/base/Header";
import Layout from "../components/base/Layout";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";

export default function Home() {
  return (
    <Layout>
      <h1>기본 홈페이지</h1>
    </Layout>
  );
}
