import { AppRouter } from "./components/routes/Router";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-900 to-black">
      <Header />
      {/* flex-grow をこの div に適用 */}
      <div className="flex-grow">
        <AppRouter />
      </div>
      <Footer />
    </div>
  );
}

export default App;
