import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL
const API_KEY = process.env.EXPO_PUBLIC_API_KEY

const getExhangeRates = async () => {
  const { data } = await axios.get(API_URL, {
    headers: {
      apikey: API_KEY,
    },
  });
  return data;
};

export default { getExhangeRates };
