import { Route, Routes } from "react-router-dom";
import MatterList from "../pages/MatterList";
import TopPage from "../pages/TopPage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<TopPage />} />
      <Route path="/list" element={<MatterList />} />
    </Routes>
  );
};
