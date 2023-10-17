import React, { useState, useEffect } from "react";
import axios from "axios";
import { Player } from "../models/interface";
import ResultModal from "../common/ResultModal";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

const Quiz = () => {
  const ALL_QUIZ_COUNT = 10; // 全問題数
  const [player, setPlayer] = useState<Player | null>(null);
  const [hintsShown, setHintsShown] = useState<{ [key: string]: boolean }>({
    team: false,
    position: false,
    size: false,
  });
  const [answer, setAnswer] = useState<string>("");
  const [result, setResult] = useState<string>("");

  // ポップアップ表示用のstate
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // 現在の問題番号のstateを追加
  const [quizCount, setQuizCount] = useState<number>(1); // 変更箇所
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
  };

  const checkAnswer = () => {
    if (answer === player.firstname || answer === player.lastname) {
      setResult("OK！");
    } else {
      setResult("NG..");
    }
    // 結果を表示する代わりにポップアップを表示
    setIsModalOpen(true);
  };

  return (
    <div className="bg-gray-50 flex flex-col items-center p-6 space-y-6">
      {/* 変更箇所 */}
      <div className="w-full space-y-6">
        {/* Statsエリア */}
        <div className="p-5 border rounded-md">
          <h3 className="text-lg font-medium mb-4">Stats</h3>
          <div className="grid grid-cols-6 gap-4">
            {/* 項目名 */}
            <div className="bg-blue-700 text-white text-center">G</div>
            <div className="bg-blue-700 text-white text-center">GS</div>
            <div className="bg-blue-700 text-white text-center">MPG</div>
            <div className="bg-blue-700 text-white text-center">PPG</div>
            <div className="bg-blue-700 text-white text-center">RPG</div>
            <div className="bg-blue-700 text-white text-center">APG</div>
            {/* 値 */}
            <div className="text-black text-center text-xl">{player.game}</div>
            <div className="text-black text-center text-xl">{player.gs}</div>
            <div className="text-black text-center text-xl">{player.mpg}</div>
            <div className="text-black text-center text-xl">{player.ppg}</div>
            <div className="text-black text-center text-xl">{player.rpg}</div>
            <div className="text-black text-center text-xl">{player.apg}</div>
            {/* 項目名 */}
            <div className="bg-blue-700 text-white text-center">SPG</div>
            <div className="bg-blue-700 text-white text-center">BPG</div>
            <div className="bg-blue-700 text-white text-center">TO</div>
            <div className="bg-blue-700 text-white text-center">FG%</div>
            <div className="bg-blue-700 text-white text-center">3P%</div>
            <div className="bg-blue-700 text-white text-center">FT%</div>
            {/* 値 */}
            <div className="text-black text-center text-xl">{player.spg}</div>
            <div className="text-black text-center text-xl">{player.bpg}</div>
            <div className="text-black text-center text-xl">
              {player.turnover}
            </div>
            <div className="text-black text-center text-xl">
              {player.percent_fg}%
            </div>
            <div className="text-black text-center text-xl">
              {player.percent_3point}%
            </div>
            <div className="text-black text-center text-xl">
              {player.percent_ft}%
            </div>
          </div>
        </div>

        {/* ヒントゾーンと回答フォーム */}
        <div className="w-full flex">
          {/* ヒントゾーン */}
          <div className="flex-1 p-4 border rounded-md">
            <h3 className="text-lg font-medium mb-4">ヒント</h3>
            <button
              className={`px-4 py-4 mb-6 block w-full ${
                hintsShown.team
                  ? "bg-gray-300 cursor-default"
                  : "bg-blue-500 text-white"
              } rounded-md`}
              onClick={() => showHint("team")}
              disabled={hintsShown.team}
            >
              チーム:
              {hintsShown.team &&
                `${player.team}${player.team2 ? "-" + player.team2 : ""}`}
            </button>
            <button
              className={`px-4 py-4 mb-6 block w-full ${
                hintsShown.position
                  ? "bg-gray-300 cursor-default"
                  : "bg-blue-500 text-white"
              } rounded-md`}
              onClick={() => showHint("position")}
              disabled={hintsShown.position}
            >
              ポジション:
              {hintsShown.position &&
                `${player.position}${
                  player.position2 ? "/" + player.position2 : ""
                }`}
            </button>
            <button
              className={`px-4 py-4 block w-full ${
                hintsShown.size
                  ? "bg-gray-300 cursor-default"
                  : "bg-blue-500 text-white"
              } rounded-md`}
              onClick={() => showHint("size")}
              disabled={hintsShown.size}
            >
              体重/身長:
              {hintsShown.size && `${player.kg}/${player.meter}`}
            </button>
          </div>

          {/* 回答フォーム */}
          <div className="flex-1 ml-4 p-5 border rounded-md flex flex-col relative">
            {" "}
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
              {" "}
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
        correctPlayerName={player.firstname + " " + player.lastname} // 追加箇所: 正解の選手名を渡す
        onNext={() => {
          setIsModalOpen(false);
          fetchData();
          setQuizCount((prevCount) => Math.min(prevCount + 1, ALL_QUIZ_COUNT));
        }}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Quiz;
