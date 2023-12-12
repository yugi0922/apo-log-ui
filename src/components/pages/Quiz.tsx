import React, { useEffect, useReducer } from "react";
import { api } from "../common/apiConfig";
import { Player } from "../models/interface";
import Stats from "../common/Stats";
import HintZone from "../common/HintZone";
import AnswerForm from "../common/AnswerForm";
import ResultModal from "../common/ResultModal";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../common/ErrorMessage";

// 全問題数
const ALL_QUIZ_COUNT = 10;

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
  error: string | null;
};

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
  error: null,
};

// アクションタイプの定数を定義
// これらの定数はアクションの種類を区別するために使用される
const SET_PLAYER = "SET_PLAYER";
const TOGGLE_HINT_SHOWN = "TOGGLE_HINT_SHOWN";
const RESET_HINTS = "RESET_HINTS"; // ヒントの状態をリセットするためのアクションタイプを追加
const SET_ANSWER = "SET_ANSWER";
const SET_RESULT = "SET_RESULT";
const INCREMENT_SCORE = "INCREMENT_SCORE";
const INCREMENT_HINT_COUNT = "INCREMENT_HINT_COUNT";
const TOGGLE_MODAL = "TOGGLE_MODAL";
const INCREMENT_QUIZ_COUNT = "INCREMENT_QUIZ_COUNT";
const SET_ERROR = "SET_ERROR";

type ActionType =
  | { type: typeof SET_PLAYER; payload: Player }
  | { type: typeof TOGGLE_HINT_SHOWN; hintType: "team" | "position" | "size" }
  | { type: typeof RESET_HINTS } // ヒントの状態をリセットするためのアクションタイプを追加
  | { type: typeof SET_ANSWER; payload: string }
  | { type: typeof SET_RESULT; payload: string }
  | { type: typeof INCREMENT_SCORE }
  | { type: typeof INCREMENT_HINT_COUNT }
  | { type: typeof TOGGLE_MODAL }
  | { type: typeof INCREMENT_QUIZ_COUNT }
  | { type: typeof SET_ERROR; payload: string };

