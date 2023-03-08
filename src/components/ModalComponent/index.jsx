import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { useStateValue } from "../../utils/StateProvider";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0px",
  },
};
Modal.setAppElement("#root");
export default function ModalComponent({
  buttonName,
  children,
  icon,
  modalClosed,
  noHeader,
  customButton,
  svg,
  title,
  ...otherProps
}) {
  const [{ loading, modalState }, dispatch] = useStateValue();
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {}

  function closeModal() {
    dispatch({
      type: "SET_MODAL",
      item: false,
    });
    setIsOpen(false);
  }
  useEffect(() => {
    dispatch({
      type: "SET_MODAL",
      item: true,
    });
    setIsOpen(false);
    if (modalState === false) {
      setIsOpen(false);
    }
  }, [loading, modalState]);
  return (
    <div {...otherProps}>
      {icon ? (
        <button className="" onClick={openModal}>
          {icon}
        </button>
      ) : customButton === "true" ? (
        <button onClick={openModal}>{svg}</button>
      ) : (
        <button
          className="inline-flex relative block text-sm font-semibold bg-[#2572bc] text-white py-3 px-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 hover:bg-[#166bbc] rounded shadow"
          onClick={openModal}
        >
          {buttonName}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="m-auto ml-2 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      )}

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {noHeader === "true" ? (
          ""
        ) : (
          <div className=" text-base flex justify-between pl-3 py-4 bg-blue-100 block font-base font-bold capitalizeundefined">
            {buttonName}
            {title}
            <svg
              onClick={() => closeModal()}
              className={
                "cursor-pointer mr-2 rotate-[130deg] svg-circleplus h-[2rem] stroke-[#000]"
              }
              viewBox="0 0 100 100"
            >
              <line x1="32.5" y1="50" x2="67.5" y2="50" strokeWidth="5"></line>
              <line x1="50" y1="32.5" x2="50" y2="67.5" strokeWidth="5"></line>
            </svg>
          </div>
        )}

        {children}
      </Modal>
    </div>
  );
}
