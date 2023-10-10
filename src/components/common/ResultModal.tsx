import React from "react";

interface ResultModalProps {
  isOpen: boolean;
  result: string;
  onNext: () => void;
  onClose: () => void;
}

const ResultModal: React.FC<ResultModalProps> = ({
  isOpen,
  result,
  onNext,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        <p>{result === "OK！" ? "〇" : "×"}</p>
        <button onClick={onNext}>Next</button>
      </div>
    </div>
  );
};

export default ResultModal;
