import axios from "axios";

const api = axios.create({
  baseURL: "https://evening-caverns-88788.herokuapp.com",
});

export async function getMatches() {
  try {
    const { data } = await api.get("/");
    return data;
  } catch (error) {
    return error;
  }
}
