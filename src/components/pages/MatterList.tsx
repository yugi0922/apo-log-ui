import React, { useState, useEffect } from "react";
import axios from "axios";
import { Matter } from "../models/interface";
import { format } from "date-fns";
import ja from "date-fns/locale/ja";

// Axiosのインスタンスを作成
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

const MatterList = () => {
  const [matters, setMatters] = useState<Matter[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<Matter[]>("/list"); // ここを変更
        setMatters(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>案件一覧</h1>
      <ul>
        {matters.map((matter, index) => (
          <li key={index}>
            <div>ニックネーム：{matter.nick_name}</div>
            <div>アプリ：{matter.app_category}</div>
            <div>年齢：{matter.age}</div>
            <div>スト値：{matter.looks_level}</div>
            <div>職業：{matter.job}</div>
            <div>エリア：{matter.address}</div>
            <div>フェーズ：{matter.fhase}</div>
            <div>
              次回アポ日：
              {matter.next_apo_date
                ? format(
                    new Date(matter.next_apo_date),
                    "yyyy-MM-dd HH:mm:ss （E）",
                    { locale: ja }
                  )
                : "未定"}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MatterList;
