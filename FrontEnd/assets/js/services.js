const URL = "http://localhost";
const PORT = "5678";
const ENDPOINT = {
  works: "/api/works",
  login: "/api/users/login",
};

export const getWorks = async () => {
  const response = await fetch(`${URL}:${PORT}${ENDPOINT.works}`, {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return await response.json();
};

export const getLogin = async (email, password) => {
  const response = await fetch(`${URL}:${PORT}${ENDPOINT.login}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ email, password }),
  });

  return await response;
};
