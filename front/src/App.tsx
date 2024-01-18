import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewRoom from "./pages/NewRoom";
import ConditionCheck from "./pages/ConditionCheck";
import Modal from "./components/Modal";

function App() {
  const [isModal, setIsModal] = React.useState<boolean>(false);

  const modalHandler = () => {
    setIsModal(!isModal);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/new-room" element={<NewRoom />}></Route>
          <Route path="/before-entrance" element={<ConditionCheck />}></Route>
        </Routes>
      </BrowserRouter>
      <button onClick={modalHandler}> dhkfkfkfkf</button>
      {isModal && <Modal toggleModal={modalHandler}/>}
    </div>
  );
}

export default App;
