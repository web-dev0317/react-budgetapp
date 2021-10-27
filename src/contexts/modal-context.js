import React, { useReducer, useCallback } from "react";

const initialState = {
  isModalShown: false,
  modalType: "SET",
};

const modalReducer = (state, action) => {
  if (action.type === "SHOW") {
    return {
      ...state,
      isModalShown: true,
    };
  }
  if (action.type === "HIDE") {
    return {
      ...state,
      isModalShown: false,
    };
  }
  if (
    action.type === "SET" ||
    action.type === "RESET" ||
    action.type === "ADD" ||
    action.type === "DED"
  ) {
    return {
      ...state,
      modalType: action.type,
    };
  }
  return initialState;
};

export const ModalContext = React.createContext({
  modalState: {
    isModalShown: false,
    modalType: "SET",
  },
  showModal: () => {},
  hideModal: () => {},
  setModalType: () => {},
});

const ModalContextProvider = (props) => {
  const [modalState, dispatch] = useReducer(modalReducer, initialState);

  const showModal = useCallback(() => {
    dispatch({ type: "SHOW" });
  }, []);

  const hideModal = () => {
    dispatch({ type: "HIDE" });
    dispatch({ type: "SET" });
  };

  const setModalType = useCallback((type) => {
    dispatch({ type });
    dispatch({ type: "SHOW" });
  }, []);

  return (
    <ModalContext.Provider
      value={{
        modalState,
        showModal,
        hideModal,
        setModalType,
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
