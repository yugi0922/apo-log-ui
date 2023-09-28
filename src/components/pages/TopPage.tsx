import React from "react"; // React モジュールをインポート
import { useNavigate } from "react-router-dom"; // react-router-dom から useNavigate をインポート
const TopPage: React.FC = () => {
  const navigate = useNavigate(); // useNavigate フックを使用して navigate 関数を取得

  // 「案件一覧」ボタンがクリックされたときの処理
  const handleButtonClick = () => {
    navigate("/list"); // 案件一覧画面(list)に遷移
  };

  return (
    <div>
      <h1>TOPページ</h1> {/* タイトル */}
      <button onClick={handleButtonClick}>案件一覧</button>{" "}
      {/* 「案件一覧」ボタン */}
    </div>
  );
};

export default TopPage; // TopPage コンポーネントをエクスポート
