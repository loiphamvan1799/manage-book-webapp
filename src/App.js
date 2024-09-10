import "./App.css";
import Home from './components/Home/Home'
import SearchBooks from './components/Book/SearchBooks'
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Router = () => (
  <Routes>
    <Route path="/" element={<Home />}></Route>
    <Route path="/search" element={<SearchBooks />} />
  </Routes>
);

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;