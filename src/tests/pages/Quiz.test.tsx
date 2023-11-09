import { BrowserRouter as Router } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import Quiz from "../../components/pages/Quiz";
import { api } from "../../components/common/apiConfig";

// api.getのモックを作成
jest.mock("../../components/common/apiConfig");

describe("<Quiz />のテスト", () => {
  // 各テストケースの前にモックをリセットする
  beforeEach(() => {
    (api.get as jest.Mock).mockClear();
  });

  // // データ取得中の表示テスト
  // it("データ取得中にローディングテキストが表示される", () => {
  //   render(
  //     <Router>
  //       <Quiz />
  //     </Router>
  //   );

  //   expect(screen.getByText("データ取得中...")).toBeInTheDocument();
  // });

  // データ取得に失敗した場合のエラーメッセージ表示テストを追加
  it("データ取得に失敗した場合、エラーメッセージが表示される", async () => {
    // API呼び出しを失敗させるモックを設定
    (api.get as jest.Mock).mockRejectedValue(new Error("API Error"));

    // Quizコンポーネントをレンダリング
    render(
      <Router>
        <Quiz />
      </Router>
    );

    // エラーメッセージが表示されることを待機
    await waitFor(() => {
      expect(
        screen.getByText("問題の取得中にエラーが発生しました。")
      ).toBeInTheDocument();
    });
  });
});
