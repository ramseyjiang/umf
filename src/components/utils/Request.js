import { getLocal } from "./Storage.js";

export const request = async (method = "post", url, data = null) => {
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
