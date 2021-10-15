import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Table, Tag } from "antd";
import { useEffect } from "react";
import { useQuery } from "react-query";
import styles from "../styles/Home.module.css";
import { getMatches } from "./api";
import { ColumnType } from "antd/lib/table";

const Home: NextPage = () => {
  const { isLoading, data }: { data: any; isLoading: boolean } = useQuery(
    "matches",
    getMatches,
    {
      onSuccess: (data) => console.log(data),
      onError: (error) => console.log(error),
    }
  );

  const columns = [
    { title: "Rating", key: "rating", dataIndex: "rating" },
    { title: "Date", key: "date", dataIndex: "date" },
    { title: "Company", key: "company", dataIndex: "company" },
    { title: "Event", key: "event", dataIndex: "event" },
    { title: "Year", key: "year", dataIndex: "year" },
    { title: "Match Type", key: "matchType", dataIndex: "matchType" },
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
    {
      title: "Participants",
      key: "participants",
      dataIndex: "participants",
      render: (items: String[]) =>
        items.map((item, i) => <Tag key={i}>{item}</Tag>),
    },
  ];
  return (
    <Table
      style={{ height: "100%" }}
      columns={columns}
      dataSource={data}
      loading={isLoading}
    />
  );
};

export default Home;
