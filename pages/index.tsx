import { Space, Switch, Table, Tag, Typography } from "antd";
import { ColumnsType, ColumnType } from "antd/lib/table";
import type { NextPage } from "next";
import { Fragment, useState } from "react";
import { useQuery } from "react-query";
import { getMatches } from "./api";

const Home: NextPage = () => {
  const { isLoading, data }: { data: Match[] | undefined; isLoading: boolean } =
    useQuery("matches", getMatches);

  const { Text } = Typography;
  const [spoilers, setSpoilers] = useState(false);
  const columns: ColumnsType<Match> = [
    {
      title: "Rating",
      key: "rating",
      dataIndex: "rating",
      sorter: (a: Match, b: Match) => a.rating.valueOf() - b.rating.valueOf(),
      sortDirections: ["descend", "ascend", "descend"],
      defaultSortOrder: "descend",
    },
    {
      title: "Year",
      key: "year",
      dataIndex: "year",
      sorter: (a: Match, b: Match) => a.year.valueOf() - b.year.valueOf(),
      sortDirections: ["descend", "ascend", "descend"],
    },
    { title: "Date", key: "date", dataIndex: "date" },
    { title: "Company", key: "company", dataIndex: "company" },
    { title: "Event", key: "event", dataIndex: "event" },

    {
      title: "Participants",
      key: "participants",
      dataIndex: "participants",
      render: (items: String[]) =>
        items.map((item, i) => <Tag key={i}>{item}</Tag>),
    },
    {
      title: "Winners",
      key: "winners",
      dataIndex: "winners",
      render: (items: String[]) =>
        items.map((item, i) => <Tag key={i}>{item}</Tag>),
    },
    {
      title: "Losers",
      key: "losers",
      dataIndex: "losers",
      render: (items: String[]) =>
        items.map((item, i) => <Tag key={i}>{item}</Tag>),
    },
    { title: "Match Type", key: "matchType", dataIndex: "matchType" },
  ];
  return (
    <Fragment>
      <Space direction="horizontal">
        <Switch checked={spoilers} onChange={() => setSpoilers(!spoilers)} />
        <Text strong>Show spoilers</Text>
      </Space>
      <Table
        style={{ height: "100%" }}
        columns={
          spoilers
            ? columns
            : columns.filter(
                (column) => column.key !== "winners" && column.key !== "losers"
              )
        }
        dataSource={data?.map((match, i) => ({ ...match, key: i }))}
        loading={isLoading}
        bordered
      />
    </Fragment>
  );
};

export default Home;
