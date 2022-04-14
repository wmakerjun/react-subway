import React from "react";
import Head from "next/head";

const DefaultHead = ({ title, keywords, description }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
    </Head>
  );
};

DefaultHead.defaultProps = {
  title: "지하철 노선도",
  keywords: "지하철, 노선도, 지하철 노선도",
  description: "지하철 노선도 관리 페이지.",
};

export default DefaultHead;
