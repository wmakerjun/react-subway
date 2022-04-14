import DefaultHead from "../../components/base/DefaultHead";
import Header from "../../components/base/Header";
import Layout from "../../components/base/Layout";

export default function Line() {
  const head = {
    title: "노선 관리",
    keywords: "지하철, 노선도, 지하철 노선도, 노선 관리",
    description: "지하철 노선도 노선 관리 페이지.",
  };

  return (
    <Layout head={head}>
      <h1 className="title">노선 관리 페이지에 오신것을 환영합니다</h1>
    </Layout>
  );
}
