import React from "react";

interface ResultModalProps {
  isOpen: boolean;
  result: string;
  onNext: () => void;
  onClose: () => void;
  correctPlayerName?: string; // 追加: 正解の選手名
}

const ResultModal: React.FC<ResultModalProps> = ({
  isOpen,
  result,
  onNext,
  onClose,
  correctPlayerName,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-70"
      onClick={onClose}
    >
      {/* モーダルのコンテナ */}
      <div
        className="bg-white rounded-xl p-8 flex flex-col items-center justify-center shadow-xl w-4/5 max-w-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 結果の表示 */}
        <p
          className={`text-6xl mb-4 ${
            result === "OK！" ? "text-green-500" : "text-red-500"
          }`}
        >
          {result === "OK！" ? "〇" : "×"}
        </p>
        {/* 誤答時の正解の選手名表示 */}
        {result !== "OK！" && (
          <p className="text-2xl mb-4">{correctPlayerName}</p> // 追加箇所
        )}
        {/* 次へのボタン */}
        <button
          onClick={onNext}
          className="px-8 py-2 text-xl font-medium text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ResultModal;
