export const getWorks = async () => {
  const response = await fetch("http://127.0.0.1:5678/api/works", {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return await response.json();
};
