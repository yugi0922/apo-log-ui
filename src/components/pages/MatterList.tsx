import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; // useNavigateをインポート
import { Matter } from "../models/interface";
import { format } from "date-fns";
import ja from "date-fns/locale/ja";
import { api } from "../common/apiConfig";



const MatterList = () => {
  const [matters, setMatters] = useState<Matter[]>([]);
  const navigate = useNavigate(); // useNavigateのフックを使用
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<Matter[]>("/list"); // ここを変更
        setMatters(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleNewClick = () => {
    navigate('/new'); // '新規'ボタンをクリックしたときの遷移処理
  };

  const handleResultClick = () => {
    navigate('/result'); // '結果'ボタンの遷移処理
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">案件一覧</h1>
        <button onClick={handleNewClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          新規
        </button>
        <button onClick={handleResultClick} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            結果
          </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              {/* 以下の列ヘッダーを追加・変更 */}
              <th className="px-6 py-3 text-left uppercase tracking-wider font-bold">ニックネーム</th>
              <th className="px-6 py-3 text-left uppercase tracking-wider font-bold">アプリ</th>
              <th className="px-6 py-3 text-left uppercase tracking-wider font-bold">年齢</th>
              <th className="px-6 py-3 text-left uppercase tracking-wider font-bold">スト値</th>
              <th className="px-6 py-3 text-left uppercase tracking-wider font-bold">職業</th>
              <th className="px-6 py-3 text-left uppercase tracking-wider font-bold">エリア</th>
              <th className="px-6 py-3 text-left uppercase tracking-wider font-bold">フェーズ</th>
              <th className="px-6 py-3 text-left uppercase tracking-wider font-bold">次回アポ日</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {matters.map((matter, index) => (
              <tr key={index}>
                {/* 各列のデータを追加・変更 */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{matter.nickName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{matter.appCategory}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{matter.age}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{matter.looksLevel}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{matter.job}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{matter.address}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{matter.fhase}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {matter.nextApoDate
                    ? format(
                        new Date(matter.nextApoDate),
                        "yyyy-MM-dd HH:mm:ss （E）",
                        { locale: ja }
                      )
                    : "未定"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MatterList;
