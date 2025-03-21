const axios = require("axios");
const BASE_URL = process.env.BASE_URL;
const API = process.env.API;
async function fetchmoviedata(url) {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API}`,
    },
  };

  console.log(url);
  try {
    const response = await axios.get(url, options);
    if (response.status !== 200) {
      throw new Error(
        `Failed to fetch the data from TMB: ${response.statusText}`
      );
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching movie data:", error.message);
    throw error;
  }
}
module.exports = { fetchmoviedata };
