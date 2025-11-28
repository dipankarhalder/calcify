export const validateDoctor = () => {
  const userToken = localStorage.getItem("authToken");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  if (!userToken && !userInfo) {
    window.location.href = "/login";
  }
};
