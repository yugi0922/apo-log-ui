import React from "react";
import { Player } from "../models/interface";

interface HintZoneProps {
  player: Player;
  hintsShown: {
    team: boolean;
    position: boolean;
    size: boolean;
  };
  showHint: (hintType: "team" | "position" | "size") => void;
}

const HintZone: React.FC<HintZoneProps> = ({
  player,
  hintsShown,
  showHint,
}) => {
  return (
    <div className="flex-1 p-4 border rounded-md">
      {/* ... 既存のヒントボタンのコード ... */}
      {/* ヒントゾーン */}
      <div className="flex-1 p-4 border rounded-md">
        <h3 className="text-lg font-medium mb-4">ヒント</h3>
        <button
          className={`px-4 py-4 mb-6 block w-full ${
            hintsShown.team
              ? "bg-gray-300 cursor-default"
              : "bg-blue-500 text-white"
          } rounded-md`}
          onClick={() => showHint("team")}
          disabled={hintsShown.team}
        >
          チーム:
          {hintsShown.team &&
            `${player.team}${player.team2 ? "-" + player.team2 : ""}`}
        </button>
        <button
          className={`px-4 py-4 mb-6 block w-full ${
            hintsShown.position
              ? "bg-gray-300 cursor-default"
              : "bg-blue-500 text-white"
          } rounded-md`}
          onClick={() => showHint("position")}
          disabled={hintsShown.position}
        >
          ポジション:
          {hintsShown.position &&
            `${player.position}${
              player.position2 ? "/" + player.position2 : ""
            }`}
        </button>
        <button
          className={`px-4 py-4 block w-full ${
            hintsShown.size
              ? "bg-gray-300 cursor-default"
              : "bg-blue-500 text-white"
          } rounded-md`}
          onClick={() => showHint("size")}
          disabled={hintsShown.size}
        >
          体重/身長:
          {hintsShown.size && `${player.kg}/${player.meter}`}
        </button>
      </div>
    </div>
  );
};

export default HintZone;
