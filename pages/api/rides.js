// pages/api/rides.js
import db from '../../utils/db'


export default async function handler(req, res) {
  if (req.method === 'GET') {
    // List available rides
    try {
      const [rows] = await db.query('SELECT * FROM rides');
      res.status(200).json(rows);
    } catch (error) {
      console.error('Error fetching rides:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    // Create a new ride
    try {
      const { route, departureTime, availableSeats, fare, source, destination } = req.body;
      const [result] = await db.query(
        'INSERT INTO rides (route, departureTime, availableSeats, fare, source, destination) VALUES (?, ?, ?, ?, ?, ?)',
        [route, departureTime, availableSeats, fare, source, destination]
      );
      res.status(201).json({ id: result.insertId, route, departureTime, availableSeats, fare, source, destination });
    } catch (error) {
      console.error('Error creating ride:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
