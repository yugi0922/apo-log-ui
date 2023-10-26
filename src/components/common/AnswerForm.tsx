import React from "react";

interface AnswerFormProps {
  answer: string;
  quizCount: number;
  ALL_QUIZ_COUNT: number;
  onAnswerChange: (value: string) => void;
  onCheckAnswer: () => void;
}

const AnswerForm: React.FC<AnswerFormProps> = ({
  answer,
  quizCount,
  ALL_QUIZ_COUNT,
  onAnswerChange,
  onCheckAnswer,
}) => {
  return (
    <div className="flex-1 ml-4 p-5 border rounded-md flex flex-col relative">
      <h3 className="text-lg font-medium mb-4">回答</h3>
      <input
        className="w-full p-2 border rounded-md mb-4"
        type="text"
        value={answer}
        onChange={(e) => onAnswerChange(e.target.value)}
        placeholder="選手の名前を入力"
      />
      <button
        className="w-full px-4 py-4 bg-green-500 text-white rounded-md mb-4"
        onClick={onCheckAnswer}
      >
        Answer
      </button>
      <div className="absolute bottom-2 right-2 text-lg text-white bg-teal-700 px-2 py-1 rounded">
        問題数：{Math.min(quizCount, ALL_QUIZ_COUNT)}/{ALL_QUIZ_COUNT}
      </div>
    </div>
  );
};

export default AnswerForm;
