export const request = async (path, option, hasJson = true) => {
  const baseUrl = document.querySelector("header").dataset.api;
  const response = await fetch(`${baseUrl}/${path}`, option);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  if (hasJson) {
    const data = await response.json();
    return data;
  }
  return response;
};
