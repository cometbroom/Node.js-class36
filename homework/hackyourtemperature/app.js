import express from "express";
import fetch from "node-fetch";
import { API_KEY } from "./sources/keys.js";

const API_URL = "https://api.openweathermap.org/data/2.5/";

//Start app
const app = express();

//Middleware to have requests as JSON
app.use("/weather", express.json());

//Default path
app.get("/", (req, res) => {
  res.type("html");
  res.status(200).send("<p>Hello from backend to frontend!</p>");
});

//Post city name in the body
app.post("/weather/:city", async (req, res) => {
  try {
    const cityName = req.params.city;
    const response = await fetch(
      API_URL + `weather?q=${cityName}&units=metric&appid=${API_KEY}`
    );
    const data = await response.json();
    res
      .status(response.status)
      .json({ weatherText: `${[cityName]} ${data.main.temp}` });
  } catch (error) {
    res.status(404).json({ weatherText: "City is not found!" });
  }
});

export default app;
