const URL = "http://localhost";
const PORT = "5678";
const ENDPOINT = {
  works: "/api/works",
  login: "/api/users/login",
  categories: "/api/categories",
};

export const getWorks = async () => {
  try {
    const response = await fetch(`${URL}:${PORT}${ENDPOINT.works}`, {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    });
    return await response.json();
  } catch (error) {
    console.log(`getWorks Error : `, error);
  }
};

export const getCategories = async () => {
  try {
    const response = await fetch(`${URL}:${PORT}${ENDPOINT.categories}`, {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    });
    return await response.json();
  } catch (error) {
    console.log(`Categories Error : `, error);
  }
};

export const getLogin = async (email, password) => {
  try {
    const response = await fetch(`${URL}:${PORT}${ENDPOINT.login}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ email, password }),
    });
    return response;
  } catch (error) {
    console.log("getLogin :>> ", error);
  }
};

export const deleteWork = async (id) => {
  try {
    const { token } = JSON.parse(localStorage.getItem("auth"));

    if (!token) {
      return false;
    }

    const response = await fetch(`${URL}:${PORT}${ENDPOINT.works}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;chaset=utf-8",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.log("deleteWork : ", error);
  }
};

export const uploadWork = async (work) => {
  try {
    const { token } = JSON.parse(localStorage.getItem("auth"));

    if (!token) {
      return false;
    }

    const response = await fetch(`${URL}:${PORT}${ENDPOINT.works}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: work,
    });

    return response;
  } catch (error) {
    console.log("uploadWork : ", error);
  }
};
