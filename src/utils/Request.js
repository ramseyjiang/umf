import { getLocal } from "./Storage.js";

export const get = async (url) => {
  try {
    const response = await fetch(url, {
      method: "get",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${getLocal("token")}`,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export const post = async (method = "post", url, data = null) => {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${getLocal("token")}`,
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
