import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import MatterList from "../../components/pages/MatterList"; // MatterListコンポーネントのパスに書き換えてください
import axios from "axios";
import { format } from "date-fns";
import ja from "date-fns/locale/ja";

// axios.getのモック
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("MatterList", () => {
  beforeEach(() => {
    // APIから返されるデータのモック
    mockedAxios.get.mockResolvedValueOnce({
      data: [
        {
          nick_name: "ミキ",
          app_category: "tin",
          age: 30,
          looks_level: 5,
          job: "エンジニア",
          address: "東京",
          fhase: "通話",
          next_apo_date: "2023-09-06T12:34:56Z",
        },
      ],
    });
  });

  test("renders MatterList and fetches data", async () => {
    render(<MatterList />);

    // データが非同期でロードされるまで待つ
    await screen.findByText("案件一覧");

    // 各フィールドが正しくレンダリングされているか確認
    // findByTextを使用して非同期にロードされたデータが正しく表示されるか確認
    expect(await screen.findByText("ニックネーム：ミキ")).toBeInTheDocument();
    expect(await screen.findByText("アプリ：tin")).toBeInTheDocument();
    expect(await screen.findByText("年齢：30")).toBeInTheDocument();
    expect(await screen.findByText("スト値：5")).toBeInTheDocument();
    expect(await screen.findByText("職業：エンジニア")).toBeInTheDocument();
    expect(await screen.findByText("エリア：東京")).toBeInTheDocument();
    expect(await screen.findByText("フェーズ：通話")).toBeInTheDocument();

    // date-fnsを用いて日付のフォーマットを行い、その値が正しくレンダリングされているか確認
    const formattedDate = format(
      new Date("2023-09-06T12:34:56Z"),
      "yyyy-MM-dd HH:mm:ss （E）",
      { locale: ja }
    );
    expect(
      await screen.findByText(`次回アポ日：${formattedDate}`)
    ).toBeInTheDocument();
  });
});
