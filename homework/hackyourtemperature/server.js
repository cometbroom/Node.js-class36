import express from "express";

const app = express();

app.use("/weather", express.json());

app.get("/", (req, res) => {
  res.status(200).send("<p>Hello from backend to frontend!</p>");
});

app.post("/weather", (req, res) => {
  if (req.body?.cityName) {
    const cityName = req.body.cityName;
    res.status(200).send(cityName);
  } else {
    res.status(404).send("Could not find city in request");
  }
});

const PORT = 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
