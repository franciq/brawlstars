import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.static('public')); // frontend w folderze public

const PORT = process.env.PORT || 10000;
const API_TOKEN = process.env.BRAWL_TOKEN; // Twój token z Brawl Stars

// Endpoint do pobierania danych graczy
app.get('/players', async (req, res) => {
  // Lista Twoich wybranych tagów graczy
  const tags = ["#2JU909U2Q", "#XYZ789"]; // tutaj wpisz swoje tagi graczy
  try {
    const results = await Promise.all(tags.map(async (tag) => {
      const response = await fetch(`https://api.brawlstars.com/v1/players/${encodeURIComponent(tag)}`, {
        headers: { 'Authorization': `Bearer ${API_TOKEN}` }
      });
      const data = await response.json();
      return data;
    }));

    // Sortowanie od najwięcej pucharów
    results.sort((a, b) => b.trophies - a.trophies);

    res.json(results);
  } catch (e) {
    res.status(500).json({ error: 'Błąd pobierania danych' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
