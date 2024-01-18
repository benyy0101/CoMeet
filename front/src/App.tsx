import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewRoom from "./pages/NewRoom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/new-room" element={<NewRoom />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
