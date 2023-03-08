import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { useStateValue } from "../../utils/StateProvider";
import { getCommentsListMinistry, postCommentMinistry } from "../../api";
import UseInput from "../../utils/UseInput";

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

export default function MinistryCommentList({ information_id, status }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const token = localStorage.getItem("token").replace(/['"]+/g, "");
  const [{ loading, modalState }, dispatch] = useStateValue();
  const [commentList, setCommentList] = useState();
  const [noData, setNoData] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentPosted, setCommentPosted] = useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const { value: text, bind: bindText, reset: resetText } = UseInput("");

  const getCommentData = async (id) => {
    setCommentLoading(true);
    setNoData(false);
    let response = await getCommentsListMinistry(token, id);
    if (response.comments) {
      setCommentLoading(false);
      setCommentPosted(false);
    }
    if (response.comments.length === 0) {
      setNoData(true);
    }
    setCommentList(response.comments);
  };
  const postData = async (e) => {
    e.preventDefault();
    let formData = {
      comment_id: information_id,
      message: text,
    };
    await postCommentMinistry(formData, token);
    setCommentPosted(true);
    resetText();
  };
  function openModal(id) {
    setIsOpen(true);
  }

  function afterOpenModal(id) {
    setIsOpen(true);
    getCommentData(id);
  }

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
  }, [loading, modalState, commentPosted]);
  useEffect(() => {
    getCommentData(information_id);
  }, [commentPosted]);
  useEffect(() => {
    scrollToBottom();
  }, [commentList]);
  return (
    <div>
      <button className="" onClick={() => openModal(information_id)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
          />
        </svg>
      </button>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={() => afterOpenModal(information_id)}
        onRequestClose={() => closeModal()}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className=" text-base flex justify-between pl-3 py-4 border-b border-b-4 border-[#2571bb] bg-[#f6f9fe] font-medium capitalize text-[#2571bb]">
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

        <div>
          <div className="relative h-[45vh] w-[45vw] container overflow-y-scroll mx-auto">
            {commentLoading && (
              <div className="w-full h-full flex justify-center items-center">
                <svg
                  role="status"
                  className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  ></path>
                </svg>
              </div>
            )}
            {noData && <div className="p-4">No Comments Found...</div>}
            <div className="grid grid-flow-row gap-4 mb-5">
              <div className="divide-y">
                {commentList &&
                  commentList.map((item) => (
                    <div className=" w-15 px-4 mt-5">
                      {!commentList && "Empty"}
                      {item.commenter.type === "local_government" ? (
                        <div className="flex flex-row items-center">
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                            {item.commenter.first_name.slice(0, 1)}
                          </div>

                          <div className="py-2 px-4">
                            <p className="text-lg ml-1 mb-1 font-normal text-gray-800 dark:text-white ">
                              {item.commenter.first_name}
                            </p>
                            <div className="relative text-sm bg-white py-2 px-4 max-w-[40vw] shadow rounded-xl">
                              {item.message}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-5 flex items-center justify-start flex-row-reverse">
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                            {item.commenter.first_name.slice(0, 1)}
                          </div>
                          <div className="py-2 px-4">
                            <div className="relative text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                              <div>{item.message}</div>
                            </div>
                          </div>

                          <div ref={messagesEndRef} />
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        {status !== "processing" && (
          <div className="border-b border-t-4 border-[#2571bb] bottom-0 flex mx-auto items-center justify-center w-full">
            <form onSubmit={postData} className="w-full bg-white px-4 pt-2">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-full px-3 mb-2 mt-2">
                  <textarea
                    className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                    name="body"
                    placeholder="Type Your Comment"
                    required
                    {...bindText}
                  />
                </div>
                <div className="w-full md:w-full flex items-start md:w-full px-3">
                  <div className="flex items-start w-2/2 text-gray-700 px-2 mr-auto">
                    <input
                      type="submit"
                      className="inline-flex relative block text-sm font-semibold bg-[#2572bc] text-white py-3 px-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 hover:bg-[#166bbc] rounded shadow"
                      defaultValue="Post Comment"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
      </Modal>
    </div>
  );
}
