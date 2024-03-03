import React, { ChangeEvent, FormEvent, useState } from 'react';
import { api } from "../common/apiConfig"; // apiConfigのインポート

const MatterRegist = () => {
  const [formData, setFormData] = useState({
    nickName: '',
    apoCategory: '',
    age: '',
    job: '',
    address: '',
    fhase: '',
    completeFlg: '',
    apoStatus: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.post('/new', formData); // apiConfigを使用
      console.log(response.data);
      // 追加処理（成功メッセージの表示など）
    } catch (error) {
      console.error('Error posting data:', error);
      // エラー処理
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">案件登録</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {/* 名前フィールド */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nickName">
            名前：
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="nickName" id="nickName" value={formData.nickName} onChange={handleChange} />
        </div>
        {/* 以下、追加されたフィールド */}
        {/** アポ分類フィールド **/}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apoCategory">
            アポ分類：
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="apoCategory" id="apoCategory" value={formData.apoCategory} onChange={handleChange} />
        </div>
        {/** 年齢フィールド **/}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
            年齢：
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="age" id="age" value={formData.age} onChange={handleChange} />
        </div>
        {/** 職業フィールド **/}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="job">
            職業：
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="job" id="job" value={formData.job} onChange={handleChange} />
        </div>
        {/** 地域フィールド **/}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
            地域：
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="address" id="address" value={formData.address} onChange={handleChange} />
        </div>
        {/** アポフェーズフィールド **/}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fhase">
            アポフェーズ：
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="fhase" id="fhase" value={formData.fhase} onChange={handleChange} />
        </div>
        {/** 完了フラグフィールド **/}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="completeFlg">
            完了：
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="completeFlg" id="completeFlg" value={formData.completeFlg} onChange={handleChange} />
        </div>
        {/** アポステータス **/}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apoStatus">
            結果：
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="apoStatus" id="apoStatus" value={formData.apoStatus} onChange={handleChange} />
        </div>
        {/* 登録ボタン */}
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            登録
          </button>
        </div>
      </form>
    </div>
  );
};


export default MatterRegist;
