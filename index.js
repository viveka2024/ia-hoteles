const express = require('express');
const app = express();
const hotelesRouter = require('./api/hoteles');

app.use('/api/hoteles', hotelesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
