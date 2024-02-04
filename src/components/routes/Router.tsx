import { Route, Routes } from "react-router-dom";
import MatterList from "../pages/MatterList";
import TopPage from "../pages/TopPage";
import Quiz from "../pages/Quiz"; // Quizコンポーネントをインポート
import Result from "../pages/Result"; // Resultコンポーネントをインポート

export const AppRouter = () => {
  return (
    <div className="flex flex-col flex-grow">
      {/* 追加したdiv */}
      <Routes>
        <Route path="/" element={<MatterList />} />
      </Routes>
    </div>
  );
};
