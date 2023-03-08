import { data } from "autoprefixer";
import axios from "axios";
import { toast } from "react-toastify";

// const baseUrl = "http://plgportal.lumbini.gov.np/api/api/";
const baseUrl = "http://localhost/lgportal/api/";

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${
    localStorage.getItem("token") &&
    localStorage.getItem("token").replace(/['"]+/g, "")
  }`,
};

// PUBLIC APIs
export const increseViewArticle = async (id) => {
  try {
    const { data } = await axios.post(baseUrl + `articleincreament-view/${id}`);
    return data;
  } catch (err) {
    const error = "error";
    return error;
  }
};
export const increseViewArticleSearch = async (id) => {
  try {
    const { data } = await axios.post(
      baseUrl + `articleincerament-search/${id}`
    );
    return data;
  } catch (err) {
    const error = "error";
    return error;
  }
};
export const textSearch = async (text) => {
  try {
    const { data } = await axios.get(baseUrl + `searchbytext${text}`);
    return data;
  } catch (err) {
    return err;
  }
};
export const getPdf = async (url) => {
  try {
    const { data } = await axios.get(url, { responseType: "blob" });
    return data;
  } catch (err) {
    return err;
  }
};
export const searchCard = async (text) => {
  try {
    const { data } = await axios.get(baseUrl + `card_data`);
    return data;
  } catch (err) {
    return err;
  }
};
export const singleArticle = async (id) => {
  try {
    const { data } = await axios.get(
      baseUrl + `getsinglearticle?article_id=${id}`
    );
    return data;
  } catch (err) {
    return err;
  }
};
export const singleDocument = async (id) => {
  try {
    const { data } = await axios.get(
      baseUrl + `singledocument?document_id=${id}`
    );
    return data;
  } catch (err) {
    return err;
  }
};
export const getMapData = async (query) => {
  try {
    const { data } = await axios.get(baseUrl + `getmapdata${query}`);
    return data;
  } catch (err) {
    return err;
  }
};
export const getType = async (endPoint) => {
  try {
    const { data } = await axios.get(baseUrl + `typelist?type=${endPoint}`);
    return data;
  } catch (err) {
    return err;
  }
};

export const getMinistry = async () => {
  try {
    const { data } = await axios.get(baseUrl + "listofministries");
    return data;
  } catch (err) {
    return err;
  }
};
export const getMinistryOffice = async (id) => {
  try {
    const { data } = await axios.get(
      baseUrl + `ministryoffice?ministry_id=${id}`
    );
    return data;
  } catch (err) {
    return err;
  }
};

export const getDistrict = async () => {
  try {
    const { data } = await axios.get(baseUrl + "getdistrictlist");
    return data;
  } catch (err) {
    return err;
  }
};
export const getArticle = async () => {
  try {
    const { data } = await axios.get(baseUrl + `getallarticle`);
    console.log(data.data);
    return data.data;
  } catch (err) {
    return err;
  }
};
export const getLgList = async () => {
  try {
    const { data } = await axios.get(baseUrl + `getlglist`);
    console.log(data.data);
    return data.data;
  } catch (err) {
    return err;
  }
};
export const getLgDetails = async (lgId) => {
  try {
    const { data } = await axios.get(baseUrl + `lgdetails/${lgId}`);
    console.log(data.data);
    return data.data;
  } catch (err) {
    return err;
  }
};
export const getLgByDistrict = async (id) => {
  try {
    const { data } = await axios.get(baseUrl + `getlgbydistrict/${id}`);
    return data.data;
  } catch (err) {
    return err;
  }
};

export const getSpecificLgData = async (id) => {
  try {
    const { data } = await axios.get(baseUrl + `getspecificlgdata/${id}`);
    return data.data;
  } catch (err) {
    return err;
  }
};

export const getDesiginationStaff = async (lgId) => {
  try {
    const { data } = await axios.get(baseUrl + `designationliststaff/${lgId}`);
    console.log("object", data);
    return data.data;
  } catch (err) {
    return err;
  }
};

export const exportSearchResults = async (params) => {
  try {
    const { data } = await axios.get(baseUrl + `exportexcel/${params}`);
    console.log("object", data);
    return data.data;
  } catch (err) {
    return err;
  }
};

export const getServiceTypeList = async (lgId) => {
  try {
    const { data } = await axios.get(baseUrl + `getservicetypelist/${lgId}`);
    console.log("object", data);
    return data.data;
  } catch (err) {
    return err;
  }
};
export const getContactList = async (lgId) => {
  try {
    const { data } = await axios.get(baseUrl + `contacttitlelist/${lgId}`);
    // console.log("object", data.data.split("<"));
    return data.data;
  } catch (err) {
    return err;
  }
};
export const getStaffData = async (lgId) => {
  try {
    const { data } = await axios.get(baseUrl + `getstaffdata/${lgId}`);
    // console.log("object", data.data.split("<"));
    return data.data;
  } catch (err) {
    return err;
  }
};
export const getElectedOfficialData = async (lgId) => {
  try {
    const { data } = await axios.get(baseUrl + `getelectedofficialdata/493`);
    return data;
  } catch (err) {
    return err;
  }
};

export const getLgRelatedDataPagination = async (
  type,
  typeList,
  disId,
  lgId,
  page_number
) => {
  console.log(disId, lgId);
  let url;
  if (typeList !== undefined) {
    url =
      baseUrl +
      `getlgrelateddata?search_by=` +
      type +
      "&type=" +
      typeList +
      "&pagination_number=" +
      page_number;
  } else {
    if (disId !== undefined) {
      url =
        baseUrl +
        `getlgrelateddata?search_by=` +
        type +
        "&district_id=" +
        disId +
        "&pagination_number=" +
        page_number;
    } else if (lgId !== undefined && disId !== undefined) {
      url =
        baseUrl +
        `getlgrelateddata?search_by=` +
        type +
        "&lg_id=" +
        lgId +
        "&pagination_number=" +
        page_number;
    } else {
      url =
        baseUrl +
        `getlgrelateddata?search_by=` +
        type +
        "&pagination_number=" +
        page_number;
    }
  }
  try {
    const { data } = await axios.get(url);

    return data.data;
  } catch (err) {
    return err;
  }
};
export const getLgRelatedData = async (fullUrl, catId, disId, lgId) => {
  let url;
  if (fullUrl) {
    url = catId;
  } else {
    if (disId !== undefined && lgId === undefined) {
      url =
        baseUrl +
        `getlgrelateddata?search_by=` +
        catId +
        "&district_id=" +
        disId;
    } else if (lgId !== undefined && disId !== undefined) {
      url =
        baseUrl +
        `getlgrelateddata?search_by=` +
        catId +
        "&district_id=" +
        disId +
        "&lg_id=" +
        lgId;
    } else {
      url = baseUrl + `getlgrelateddata?search_by=` + catId;
    }
  }
  try {
    const { data } = await axios.get(url);

    return data.data;
  } catch (err) {
    return err;
  }
};
export const getLgRelatedDataType = async (search, type) => {
  let url;
  url = baseUrl + `getlgrelateddata?search_by=${search}&type=${type}`;
  try {
    const { data } = await axios.get(url);

    return data.data;
  } catch (err) {
    return err;
  }
};
export const getLgRelatedDataDistrict = async (search, type, district) => {
  let url;
  if (type === undefined) {
    url =
      baseUrl + `getlgrelateddata?search_by=${search}&district_id=${district}`;
  } else {
    url =
      baseUrl +
      `getlgrelateddata?search_by=${search}&district_id=${district}&type=${type}`;
  }

  try {
    const { data } = await axios.get(url);

    return data.data;
  } catch (err) {
    return err;
  }
};
export const getLgRelatedDataLg = async (search, type, district, lg) => {
  let url;
  if (type === undefined) {
    url =
      baseUrl +
      `getlgrelateddata?search_by=${search}&district_id=${district}&lg_id=${lg}`;
  } else {
    url =
      baseUrl +
      `getlgrelateddata?search_by=${search}&district_id=${district}&type=${type}&lg_id=${lg}`;
  }
  try {
    const { data } = await axios.get(url);

    return data.data;
  } catch (err) {
    return err;
  }
};

// PRIVATE APIs

export const getInfoCollectionAdmin = async (token, fullUrl) => {
  try {
    let url;
    if (fullUrl === false) {
      url = baseUrl + `ministry-admin/information/list`;
    } else {
      url = fullUrl;
    }
    const { data } =
      localStorage.getItem("token") &&
      (await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }));
    return data;
  } catch (err) {
    if (err.response.status === 401) {
      toast.warning(err.response.data.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      localStorage.clear();
      window.location.reload();
    }
    // if (err) {
    //   localStorage.clear();
    //   window.location.reload();
    //   toast.warning("You session expired please login again.", {
    //     position: "top-center",
    //     autoClose: 1000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    // }
    return err;
  }
};
export const getInfoCollection = async (token, fullUrl) => {
  try {
    let url;
    if (fullUrl === false) {
      url = baseUrl + `ministry/information/list`;
    } else {
      url = fullUrl;
    }
    const { data } =
      localStorage.getItem("token") &&
      (await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }));
    return data;
  } catch (err) {
    if (err.response.status === 401) {
      toast.warning(err.response.data.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      localStorage.clear();
      window.location.reload();
    }
    // if (err) {
    //   localStorage.clear();
    //   window.location.reload();
    //   toast.warning("You session expired please login again.", {
    //     position: "top-center",
    //     autoClose: 1000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    // }
    return err;
  }
};
export const getMinistryCard = async (token) => {
  try {
    const { data } =
      localStorage.getItem("token") &&
      (await axios.get(baseUrl + `ministry/total-information`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }));
    return data;
  } catch (err) {
    if (err.response.status === 401) {
      toast.warning(err.response.data.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      localStorage.clear();
      window.location.reload();
    }
    // if (err) {
    //   localStorage.clear();
    //   window.location.reload();
    //   toast.warning("You session expired please login again.", {
    //     position: "top-center",
    //     autoClose: 1000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    // }
    return err;
  }
};
export const getLgCard = async (token) => {
  try {
    const { data } =
      localStorage.getItem("token") &&
      (await axios.get(baseUrl + `local-gov/total-information`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }));
    return data;
  } catch (err) {
    if (err.response.status === 401) {
      toast.warning(err.response.data.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      localStorage.clear();
      window.location.reload();
    }
    // if (err) {
    //   localStorage.clear();
    //   window.location.reload();
    //   toast.warning("You session expired please login again.", {
    //     position: "top-center",
    //     autoClose: 1000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    // }
    return err;
  }
};
export const getNotificationLg = async (token) => {
  try {
    const { data } =
      localStorage.getItem("token") &&
      (await axios.get(baseUrl + `local-gov/notifications`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }));
    return data;
  } catch (err) {
    if (err.response.status === 401) {
      toast.warning(err.response.data.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      localStorage.clear();
      window.location.reload();
    }
    // if (err) {
    //   localStorage.clear();
    //   window.location.reload();
    //   toast.warning("You session expired please login again.", {
    //     position: "top-center",
    //     autoClose: 1000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    // }
    return err;
  }
};
export const getNotificationMin = async (token) => {
  try {
    const { data } =
      localStorage.getItem("token") &&
      (await axios.get(baseUrl + `ministry/notifications`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }));
    return data;
  } catch (err) {
    if (err.response.status === 401) {
      toast.warning(err.response.data.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      localStorage.clear();
      window.location.reload();
    }
    // if (err) {
    //   localStorage.clear();
    //   window.location.reload();
    //   toast.warning("You session expired please login again.", {
    //     position: "top-center",
    //     autoClose: 1000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    // }
    return err;
  }
};
export const getInfoCollectionOffice = async (token, fullUrl) => {
  try {
    let url;
    if (fullUrl === false) {
      url = baseUrl + `ministry-office/information/list`;
    } else {
      url = fullUrl;
    }
    const { data } =
      localStorage.getItem("token") &&
      (await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }));
    return data;
  } catch (err) {
    if (err.response.status === 401) {
      toast.warning(err.response.data.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      localStorage.clear();
      window.location.reload();
    }
    // if (err) {
    //   localStorage.clear();
    //   window.location.reload();
    //   toast.warning("You session expired please login again.", {
    //     position: "top-center",
    //     autoClose: 1000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    // }
    return err;
  }
};
export const getAssignedList = async (token, id) => {
  try {
    const { data } =
      localStorage.getItem("token") &&
      (await axios.get(
        baseUrl + `ministry-admin/assigned-user/list?information_id=${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      ));
    return data;
  } catch (err) {
    if (err.response.status === 401) {
      toast.warning(err.response.data.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      localStorage.clear();
      window.location.reload();
    }
    // if (err) {
    //   localStorage.clear();
    //   window.location.reload();
    //   toast.warning("You session expired please login again.", {
    //     position: "top-center",
    //     autoClose: 1000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    // }
    return err;
  }
};

