import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewRoom from "./pages/NewRoom";
import ConditionCheck from "./pages/ConditionCheck";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/new-room" element={<NewRoom />}></Route>
          <Route path="/before-entrance" element={<ConditionCheck />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
