import React, { useState, useEffect } from "react";
import axios from "axios";
import { Player } from "../models/interface";

// Axiosのインスタンスを作成
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

const Quiz = () => {
  const [player, setPlayer] = useState<Player | null>(null);
  const [hint, setHint] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [result, setResult] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<Player>("/easy");
        setPlayer(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!player) {
    return <div className="text-center p-5">データ取得中...</div>;
  }

  const showHint = (hintType: number) => {
    switch (hintType) {
      case 1:
        setHint(
          `|チーム|：${player.team}${player.team2 ? "-" + player.team2 : ""}`
        );
        break;
      case 2:
        setHint(
          `|ポジション|：${player.position}${
            player.position2 ? "/" + player.position2 : ""
          }`
        );
        break;
      case 3:
        setHint(`|体重/身長|：${player.kg}/${player.meter}`);
        break;
      default:
        break;
    }
  };

  const checkAnswer = () => {
    if (answer === player.firstname || answer === player.lastname) {
      setResult("OK！");
    } else {
      setResult("NG..");
    }
  };

  return (
    <div className="bg-gray-50 flex flex-col items-center p-6 space-y-6">
      <div className="flex flex-col items-center p-6 space-y-6">
        <h1 className="text-xl font-bold">対象プレイヤー</h1>
        <div className="flex w-full space-x-6">
          {/* Statsエリア */}
          <div className="flex-1 p-5 border rounded-md">
            <h2 className="text-lg font-medium mb-4">Statsエリア</h2>
            <div>GAME: {player.game}</div>
            <div>GS: {player.gs}</div>
            <div>MPG: {player.mpg}</div>
            <div>PPG: {player.ppg}</div>
            <div>RPG: {player.rpg}</div>
            <div>APG: {player.apg}</div>
            <div>SPG: {player.spg}</div>
            <div>BPG: {player.bpg}</div>
            <div>TURNOVER: {player.turnover}</div>
            <div>PERCENT_FG: {player.percent_fg}%</div>
            <div>PERCENT_3POINT: {player.percent_3point}%</div>
            <div>PERCENT_FT: {player.percent_ft}%</div>
          </div>

          {/* ヒントゾーン */}
          <div className="flex-1 p-5 border rounded-md">
            <h2 className="text-lg font-medium mb-4">ヒントゾーン</h2>
            <button
              className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-md"
              onClick={() => showHint(1)}
            >
              ヒント1
            </button>
            <button
              className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-md"
              onClick={() => showHint(2)}
            >
              ヒント2
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={() => showHint(3)}
            >
              ヒント3
            </button>
            <div className="mt-4">{hint}</div>
          </div>
        </div>

        <div className="w-full p-5 border rounded-md">
          <input
            className="w-2/3 p-2 border rounded-md"
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="選手の名前を入力"
          />
          <button
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={checkAnswer}
          >
            Answer
          </button>
          <div className="mt-4">{result}</div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
