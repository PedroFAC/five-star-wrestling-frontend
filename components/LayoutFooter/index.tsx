import React from "react";
import { Footer } from "antd/lib/layout/layout";
import { Space, Typography } from "antd";
import { GithubOutlined } from "@ant-design/icons";
const { Text } = Typography;
import classes from "../../styles/PagesLayout.module.css";

export default function LayoutFooter() {
  return (
    <Footer className={classes.footer}>
      <Space>
        <a target="_blank" href="https://github.com/PedroFAC/" rel="noreferrer">
          By PedroFAC <GithubOutlined />
        </a>
      </Space>
      <Space>
        <Text>
          All information is fetched from the{" "}
          <a
            href="http://www.profightdb.com"
            title="Internet Wrestling Database"
          >
            Internet Wrestling Database
          </a>
        </Text>
      </Space>
    </Footer>
  );
}
