import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import IconButton from "@mui/material/IconButton";

const Header = () => {
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
  ];

  return (
    <header>
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
