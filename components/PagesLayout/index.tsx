import { Layout } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import { ReactElement } from "react";
import { Typography } from "antd";
import classes from "../../styles/PagesLayout.module.css";
const { Title } = Typography;

export default function PagesLayout({ children }: { children: ReactElement }) {
  return (
    <Layout className={classes.layout}>
      <Header>
        <Title className={classes.title}>5-star rated matches</Title>
      </Header>
      <Content className={classes.content}>{children}</Content>
      <Footer>By PedroFAC</Footer>
    </Layout>
  );
}
