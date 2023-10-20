import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Result = () => {
  // useNavigateを使ってnavigate関数を取得
  const navigate = useNavigate();
  // useLocationを使用してlocationオブジェクトを取得
  const location = useLocation();

  // location.stateからscoreとhintCountを取得。存在しない場合は0をデフォルト値として使用
  const score = location.state?.score ?? 0;
  const hintCount = location.state?.hintCount ?? 0;

  return (
    <div className="bg-gray-50 flex flex-col items-center p-6 space-y-6">
      {/* ここに min-h-screen を追加 */}
      <p className="text-3xl mb-4">
        あなたの点数は...
        <strong className="ml-2 text-4xl">{score}</strong>点！
      </p>
      <p className="text-2xl mb-4">ヒント使用回数: {hintCount}回</p>
      <button
        onClick={() => navigate("/Quiz")}
        className="px-8 py-2 text-xl font-medium text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        再チャレンジ
      </button>
    </div>
  );
};

export default Result;
