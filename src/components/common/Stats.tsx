import React from "react";
import { Player } from "../models/interface";

interface StatsProps {
  player: Player;
}

const Stats: React.FC<StatsProps> = ({ player }) => {
  return (
    <div className="p-5 border rounded-md">
      <h3 className="text-lg font-medium mb-4">Stats</h3>
      <div className="grid grid-cols-6 gap-4">
        {/* 項目名 */}
        <div className="bg-blue-700 text-white text-center">G</div>
        <div className="bg-blue-700 text-white text-center">GS</div>
        <div className="bg-blue-700 text-white text-center">MPG</div>
        <div className="bg-blue-700 text-white text-center">PPG</div>
        <div className="bg-blue-700 text-white text-center">RPG</div>
        <div className="bg-blue-700 text-white text-center">APG</div>
        {/* 値 */}
        <div className="text-black text-center text-xl">{player.game}</div>
        <div className="text-black text-center text-xl">{player.gs}</div>
        <div className="text-black text-center text-xl">{player.mpg}</div>
        <div className="text-black text-center text-xl">{player.ppg}</div>
        <div className="text-black text-center text-xl">{player.rpg}</div>
        <div className="text-black text-center text-xl">{player.apg}</div>
        {/* 項目名 */}
        <div className="bg-blue-700 text-white text-center">SPG</div>
        <div className="bg-blue-700 text-white text-center">BPG</div>
        <div className="bg-blue-700 text-white text-center">TO</div>
        <div className="bg-blue-700 text-white text-center">FG%</div>
        <div className="bg-blue-700 text-white text-center">3P%</div>
        <div className="bg-blue-700 text-white text-center">FT%</div>
        {/* 値 */}
        <div className="text-black text-center text-xl">{player.spg}</div>
        <div className="text-black text-center text-xl">{player.bpg}</div>
        <div className="text-black text-center text-xl">{player.turnover}</div>
        <div className="text-black text-center text-xl">
          {player.percent_fg}%
        </div>
        <div className="text-black text-center text-xl">
          {player.percent_3point}%
        </div>
        <div className="text-black text-center text-xl">
          {player.percent_ft}%
        </div>
        :
      </div>
    </div>
  );
};

export default Stats;