export const getCommentsList = async (token, id) => {
  try {
    const { data } =
      localStorage.getItem("token") &&
      (await axios.get(
        baseUrl + `local-gov/information/comment-list?information_id=${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      ));
    return data.data;
  } catch (err) {
    if (err.response.status === 401) {
      toast.warning(err.response.data.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      localStorage.clear();
      window.location.reload();
    }
    // if (err) {
    //   localStorage.clear();
    //   window.location.reload();
    //   toast.warning("You session expired please login again.", {
    //     position: "top-center",
    //     autoClose: 1000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    // }
    return err;
  }
};
export const getInformationDetailAdmin = async (token, id) => {
  try {
    const { data } =
      localStorage.getItem("token") &&
      (await axios.get(
        baseUrl + `ministry-admin/information/detail?information_id=${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      ));
    return data.data;
  } catch (err) {
    if (err.response.status === 401) {
      toast.warning(err.response.data.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      localStorage.clear();
      window.location.reload();
    }
    // if (err) {
    //   localStorage.clear();
    //   window.location.reload();
    //   toast.warning("You session expired please login again.", {
    //     position: "top-center",
    //     autoClose: 1000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    // }
    return err;
  }
};
export const getInformationDetailMinistry = async (token, id) => {
  try {
    const { data } =
      localStorage.getItem("token") &&
      (await axios.get(
        baseUrl + `ministry/information/detail?information_id=${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      ));
    return data.data;
  } catch (err) {
    if (err.response.status === 401) {
      toast.warning(err.response.data.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      localStorage.clear();
      window.location.reload();
    }
    // if (err) {
    //   localStorage.clear();
    //   window.location.reload();
    //   toast.warning("You session expired please login again.", {
    //     position: "top-center",
    //     autoClose: 1000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    // }
    return err;
  }
};
export const getInformationCompleteDetail = async (token, id) => {
  try {
    const { data } =
      localStorage.getItem("token") &&
      (await axios.get(
        baseUrl +
          `ministry/information-collection/detail?info_receiver_id=${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      ));
    return data.data;
  } catch (err) {
    if (err.response.status === 401) {
      toast.warning(err.response.data.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      localStorage.clear();
      window.location.reload();
    }
    // if (err) {
    //   localStorage.clear();
    //   window.location.reload();
    //   toast.warning("You session expired please login again.", {
    //     position: "top-center",
    //     autoClose: 1000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    // }
    return err;
  }
};
export const getInformationDetailLg = async (token, id) => {
  try {
    const { data } =
      localStorage.getItem("token") &&
      (await axios.get(
        baseUrl + `local-gov/information/detail?information_id=${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      ));
    return data.data;
  } catch (err) {
    if (err.response.status === 401) {
      toast.warning(err.response.data.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      localStorage.clear();
      window.location.reload();
    }
    // if (err) {
    //   localStorage.clear();
    //   window.location.reload();
    //   toast.warning("You session expired please login again.", {
    //     position: "top-center",
    //     autoClose: 1000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    // }
    return err;
  }
};
export const getInformationDetailOffice = async (token, id) => {
  try {
    const { data } =
      localStorage.getItem("token") &&
      (await axios.get(
        baseUrl + `ministry-office/information/detail?information_id=${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      ));
    return data.data;
  } catch (err) {
    if (err.response.status === 401) {
      toast.warning(err.response.data.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      localStorage.clear();
      window.location.reload();
    }
    // if (err) {
    //   localStorage.clear();
    //   window.location.reload();
    //   toast.warning("You session expired please login again.", {
    //     position: "top-center",
    //     autoClose: 1000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    // }
    return err;
  }
};
export const getCommentsUserListMinistry = async (token, id) => {
  try {
    const { data } =
      localStorage.getItem("token") &&
      (await axios.get(
        baseUrl + `ministry/information/comment-user-list?comment_id=${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      ));
    return data.data;
  } catch (err) {
    if (err.response.status === 401) {
      toast.warning(err.response.data.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      localStorage.clear();
      window.location.reload();
    }
    // if (err) {
    //   localStorage.clear();
    //   window.location.reload();
    //   toast.warning("You session expired please login again.", {
    //     position: "top-center",
    //     autoClose: 1000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    // }
    return err;
  }
};
export const getCommentsListMinistry = async (token, id) => {
  try {
    const { data } =
      localStorage.getItem("token") &&
      (await axios.get(
        baseUrl + `ministry/information/comment-list?comment_id=${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      ));
    return data.data;
  } catch (err) {
    if (err.response.status === 401) {
      toast.warning(err.response.data.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      localStorage.clear();
      window.location.reload();
    }
    // if (err) {
    //   localStorage.clear();
    //   window.location.reload();
    //   toast.warning("You session expired please login again.", {
    //     position: "top-center",
    //     autoClose: 1000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    // }
    return err;
  }
};

export const getTemplateList = async (token) => {
  try {
    const { data } =
      localStorage.getItem("token") &&
      (await axios.get(baseUrl + `templates/all`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }));
    return data;
  } catch (err) {
    if (err.response.status === 401) {
      toast.warning(err.response.data.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      localStorage.clear();
      window.location.reload();
    }
    // if (err) {
    //   localStorage.clear();
    //   window.location.reload();
    //   toast.warning("You session expired please login again.", {
    //     position: "top-center",
    //     autoClose: 1000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    // }
    return err;
  }
};
export const getLgInfoCollection = async (token, fullUrl) => {
  try {
    let url;
    if (fullUrl === false) {
      url = baseUrl + `local-gov/information/list`;
    } else {
      url = fullUrl;
    }
    const { data } =
      localStorage.getItem("token") &&
      (await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }));
    return data;
  } catch (err) {
    if (err.response.status === 401) {
      toast.warning(err.response.data.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      localStorage.clear();
      window.location.reload();
    }
    return err;
  }
};
export const getUserListLg = async (token) => {
  try {
    const { data } =
      localStorage.getItem("token") &&
      (await axios.get(baseUrl + `local-gov/user/list`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }));
    return data;
  } catch (err) {
    if (err.response.status === 401) {
      toast.warning(err.response.data.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      localStorage.clear();
      window.location.reload();
    }
    return "error";
  }
};

export const getOfficeList = async (token) => {
  try {
    const { data } =
      localStorage.getItem("token") &&
      (await axios.get(baseUrl + `ministry/ministry-office/list`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }));
    return data;
  } catch (err) {
    if (err.response.status === 401) {
      toast.warning(err.response.data.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      localStorage.clear();
      window.location.reload();
    }
    return "error";
  }
};
export const getOfficeUserList = async (token) => {
  try {
    const { data } =
      localStorage.getItem("token") &&
      (await axios.get(baseUrl + `ministry-office/user/list`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }));
    return data;
  } catch (err) {
    if (err.response.status === 401) {
      toast.warning(err.response.data.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      localStorage.clear();
      window.location.reload();
    }
    return "error";
  }
};

export const getUserListMinistry = async (token) => {
  try {
    const { data } =
      localStorage.getItem("token") &&
      (await axios.get(baseUrl + `ministry/user/list`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }));
    return data;
  } catch (err) {
    if (err.response.status === 401) {
      toast.warning(err.response.data.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      localStorage.clear();
      window.location.reload();
    }
    return "error";
  }
};

export const getAssessmentData = async (information_id, token) => {
  try {
    const { data } =
      localStorage.getItem("token") &&
      (await axios.get(
        baseUrl +
          `local-gov/information-collection/detail?info_receiver_id=${information_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      ));
    return data;
  } catch (err) {
    if (err.response.status === 401) {
      toast.warning(err.response.data.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      localStorage.clear();
      window.location.reload();
    }
    return "error";
  }
};
export const getAssessmentDataOffice = async (information_id, token) => {
  try {
    const { data } =
      localStorage.getItem("token") &&
      (await axios.get(
        baseUrl +
          `ministry-office/information-collection/detail?info_receiver_id=${information_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      ));
    return data;
  } catch (err) {
    if (err.response.status === 401) {
      toast.warning(err.response.data.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      localStorage.clear();
      window.location.reload();
    }
    return "error";
  }
};
export const getAssessmentDataMinistry = async (information_id, token) => {
  try {
    const { data } =
      localStorage.getItem("token") &&
      (await axios.get(
        baseUrl +
          `ministry/information-collection/detail?info_receiver_id=${information_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      ));
    return data;
  } catch (err) {
    if (err.response.status === 401) {
      toast.warning(err.response.data.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      localStorage.clear();
      window.location.reload();
    }
    return "error";
  }
};
export const createUserOffice = async (formData) => {
  try {
    const { data } = await axios.post(
      baseUrl + `ministry-office/user/create`,
      formData,
      {
        headers: headers,
      }
    );
    toast.success(data.message, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return data;
  } catch (err) {
    toast.error("Something went wrong!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};
export const createUserLg = async (formData) => {
  try {
    const { data } = await axios.post(
      baseUrl + `local-gov/user/create`,
      formData,
      {
        headers: headers,
      }
    );
    toast.success(data.message, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return data;
  } catch (err) {
    toast.error("Something went wrong!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};
export const createUserMinistry = async (formData) => {
  try {
    const { data } = await axios.post(
      baseUrl + `ministry/user/create`,
      formData,
      {
        headers: headers,
      }
    );
    toast.success(data.message, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return data;
  } catch (err) {
    toast.error("Something went wrong!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};
export const createOffice = async (formData) => {
  try {
    const { data } = await axios.post(
      baseUrl + `ministry/ministry-office/create`,
      formData,
      {
        headers: headers,
      }
    );
    toast.success(data.message, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return data;
  } catch (err) {
    toast.error("Something went wrong!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};
export const updateOffice = async (formData) => {
  try {
    const { data } = await axios.post(
      baseUrl + `ministry/ministry-office/update`,
      formData,
      {
        headers: headers,
      }
    );
    toast.success(data.message, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return data;
  } catch (err) {
    toast.error("Something went wrong!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};
export const adminLogin = async (adminData) => {
  try {
    const { data } = await axios.post(baseUrl + `login`, adminData);
    toast.success(data.message, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    window.location.reload();
    return data;
  } catch (err) {
    if (err.response.status === 422) {
      toast.warning(err.response.data.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (err.response.status === 401) {
      toast.warning(err.response.data.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error("Something went wrong!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    const error = "error";
    return error;
  }
};
export const uploadDocument = async (formData) => {
  try {
    const { data } = await axios.post(
      baseUrl + `local-gov/document/create`,
      formData,
      {
        headers: headers,
      }
    );
    toast.success(data.message, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return data;
  } catch (err) {
    const error = "error";
    toast.error("Something went wrong!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return error;
  }
};
export const uploadDocumentOffice = async (formData) => {
  try {
    const { data } = await axios.post(
      baseUrl + `ministry-office/document/create`,
      formData,
      {
        headers: headers,
      }
    );
    toast.success(data.message, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return data;
  } catch (err) {
    const error = "error";
    toast.error("Something went wrong!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return error;
  }
};
export const uploadDocumentMinistry = async (formData) => {
  try {
    const { data } = await axios.post(
      baseUrl + `ministry/document/create`,
      formData,
      {
        headers: headers,
      }
    );
    toast.success(data.message, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return data;
  } catch (err) {
    const error = "error";
    toast.error("Something went wrong!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return error;
  }
};
export const postInfoCollection = async (formData) => {
  try {
    const { data } = await axios.post(
      baseUrl + `ministry/information/create`,
      formData,
      {
        headers: headers,
      }
    );
    toast.success(data.message, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    // window.location.reload();
    return data;
  } catch (err) {
    console.log(err.response.data);
    if (err.response.status === 422) {
      if (err.response.data.start_date) {
        toast.warning(JSON.stringify(err.response.data.start_date), {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      if (err.response.data.select_all) {
        toast.warning(JSON.stringify(err.response.data.select_all), {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      toast.error("Something went wrong!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    const error = "error";
    return error;
  }
};
export const updateInfoCollection = async (formData) => {
  try {
    const { data } = await axios.post(
      baseUrl + `ministry/information/update`,
      formData,
      {
        headers: headers,
      }
    );
    toast.success(data.message, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    // window.location.reload();
    return data;
  } catch (err) {
    console.log(err.response.data);
    if (err.response.status === 422) {
      if (err.response.data.start_date) {
        toast.warning(JSON.stringify(err.response.data.start_date), {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      if (err.response.data.select_all) {
        toast.warning(JSON.stringify(err.response.data.select_all), {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      toast.error("Something went wrong!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    const error = "error";
    return error;
  }
};

export const postCommentLg = async (formData, token) => {
  try {
    const { data } = await axios.post(
      baseUrl + `information/create-comment`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success(data.message, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return data;
  } catch (err) {
    const error = "error";
    toast.error("Something went wrong!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return error;
  }
};
export const postCommentMinistry = async (formData, token) => {
  try {
    const { data } = await axios.post(
      baseUrl + `ministry/information/create-comment`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success(data.message, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return data;
  } catch (err) {
    const error = "error";
    toast.error("Something went wrong!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return error;
  }
};
export const replyComment = async (formData, token) => {
  try {
    const { data } = await axios.post(
      baseUrl + `ministry/information/reply-comment`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success(data.message, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return data;
  } catch (err) {
    const error = "error";
    toast.error("Something went wrong!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return error;
  }
};

export const postAssessmentForm = async (formData, token) => {
  try {
    const { data } = await axios.post(
      baseUrl + `local-gov/question-answer/create`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success(data.message, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return data;
  } catch (err) {
    const error = "error";
    toast.error("Something went wrong!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return error;
  }
};

export const postAssessmentFormMinistry = async (formData, token) => {
  try {
    const { data } = await axios.post(
      baseUrl + `ministry/question-answer/create`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success(data.message, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return data;
  } catch (err) {
    const error = "error";
    toast.error("Something went wrong!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return error;
  }
};
export const postAssessmentFormOffice = async (formData, token) => {
  try {
    const { data } = await axios.post(
      baseUrl + `ministry-office/question-answer/create`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success(data.message, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return data;
  } catch (err) {
    const error = "error";
    toast.error("Something went wrong!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return error;
  }
};
export const approveInformationCollection = async (formData, token) => {
  try {
    const { data } = await axios.post(
      baseUrl + `information/complete`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success(data.message, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return data;
  } catch (err) {
    const error = "error";
    toast.error("Something went wrong!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return error;
  }
};
export const startCollectionInformation = async (formData, token) => {
  try {
    const { data } = await axios.post(
      baseUrl + `local-gov/information/start-processing`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success(data.message, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return data;
  } catch (err) {
    const error = "error";
    toast.error("Something went wrong!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return error;
  }
};
export const approveInformation = async (formData, token) => {
  try {
    const { data } = await axios.post(
      baseUrl + `local-gov/information/complete`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success(data.message, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return data;
  } catch (err) {
    const error = "error";
    toast.error("Something went wrong!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return error;
  }
};
