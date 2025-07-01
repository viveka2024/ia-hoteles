export default function handler(req, res) {
  if (req.method === 'GET') {
    // Aquí pones tu lógica real para hoteles, por ahora una prueba:
    res.status(200).json({
      mensaje: 'Lista de hoteles cargada correctamente',
      hoteles: [
        { id: 1, nombre: 'Hotel Sol' },
        { id: 2, nombre: 'Hotel Luna' }
      ]
    });
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
