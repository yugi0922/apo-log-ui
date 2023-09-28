import "./App.css";
import { AppRouter } from "./components/routes/Router";
import Header from "./components/common/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <AppRouter />
    </div>
  );
}

export default App;
