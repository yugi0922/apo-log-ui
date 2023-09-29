import { AppRouter } from "./components/routes/Router";
import Header from "./components/common/Header";

function App() {
  return (
    <div className="App bg-gray-100 min-h-screen">
      <Header />
      <AppRouter />
    </div>
  );
}

export default App;
