import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TopPage: React.FC = () => {
  // react-router の navigate 関数を取得
  const navigate = useNavigate();

  // 難易度の選択状態を管理するための state
  const [difficulty, setDifficulty] = useState("");

  // 「QuiZ START」ボタンが押されたときの処理
  const handleStartQuiz = () => {
    // 難易度が選択されていればクイズページに遷移
    if (difficulty) {
      navigate("/quiz");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start bg-gray-50 pt-10">
      {/* 上部にさらに寄せるために変更 */}
      <h1 className="text-4xl mb-4">|Rank|</h1>
      <div className="mb-8 space-y-4 flex flex-col">
        {" "}
        {/* 難易度ボタンと「START」ボタンの間隔を開けるために変更 */}
        {/* ボタンを縦並びに変更 */}
        {/* 難易度のボタンのデザインとサイズを変更 */}
        <button
          onClick={() => setDifficulty("EASY")}
          className={`w-48 p-4 text-center rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 ${
            difficulty === "EASY"
              ? "bg-blue-600 text-white"
              : "bg-white border border-blue-500 text-blue-500"
          }`}
        >
          EASY オールスター級
        </button>
        <button
          onClick={() => setDifficulty("NORMAL")}
          className={`w-48 p-4 text-center rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 ${
            difficulty === "NORMAL"
              ? "bg-blue-600 text-white"
              : "bg-white border border-blue-500 text-blue-500"
          }`}
        >
          NORMAL スタメン級
        </button>
        <button
          onClick={() => setDifficulty("HARD")}
          className={`w-48 p-4 text-center rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 ${
            difficulty === "HARD"
              ? "bg-blue-600 text-white"
              : "bg-white border border-blue-500 text-blue-500"
          }`}
        >
          HARD ローテション級
        </button>
      </div>
      {/* 「QUIZ START」ボタンのデザインとサイズを変更 */}
      <button
        onClick={handleStartQuiz}
        className="w-2/4 h-20 text-3xl font-bold bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105"
      >
        QuiZ START
      </button>
    </div>
  );
};

export default TopPage;
