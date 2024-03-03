import { Route, Routes } from "react-router-dom";
import MatterList from "../pages/MatterList";
import MatterRegist from "../pages/MatterRegist";
import ApoResult from "../pages/ApoResult"; // ApoResultをインポート

export const AppRouter = () => {
  return (
    <div className="flex flex-col flex-grow">
      <Routes>
        <Route path="/" element={<MatterList />} />
        <Route path="/new" element={<MatterRegist />} />
        <Route path="/result" element={<ApoResult />} /> {/* '/result' のルートを追加 */}
      </Routes>
    </div>
  );
};
