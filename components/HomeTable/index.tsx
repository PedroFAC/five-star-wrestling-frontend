import { Table, Tag } from "antd";
import { ColumnFilterItem, ColumnsType } from "antd/lib/table/interface";
import { useEffect, useState } from "react";
import classes from "../../styles/HomeTable.module.css";
import Link from "next/link";

const HomeTable = ({
  dataSource,
  spoilers,
  isLoading,
}: {
  dataSource: Match[] | undefined;
  spoilers: boolean;
  isLoading: boolean;
}) => {
  function removeDuplicates(array: any[]) {
    return array.filter(
      (item, index) => array.indexOf(item) === index && item.length > 2
    );
  }

  const [wrestlers, setWrestlers] = useState<ColumnFilterItem[]>([]);
  const [companies, setCompanies] = useState<ColumnFilterItem[]>([]);

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

  useEffect(() => {
    getAllWrestlers(dataSource);
    getCompanies(dataSource);
  }, [dataSource]);

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
        items.map((item, i) => (
          <Link
            href={{
              pathname: "wrestlers",
              query: { wrestler: item.toString() },
            }}
          >
            <Tag key={i}>{item}</Tag>
          </Link>
        )),
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
        items.map((item, i) => (
          <Link
            href={{
              pathname: "wrestlers",
              query: { wrestler: item.toString() },
            }}
          >
            <Tag key={i}>{item}</Tag>
          </Link>
        )),
    },
    {
      title: "Losers",
      key: "losers",
      dataIndex: "losers",
      render: (items: String[]) =>
        items.map((item, i) => (
          <Link
            href={{
              pathname: "wrestlers",
              query: { wrestler: item.toString() },
            }}
          >
            <Tag key={i}>{item}</Tag>
          </Link>
        )),
    },
    { title: "Match Type", key: "matchType", dataIndex: "matchType" },
  ];

  return (
    <Table
      className={classes.container}
      columns={
        spoilers
          ? columns
          : columns.filter(
              (column) => column.key !== "winners" && column.key !== "losers"
            )
      }
      dataSource={dataSource?.map((match, i) => ({ ...match, key: i }))}
      loading={isLoading}
      bordered
      tableLayout="fixed"
    />
  );
};

export default HomeTable;
