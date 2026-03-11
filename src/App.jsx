import { Routes, Route, Link } from "react-router-dom";
// import './App.css'
import Questionnare from "./Questionnare";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Questionnare />} />
      </Routes>
    </>
  );
}

export default App;