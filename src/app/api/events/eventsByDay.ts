import express from 'express';
import { getEventsByDay } from 'app/db/queries';

const app = express();

app.get('/events-by-day', async (req, res) => {
  try {
    const eventsByDay = await getEventsByDay();
    res.json(eventsByDay); // Envía los datos como JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los eventos' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
