const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'hotel_demo.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer hotel_demo.json:', err);
      return res.status(500).json({ error: 'Error al leer el archivo' });
    }

    try {
      const hoteles = JSON.parse(data);
      res.json(hoteles);
    } catch (parseError) {
      console.error('Error al parsear hotel_demo.json:', parseError);
      res.status(500).json({ error: 'Error al parsear el archivo' });
    }
  });
});

module.exports = router;

