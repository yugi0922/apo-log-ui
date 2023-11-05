import { act } from "react-dom/test-utils";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  act,
} from "@testing-library/react";
import Quiz from "../../components/pages/Quiz";
import { api } from "../../components/common/apiConfig";

// api.getのモックを作成
jest.mock("../../components/common/apiConfig");

describe("<Quiz />のテスト", () => {
  // 各テストケースの前にモックをリセットする
  beforeEach(() => {
    (api.get as jest.Mock).mockClear();
  });

  // データ取得中の表示テスト
  it("データ取得中にローディングテキストが表示される", () => {
    render(
      <Router>
        <Quiz />
      </Router>
    );

    expect(screen.getByText("データ取得中...")).toBeInTheDocument();
  });

  // データ取得失敗時のエラーメッセージ表示テスト
  it("データ取得に失敗した場合、エラーメッセージが表示される", async () => {
    // api.getをモックしてエラーを返すように設定
    (api.get as jest.Mock).mockRejectedValueOnce(new Error("Failed to fetch"));

    // 非同期の状態更新を伴う場合は、ここで act() を使用します。
    render(
      <Router>
        <Quiz />
      </Router>
    );

    // Testing Library の findByText は内部で act() を使用しているため、
    // ここで act() を使う必要はありません。
    let errorMessage;
    try {
      errorMessage = await screen.findByText(
        "問題の取得中にエラーが発生しました。"
      );
    } catch (e) {
      if (e instanceof Error) {
        // エラーオブジェクトがError型であることを確認
        console.error(e.message); // エラーがあればコンソールに出力
      } else {
        // 'e' が Error 型ではない場合のハンドリング
        console.error("An unexpected error occurred");
      }
    }

    // エラーメッセージが表示されることを期待
    expect(errorMessage).toBeInTheDocument();
  });

  // データ取得成功時のプレイヤー情報表示テスト
  // it("データ取得に成功した場合、プレイヤーの情報が表示される", async () => {
  //   // モックデータの作成
  //   const mockPlayer = {
  //     firstname: "John",
  //     lastname: "Doe",
  //     team: "Team A",
  //     position: "Midfielder",
  //     size: "180cm",
  //   };
  //   // api.getをモックしてmockPlayerを返すように設定
  //   (api.get as jest.Mock).mockResolvedValueOnce({ data: mockPlayer });

  //   render(
  //     <Router>
  //       <Quiz />
  //     </Router>
  //   );
  //   const playerName = await screen.findByText(mockPlayer.firstname);

  //   // プレイヤーの情報が表示されているか確認
  //   expect(playerName).toBeInTheDocument();
  //   expect(screen.getByText(mockPlayer.lastname)).toBeInTheDocument();
  //   // ...他のプレイヤー情報に関するアサーションもここに追加できます。
  // });
});
