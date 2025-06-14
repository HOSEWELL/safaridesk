interface User {
  email: string;
}

export const storeUserAuth = (user: User, token: string) => {
  localStorage.setItem("access_token", token);
  localStorage.setItem("user_email", user.email);
};

export const getUserAuth = () => {
  return {
    token: localStorage.getItem("access_token"),
    email: localStorage.getItem("user_email"),
  };
};

export const clearUserAuth = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user_email");
};
