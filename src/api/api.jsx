import axios from "axios";

export const configMaker = (method, url, params = null, body = {}) => {
    // const Tokens = Cookies.get("Token");
    // const accessTokens = Cookies.get("accessToken");
  
    return {
      method,
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_API_BASE_URL}/${url}`,
      headers: {
        "Content-Type": "application/json",
        // "Access-Token": accessTokens,
        // Authorization: `Bearer ${Tokens}`,
      },
      ...(params && { params }), // only adds if not null
      data: body,
    };
  };
  
  export const submitKitForm = async (data) => {
    const portalId = "67c17d743394a458c944eec2";
    const config = configMaker("post", "submitkitform-white-labels", {
      portalId,
    });
    config.data = data;
    const response = await axios.request(config);
    return response;
  };
  