import React from "react";
import ReactDOM from "react-dom";

interface ModalPortalProps {
  children: React.ReactNode;
}

const ModalPortal: React.FC<ModalPortalProps> = ({ children }) => {
  const el: HTMLElement | null = document.getElementById("modal");
  return el ? ReactDOM.createPortal(children, el) : null;
};

export default ModalPortal;
