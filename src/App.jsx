import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
// import './App.css'
import Questionnare from "./Questionnare";
import MicrobiomeForm from "./microbiomeForm";
import KitRegistered from "./kitRegistered";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/registeryourkit" element={<MicrobiomeForm />} />
          <Route path="/registeryourkit/kitRegistered" element={<KitRegistered />} />
        </Routes>
        </BrowserRouter >
      </>
      );
}

      export default App;