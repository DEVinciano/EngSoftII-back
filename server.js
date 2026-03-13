import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:5173", // Permite apenas o teu front-end
  }),
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/maps", (req, res) => {
  // Agora req.body já não será undefined
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: "O campo 'query' é obrigatório." });
  }

  const formattedQuery = query.replaceAll(" ", "+");

  axios
    .get(
      `https://nominatim.openstreetmap.org/search?q=${formattedQuery}&format=json`,
      {
        headers: {
          "User-Agent": "MeuProjetoApp/1.0",
        },
      },
    )
    .then((response) => res.json(response.data))
    .catch((error) => res.status(500).json({ error: error.message }));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
