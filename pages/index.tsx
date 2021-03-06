import { Space, Switch, Typography } from "antd";
import type { NextPage } from "next";
import { Fragment, useState } from "react";
import { useQuery } from "react-query";
import HomeTable from "../components/HomeTable";
import { getMatches } from "./api";
import classes from "../styles/Home.module.css";

const Home: NextPage = () => {
  const { Text } = Typography;
  const [spoilers, setSpoilers] = useState(false);
  const { isLoading, data }: { data: Match[] | undefined; isLoading: boolean } =
    useQuery("matches", getMatches);

  return (
    <Fragment>
      <Space className={classes.switchContainerHome} direction="horizontal">
        <Switch checked={spoilers} onChange={() => setSpoilers(!spoilers)} />
        <Text strong>Show spoilers</Text>
      </Space>
      <HomeTable dataSource={data} isLoading={isLoading} spoilers={spoilers} />
    </Fragment>
  );
};

export default Home;
