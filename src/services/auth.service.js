// import customAxios from "./customAxios";

const login = (username, password) => {
  if (username === "test" && password === "test") {
    return {
      status: 201,
      access_token:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2Mjk1NDg1MjUsIm5iZiI6MTYyOTU0ODUyNSwianRpIjoiODdlY2NmZjYtZmViYy00YTY0LTgyOGUtNDE4ZjFkMGExMzU2IiwiZXhwIjoxNjI5NTQ5NDI1LCJpZGVudGl0eSI6InRlc3QiLCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MifQ.seVlNhZtzKZaa-unOh5N1_n-DQ2XjQxrHod01dKlHOE",
    };
  } else {
    return {
      status: 403,
    };
  }
  // return customAxios
  //   .post("/auth", {
  //     username,
  //     password,
  //   });
};

export default {
  login,
};
