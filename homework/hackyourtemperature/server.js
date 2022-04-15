import express from "express";

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
app.post("/weather", (req, res) => {
  if (req.body?.cityName) {
    const cityName = req.body.cityName;
    res.status(200).json({ cityName });
  } else {
    res.status(400).send("Could not find city in request");
  }
});

const PORT = 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
