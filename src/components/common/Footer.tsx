import React from "react";

const Footer: React.FC = () => {
  return (
    // フッターの全体スタイル
    <footer className="flex items-center justify-between h-10 px-24 bg-gradient-to-r from-blue-900 to-black">
      {" "}
      {/* px-12 を px-24 に変更してパディングを増やす */}
      {/* 左側の「©2023」の表示 */}
      <div className="text-lg font-semibold text-white">©2023</div>
      {/* 右側の「@nba_stats_suwa」の表示 */}
      <div className="text-lg font-semibold text-white">@nba_stats_suwa</div>
    </footer>
  );
};

export default Footer;