// リデューサ関数の定義
// この関数は現在の状態と、実行したいアクションを元に新しい状態を返す
const quizReducer = (state: QuizState, action: ActionType): QuizState => {
  switch (action.type) {
    case SET_PLAYER:
      // プレイヤー情報をセットする
      return { ...state, player: action.payload };

    case TOGGLE_HINT_SHOWN:
      // 指定されたヒントの表示状態をトグルする（表示 <=> 非表示）
      return {
        ...state,
        hintsShown: {
          ...state.hintsShown,
          [action.hintType]: !state.hintsShown[action.hintType],
        },
      };
    case RESET_HINTS:
      // ヒントの表示状態を初期状態（全て非表示）にリセット
      return {
        ...state,
        hintsShown: {
          team: false,
          position: false,
          size: false,
        },
      };

    case SET_ANSWER:
      // ユーザーの回答をセットする
      return { ...state, answer: action.payload };

    case SET_RESULT:
      // 回答結果をセットする (OK or NG)
      return { ...state, result: action.payload };

    case INCREMENT_SCORE:
      // 正解の場合、スコアを10点増加させる
      return { ...state, score: state.score + 10 };

    case INCREMENT_HINT_COUNT:
      // ヒントを使用した場合、使用回数をカウントアップする
      return { ...state, hintCount: state.hintCount + 1 };

    case TOGGLE_MODAL:
      // モーダルの表示状態をトグルする
      return { ...state, isModalOpen: !state.isModalOpen };

    case INCREMENT_QUIZ_COUNT:
      // クイズの番号を1つ進める（最大値はALL_QUIZ_COUNT）
      return {
        ...state,
        quizCount: Math.min(state.quizCount + 1, ALL_QUIZ_COUNT),
      };
    case SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const Quiz = () => {
  // useReducerを使用して状態とディスパッチ関数を取得
  // ディスパッチ関数はアクションを実行するための関数
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const navigate = useNavigate();

  // 初期データの取得
  const fetchData = async (isMounted: boolean) => {
    try {
      console.log(api.defaults.baseURL); // Axios インスタンスの場合
      const response = await api.get<Player>("/easy");
      // ここでisMountedを確認して、コンポーネントがまだマウントされている場合のみ状態を更新
      if (isMounted) {
        dispatch({ type: SET_PLAYER, payload: response.data });
        dispatch({ type: SET_ANSWER, payload: "" });
        dispatch({ type: SET_RESULT, payload: "" });
      }
    } catch (error) {
      // ここでもisMountedを確認して、コンポーネントがまだマウントされている場合のみ状態を更新
      if (isMounted) {
        // プレイヤー情報の取得に失敗した場合のエラーメッセージを変更する
        dispatch({
          type: SET_ERROR,
          payload: "問題の取得中にエラーが発生しました。",
        });
      }
    }
  };

  useEffect(() => {
    let isMounted = true; // マウント状態を追跡する変数をtrueに設定

    fetchData(isMounted);

    // クリーンアップ関数
    return () => {
      isMounted = false; // コンポーネントのアンマウント時に変数をfalseに設定
    };
  }, []);

  // プレイヤー情報が取得できていない場合、エラーメッセージを表示
  if (!state.player && state.error) {
    return <ErrorMessage message={state.error} />;
  }

  // プレイヤー情報が取得できていない場合、エラーメッセージを表示
  // またはプレイヤー情報がnullである場合はStatsコンポーネントを表示しない
  if (!state.player) {
    if (state.error) {
      return <ErrorMessage message={state.error} />;
    }
  }
  // ヒントを表示
  const showHint = (hintType: "team" | "position" | "size") => {
    dispatch({ type: TOGGLE_HINT_SHOWN, hintType });
    dispatch({ type: INCREMENT_HINT_COUNT });
  };

  // 回答をチェック
  const checkAnswer = () => {
    if (!state.player) {
      return;
    }

    if (
      state.answer === state.player.firstname ||
      state.answer === state.player.lastname
    ) {
      dispatch({ type: SET_RESULT, payload: "OK！" });
      dispatch({ type: INCREMENT_SCORE });
    } else {
      dispatch({ type: SET_RESULT, payload: "NG.." });
    }
    dispatch({ type: TOGGLE_MODAL });
  };

  // 次の問題または結果画面に進む
  const onNext = () => {
    dispatch({ type: TOGGLE_MODAL });
    if (state.quizCount >= ALL_QUIZ_COUNT) {
      navigate("/finalResult", {
        state: { score: state.score, hintCount: state.hintCount },
      });
    } else {
      fetchData(true);
      dispatch({ type: INCREMENT_QUIZ_COUNT });
    }
    // 回答をチェックした後、ヒントの表示状態を初期状態（非表示）にリセット
    dispatch({ type: RESET_HINTS });
  };

  return (
    <div className="bg-gray-50 flex flex-col items-center p-6 space-y-6">
      <div className="w-full space-y-6">
        {state.player && <Stats player={state.player} />}
        <div className="w-full flex">
          {state.player && (
            <HintZone
              player={state.player}
              hintsShown={state.hintsShown}
              showHint={showHint}
            />
          )}
          <AnswerForm
            answer={state.answer}
            quizCount={state.quizCount}
            ALL_QUIZ_COUNT={ALL_QUIZ_COUNT}
            onAnswerChange={(answer) =>
              dispatch({ type: SET_ANSWER, payload: answer })
            }
            onCheckAnswer={checkAnswer}
          />
        </div>
      </div>
      {state.player && (
        <ResultModal
          isOpen={state.isModalOpen}
          result={state.result}
          correctPlayerName={`${state.player.firstname} ${state.player.lastname}`}
          onNext={onNext}
          onClose={() => dispatch({ type: TOGGLE_MODAL })}
        />
      )}
    </div>
  );
};

export default Quiz;
