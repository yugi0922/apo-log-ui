import React, { useState, useEffect } from 'react';
import { api } from "../common/apiConfig";
import { ApoResult } from '../models/interface';

const ApoResultDisplay = () => {
  const [apoResult, setApoResult] = useState<ApoResult | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApoResult = async () => {
      try {
        const response = await api.get('/result');
        setApoResult(response.data);
        setError(''); // エラーをリセット
      } catch (err) {
        setError('データの取得に失敗しました。'); // エラーメッセージをセット
        console.error(err);
      }
    };

    fetchApoResult();
  }, []);

  return (
    <div className="max-w-2xl mx-auto my-10 p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6">アポ結果</h1>
      {apoResult ? (
        <div>
          <div className="mb-4"><strong>累計アポ数:</strong> {apoResult.countApoTotal}</div>
          <div className="mb-4"><strong>累計即数:</strong> {apoResult.countSokuTotal}</div>
          <div className="mb-4"><strong>直近1か月間のアポ数:</strong> {apoResult.countApoTotalMonthBefore}</div>
          <div className="mb-4"><strong>直近一か月の勝率:</strong> {apoResult.rateSokuMonthBefore}%</div>
          <div className="mb-4"><strong>直近一か月の合計アポ費用:</strong> {apoResult.countMoneyTotalMonthBefore}</div>
          <div className="mb-4"><strong>今月のアポ予定合計数:</strong> {apoResult.forecastApoTotalCurrentMonth}</div>
          <div className="mb-4"><strong>今月の勝率:</strong> {apoResult.rateSokuCurrentMonth}%</div>
          <div><strong>今月の合計アポ費用:</strong> {apoResult.countMoneyTotalCurrentMonth}</div>
        </div>
      ) : (
        !error && <div>データを読み込み中...</div> // ローディングメッセージ
      )}
    </div>
  );
};

export default ApoResultDisplay;
