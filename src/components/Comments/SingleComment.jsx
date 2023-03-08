import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import { postCommentMinistry } from "../../api";
import UseInput from "../../utils/UseInput";
import { data } from "autoprefixer";
import { useStateValue } from "../../utils/StateProvider";
import { changeIndexToNepali } from "../../utils";

export default function SingleComment(props) {
  const [openReply, setOpenReply] = useState(false);
  const [{ loading, modalState }, dispatch] = useStateValue();
  const { value: text, bind: bindText, reset: resetText } = UseInput("");
  const token = localStorage.getItem("token").replace(/['"]+/g, "");
  let roleId = "";
  if (localStorage.getItem("userData")) {
    roleId = JSON.parse(localStorage.getItem("userData")).roles.map(
      (item) => item.pivot.role_id
    );
  }
  const postData = async (e) => {
    let formData = {
      comment_id: props.data.id,
      message: text,
    };
    let response = await postCommentMinistry(formData, token);
    if (response) {
      dispatch({
        type: "SET_RECALL",
        item: true,
      });
    }
    resetText();
  };
  const openReplyBox = () => {
    setOpenReply(!openReply);
  };
  return (
    <div className="p-4 flex w-full items-start justify-center">
      <div className="flex flex-row justify-center mt-4 mr-2 h-max">
        <img
          alt="avatar"
          className="rounded-full w-12 h-12 block m-auto"
          src={logo}
        />
      </div>
      <div className="w-full">
        <div className="bg-[#f2f2f2] rounded-lg p-3 flex flex-col justify-center items-start shadow-sm mb-1">
          <h3 className="text-gray-900 text-base font-semibold mb-2 block">
            {props.data.commenter.name}
            {/* <p className="font-normal ml-2">({props.data.commenter.email})</p> */}
          </h3>

          <p
            style={{ width: "90%" }}
            className="text-gray-900 text-sm text-center md:text-left "
          >
            {props.data.comment}
          </p>
        </div>
        <p class="px-3 py-1">
          <span className="mr-2 text-sm">
            {changeIndexToNepali(props.data.created_at.slice(0, 10))} मा पोस्ट
            गरिएको थियो
          </span>
          {roleId == 2 && (
            <a
              className="text-[#276fb9] text-sm hover:underline cursor-pointer"
              onClick={openReplyBox}
            >
              जवाफ दिनुहोस्
            </a>
          )}
        </p>
        {openReply && (
          <div>
            <textarea
              className="mt-4 bg-white rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
              placeholder="जवाफ दिनुहोस्"
              required=""
              {...bindText}
            ></textarea>
            <button
              type="submit"
              onClick={() => postData()}
              className="flex text-white bg-[#276fb9] hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              जवाफ दिनुहोस्
            </button>
          </div>
        )}
        {props.data.reply !== null && (
          <div className="py-4 flex w-full ">
            <div className="flex flex-row justify-center h-max mt-4 mr-2">
              <img
                alt="avatar"
                className="rounded-full w-12 h-12 block m-auto"
                src="/static/media/logo.a03edc64e94179985e6835ed020f1006.svg"
              />
            </div>
            <div className="w-full">
              <div className="bg-[#f2f2f2] rounded-lg p-3 flex flex-col justify-center items-start shadow-sm mb-1">
                <h3 className="text-gray-900 text-base font-semibold mb-2 block">
                  {props.creator.name}
                </h3>
                <p
                  className="text-gray-900 text-sm text-center md:text-left "
                  style={{ width: "90%" }}
                >
                  {props.data.reply}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
