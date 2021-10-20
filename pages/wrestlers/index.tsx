import { Breadcrumb, Space, Switch } from "antd";
import { useRouter } from "next/dist/client/router";
import { useQuery } from "react-query";
import HomeTable from "../../components/HomeTable";
import { getMatches } from "../api";
import Link from "next/link";
import { Fragment, useState } from "react";

const WrestlerSection = () => {
  const { query } = useRouter();
  const { isLoading, data }: { data: Match[] | undefined; isLoading: boolean } =
    useQuery("matches", getMatches);
  const [spoilers, setSpoilers] = useState(false);

  return (
    <Fragment>
      <Space
        style={{
          width: "100%",
          justifyContent: "space-between",
          display: "flex",
        }}
      >
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link href="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Wrestler</Breadcrumb.Item>
          <Breadcrumb.Item>{query.wrestler}</Breadcrumb.Item>
        </Breadcrumb>
        <Switch checked={spoilers} onChange={() => setSpoilers(!spoilers)} />
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
