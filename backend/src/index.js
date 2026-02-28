require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;
const JIKAN_API_BASE = process.env.JIKAN_API_BASE || 'https://api.jikan.moe/v4';

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/anime/top', async (req, res) => {
  try {
    const response = await axios.get(`${JIKAN_API_BASE}/top/anime`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch top anime' });
  }
});

app.get('/api/anime/search', async (req, res) => {
  try {
    const { q, page = 1, genre, type } = req.query;
    let url = `${JIKAN_API_BASE}/anime?page=${page}`;
    if (q) url += `&q=${encodeURIComponent(q)}`;
    if (genre) url += `&genres=${genre}`;
    if (type) url += `&type=${type}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch anime search results' });
  }
});

app.get('/api/anime/:id/characters', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${JIKAN_API_BASE}/anime/${id}/characters`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch characters' });
  }
});

app.get('/api/anime/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${JIKAN_API_BASE}/anime/${id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch anime details' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
