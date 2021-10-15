import { Layout } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import { ReactElement } from "react";
import { Typography } from "antd";
const { Title } = Typography;

export default function PagesLayout({ children }: { children: ReactElement }) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        <Title style={{ color: "white" }}>5-star rated matches</Title>
      </Header>
      <Content style={{ background: "white", padding: "16px" }}>
        {children}
      </Content>
      <Footer>By PedroFAC</Footer>
    </Layout>
  );
}
