import { axiosMainInstance, axiosLogInstance } from "./baseConfig";

export async function _coreAuthFunc(url, payload) {
  try {
    const res = await axiosLogInstance.post(url, payload);
    return res.data;
  } catch (error) {
    return error.response;
  }
}

export async function _coreGetFunc(url) {
  const res = await axiosMainInstance.get(url);
  return res.data;
}

export async function _corePostFunc(url, payload) {
  const res = await axiosMainInstance.post(url, payload);
  return res.data;
}

export async function _corePostUpload(url, payload) {
  const res = await axiosMainInstance.post(url, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}
