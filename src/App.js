import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import HomeContainer from "./components/HomeContainer";
import DetailContainer from "./components/DetailContainer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" exact element={<HomeContainer />} />
            <Route path="/pokemon/:id" element={<DetailContainer />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
