import { Breadcrumb, Space, Switch, Typography } from "antd";
import { useRouter } from "next/dist/client/router";
import { useQuery } from "react-query";
import HomeTable from "../../components/HomeTable";
import { getMatches } from "../api";
import Link from "next/link";
import { Fragment, useState } from "react";
import classes from "../../styles/Home.module.css";
const { Text } = Typography;

const WrestlerSection = () => {
  const { query } = useRouter();
  const { isLoading, data }: { data: Match[] | undefined; isLoading: boolean } =
    useQuery("matches", getMatches);
  const [spoilers, setSpoilers] = useState(false);

  return (
    <Fragment>
      <Space className={classes.switchContainerWrestler}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link href="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Wrestler</Breadcrumb.Item>
          <Breadcrumb.Item>{query.wrestler}</Breadcrumb.Item>
        </Breadcrumb>
        <Space direction="horizontal">
          <Text strong>Show spoilers</Text>
          <Switch checked={spoilers} onChange={() => setSpoilers(!spoilers)} />
        </Space>
      </Space>
      <HomeTable
        dataSource={data?.filter((item) => {
          if (typeof query.wrestler === "string") {
            return item.participants.includes(query.wrestler);
          }
        })}
        spoilers={spoilers}
        isLoading={isLoading}
      />
    </Fragment>
  );
};

export default WrestlerSection;
