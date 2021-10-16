import { Space, Switch, Table, Tag, Typography } from "antd";
import { ColumnsType, ColumnType } from "antd/lib/table";
import { ColumnFilterItem, FilterValue } from "antd/lib/table/interface";
import type { NextPage } from "next";
import { Fragment, useState } from "react";
import { useQuery } from "react-query";
import { getMatches } from "./api";

const Home: NextPage = () => {
  const { Text } = Typography;
  const [spoilers, setSpoilers] = useState(false);
  const [wrestlers, setWrestlers] = useState<ColumnFilterItem[]>([]);
  const [companies, setCompanies] = useState<ColumnFilterItem[]>([]);
  const { isLoading, data }: { data: Match[] | undefined; isLoading: boolean } =
    useQuery("matches", getMatches, {
      onSuccess: (data) => {
        getCompanies(data);
        getAllWrestlers(data);
      },
    });

  function removeDuplicates(array: any[]) {
    return array.filter(
      (item, index) => array.indexOf(item) === index && item.length > 2
    );
  }

  function getCompanies(
    matches: Match[] | undefined
  ): ColumnFilterItem[] | void {
    if (matches) {
      let companies = matches.map(({ company }) => company);
      const filteredCompanies = removeDuplicates(companies);
      const sortedCompanies = filteredCompanies.sort((a, b) =>
        a.localeCompare(b)
      );
      const structuredCompanies = sortedCompanies.map((filtered) => {
        return { value: filtered, text: filtered };
      });
      setCompanies(structuredCompanies);
    }
  }

  function getAllWrestlers(
    matches: Match[] | undefined
  ): ColumnFilterItem[] | void {
    if (matches) {
      let allWrestlers: any[] = [];
      matches.forEach(
        ({ participants }) => (allWrestlers = allWrestlers.concat(participants))
      );
      allWrestlers = removeDuplicates(allWrestlers);
      allWrestlers = allWrestlers.sort((a, b) => a.localeCompare(b));
      allWrestlers = allWrestlers.map((wrestler: string) => ({
        text: wrestler,
        value: wrestler,
      }));
      setWrestlers(allWrestlers);
    }
  }

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
    {
      title: "Company",
      key: "company",
      dataIndex: "company",
      filters: companies,
      filterSearch: true,
      onFilter: (value, record) => record.company.includes(value.toString()),
    },
    { title: "Event", key: "event", dataIndex: "event" },

    {
      title: "Participants",
      key: "participants",
      dataIndex: "participants",
      render: (items: String[]) =>
        items.map((item, i) => <Tag key={i}>{item}</Tag>),
      filters: wrestlers,
      filterSearch: true,
      onFilter: (value, record) =>
        record.participants.includes(value.toString()),
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
      <Space
        style={{ width: "100%", justifyContent: "flex-end", display: "flex" }}
        direction="horizontal"
      >
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
