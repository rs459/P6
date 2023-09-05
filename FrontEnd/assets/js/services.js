export const getWorks = async () => {
  const Works = await fetch("http://127.0.0.1:5678/api/works");
  const result = await Works.json();
  return result;
};
