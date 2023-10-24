import React, { useState, useEffect } from "react";
import axios from "axios";
import { Player } from "../models/interface";
import Stats from "../common/Stats";
import HintZone from "../common/HintZone";
import ResultModal from "../common/ResultModal";
import { useNavigate } from "react-router-dom"; // useNavigateをインポート

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

const Quiz = () => {
  const ALL_QUIZ_COUNT = 10; // 全問題数
  const [player, setPlayer] = useState<Player | null>(null);
  const [hintsShown, setHintsShown] = useState<{
    team: boolean;
    position: boolean;
    size: boolean;
  }>({
    team: false,
    position: false,
    size: false,
  });

  const [answer, setAnswer] = useState<string>("");
  const [result, setResult] = useState<string>("");
  // 合計点数とヒント表示回数のstateを追加
  const [score, setScore] = useState<number>(0);
  const [hintCount, setHintCount] = useState<number>(0);
  // ポップアップ表示用のstate
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // 現在の問題番号のstateを追加
  const [quizCount, setQuizCount] = useState<number>(1); // 変更箇所
  // useNavigateを使ってnavigate関数を取得
  const navigate = useNavigate();

  // データの取得関数
  const fetchData = async () => {
    try {
      const response = await api.get<Player>("/easy");
      setPlayer(response.data);
      // ヒントの表示をリセット
      setHintsShown({
        team: false,
        position: false,
        size: false,
      });
      // 回答のリセット
      setAnswer("");
      // 結果のリセット
      setResult("");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    // コンポーネントのマウント時のみデータを取得する
    fetchData();
  }, []);

  if (!player) {
    return <div className="text-center p-5">データ取得中...</div>;
  }

  const showHint = (hintType: string) => {
    setHintsShown((prev) => ({ ...prev, [hintType]: true }));
    setHintCount((prevCount) => prevCount + 1); // ヒントを表示するたびにカウントアップ
  };

  const checkAnswer = () => {
    if (answer === player.firstname || answer === player.lastname) {
      setResult("OK！");
      setScore((prevScore) => prevScore + 10); // 正解の場合、点数を10点増やす
    } else {
      setResult("NG..");
    }
    // 結果を表示する代わりにポップアップを表示
    setIsModalOpen(true);
  };
  // 結果を表示するポップアップのonNext関数内での変更
  const onNext = () => {
    setIsModalOpen(false);
    if (quizCount >= ALL_QUIZ_COUNT) {
      navigate("/finalResult", {
        state: { score, hintCount }, // スコアとヒントのカウントをstateとして渡す
      });
    } else {
      fetchData();
      setQuizCount((prevCount) => Math.min(prevCount + 1, ALL_QUIZ_COUNT));
    }
  };

  return (
    <div className="bg-gray-50 flex flex-col items-center p-6 space-y-6">
      {/* 変更箇所 */}
      <div className="w-full space-y-6">
        {/* Statsエリア */}
        <Stats player={player} />
        {/* HintZoneコンポーネントを使用 */}
        <HintZone player={player} hintsShown={hintsShown} showHint={showHint} />
        {/* ヒントゾーンと回答フォーム */}
        <div className="w-full flex">
          {/* 回答フォーム */}
          <div className="flex-1 ml-4 p-5 border rounded-md flex flex-col relative">
            {/* 変更箇所 */}
            <h3 className="text-lg font-medium mb-4">回答</h3>
            <input
              className="w-full p-2 border rounded-md mb-4"
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="選手の名前を入力"
            />
            <button
              className="w-full px-4 py-4 bg-green-500 text-white rounded-md mb-4"
              onClick={checkAnswer}
            >
              Answer
            </button>
            <div className="absolute bottom-2 right-2 text-lg text-white bg-teal-700 px-2 py-1 rounded">
              {/* 変更箇所 */}
              問題数：{Math.min(quizCount, ALL_QUIZ_COUNT)}/{ALL_QUIZ_COUNT}
            </div>
          </div>
        </div>
      </div>
      {/* 結果を表示するポップアップ */}
      <ResultModal
        isOpen={isModalOpen}
        result={result}
        correctPlayerName={player.firstname + " " + player.lastname}
        onNext={() => onNext()}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Quiz;
