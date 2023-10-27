import React, { useState, useEffect } from "react";
import axios from "axios";
import { Player } from "../models/interface";
import Stats from "../common/Stats";
import HintZone from "../common/HintZone";
import AnswerForm from "../common/AnswerForm";
import ResultModal from "../common/ResultModal";
import { useNavigate } from "react-router-dom"; // useNavigateをインポート

// api
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

// 全問題数
const ALL_QUIZ_COUNT = 10;

// クイズ画面で使用する型定義
type QuizState = {
  player: Player | null;
  hintsShown: {
    team: boolean;
    position: boolean;
    size: boolean;
  };
  answer: string;
  result: string;
  score: number;
  hintCount: number;
  isModalOpen: boolean;
  quizCount: number;
};

// 初期状態オブジェクト
const initialState = {
  player: null,
  hintsShown: {
    team: false,
    position: false,
    size: false,
  },
  answer: "",
  result: "",
  score: 0,
  hintCount: 0,
  isModalOpen: false,
  quizCount: 1,
};

// アクションタイプの定数
const SET_PLAYER = "SET_PLAYER";
const TOGGLE_HINT_SHOWN = "TOGGLE_HINT_SHOWN"; // この行を追加
const SET_ANSWER = "SET_ANSWER"; // この行を追加
const SET_RESULT = "SET_RESULT"; // この行を追加
const INCREMENT_SCORE = "INCREMENT_SCORE"; // この行を追加
const INCREMENT_HINT_COUNT = "INCREMENT_HINT_COUNT"; // この行を追加
const TOGGLE_MODAL = "TOGGLE_MODAL";
const INCREMENT_QUIZ_COUNT = "INCREMENT_QUIZ_COUNT"; // この行を追加

// アクションタイプの型定義
type ActionType =
  | { type: typeof SET_PLAYER; payload: Player }
  | { type: typeof TOGGLE_HINT_SHOWN; hintType: "team" | "position" | "size" } // この行を修正
  | { type: typeof SET_ANSWER; payload: string }
  | { type: typeof SET_RESULT; payload: string } // この行を追加
  | { type: typeof INCREMENT_SCORE } // この行を追加
  | { type: typeof INCREMENT_HINT_COUNT } // この行を追加
  | { type: typeof TOGGLE_MODAL }
  | { type: typeof INCREMENT_QUIZ_COUNT }; // この行を追加

// リデューサ関数の定義
const quizReducer = (state: QuizState, action: ActionType): QuizState => {
  switch (action.type) {
    // プレイヤー情報をセット
    case "SET_PLAYER":
      return { ...state, player: action.payload };

    // 指定されたヒントの表示を切り替える
    case "TOGGLE_HINT_SHOWN":
      return {
        ...state,
        hintsShown: {
          ...state.hintsShown,
          [action.hintType]: !state.hintsShown[action.hintType],
        },
      };

    // 回答をセット
    case "SET_ANSWER":
      return { ...state, answer: action.payload };

    // 結果をセット (OK または NG)
    case "SET_RESULT":
      return { ...state, result: action.payload };

    // スコアを増やす
    case "INCREMENT_SCORE":
      return { ...state, score: state.score + 10 };

    // ヒントのカウントを増やす
    case "INCREMENT_HINT_COUNT":
      return { ...state, hintCount: state.hintCount + 1 };

    // モーダルの表示を切り替える
    case "TOGGLE_MODAL":
      return { ...state, isModalOpen: !state.isModalOpen };

    // クイズのカウントを増やす
    case "INCREMENT_QUIZ_COUNT":
      return {
        ...state,
        quizCount: Math.min(state.quizCount + 1, ALL_QUIZ_COUNT),
      };

    default:
      return state;
  }
};
const Quiz = () => {
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

  const showHint = (hintType: "team" | "position" | "size") => {
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
        {/* ヒントゾーンと回答フォーム */}
        <div className="w-full flex">
          {/* HintZoneコンポーネントを使用 */}
          <HintZone
            player={player}
            hintsShown={hintsShown}
            showHint={showHint}
          />
          {/* 回答フォーム */}
          <AnswerForm
            answer={answer}
            quizCount={quizCount}
            ALL_QUIZ_COUNT={ALL_QUIZ_COUNT}
            onAnswerChange={setAnswer}
            onCheckAnswer={checkAnswer}
          />
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
