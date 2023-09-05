export const getWorks = async () => {
  const response = await fetch("http://127.0.0.1:5678/api/works", {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return await response.json();
};

export const getLogin = async (email, password) => {
  const response = await fetch("http://127.0.0.1:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ email, password }),
  });

  return await response;
};
