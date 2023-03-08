import { toast } from "react-toastify";

export const initialState = {
  language: ["nep"],
  size: 2,
  loading: false,
  isAuthenticated: false,
  user: [],
  role: "",
  lgIds: "",
  recall: false,
  modalState: false,
  localId: "",
  document_path: "",
  recallOpt: {},
  storage_url: "https://sikaah.com/public/app_storage/",
  updateLoading: false,
};

if (localStorage.getItem("userData")) {
  initialState.isAuthenticated = true;
}

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_LOGIN_STATE":
      return {
        ...state,
        isAuthenticated: action.item,
      };
    case "GET_LANGUAGE":
      return {
        ...state,
        language: [...state.language, action.item],
      };
    case "SET_SIZE":
      return {
        ...state,
        size: parseInt(action.item),
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.item,
      };
    case "SET_UPDATE_LOADING":
      return {
        ...state,
        updateLoading: action.item,
      };
    case "SET_RECALL":
      return {
        ...state,
        recall: action.item,
      };
    case "SET_RECALL_OPT":
      return {
        ...state,
        recallOpt: action.item,
      };
    case "SET_MODAL":
      return {
        ...state,
        modalState: action.item,
      };
    case "CLEAR_LGID":
      state.lgIds.splice(state.lgIds, state.lgIds.length);
      return {
        ...state,
        lgIds: [],
      };
    case "SET_LGID":
      return {
        ...state,
        lgIds: action.item,
      };
    case "SET_LG_ID":
      return {
        ...state,
        localId: action.item,
      };
    default:
      return state;
  }
};
export default reducer;
