import express from "express";
import pg from "pg";
import axios from "axios";
const app = express();
const port = 3000;

app.use(express.static("public"));


const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "hodling",
  password: "11713767",
  port: 5432,
});
db.connect();

async function fetchDataAndStore() {
  try {
    const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
    const data = response.data;
    const top10 = Object.values(data).slice(0, 10);


   
    for (let ticker of top10) {
      await db.query("INSERT INTO tickers (name, last, buy, sell, volume, base_unit) VALUES ($1, $2, $3, $4, $5, $6)", [
        ticker.name,
        ticker.last,
        ticker.buy,
        ticker.sell,
        ticker.volume,
        ticker.base_unit,
      ]);
    }
  } catch (error) {
    console.error('Error fetching data or storing in database', error);
  }
}
// Fetch data immediately on server start
fetchDataAndStore();


app.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM tickers');
    res.render('home.ejs', { data: result.rows });
  } catch (error) {
    res.status(500).send('Error retrieving data');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});