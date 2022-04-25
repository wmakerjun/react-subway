import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import IconButton from "@mui/material/IconButton";
import { apiUrlState } from "../../states";
import { useRecoilState } from "recoil";

const Header = () => {
  const [apiUrl] = useRecoilState(apiUrlState);

  const navLinks = [
    {
      title: "역 관리",
      link: "/admin/station",
    },
    {
      title: "노선 관리",
      link: "/admin/line",
    },
    {
      title: "구간 관리",
      link: "/admin/section",
    },
    {
      title: "경로 검색",
      link: "/admin/path",
    },
  ];

  return (
    <header data-api={apiUrl}>
      <AppBar position="fixed" elevation={0}>
        <Toolbar>
          <Link href="/">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <HomeIcon />
            </IconButton>
          </Link>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            지하철 노선도
          </Typography>
          {navLinks.map((nav) => (
            <Link href={nav.link} key={nav.title}>
              <Button color="inherit">{nav.title}</Button>
            </Link>
          ))}
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
