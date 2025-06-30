const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')
require('dotenv').config()

const { OpenAI } = require('openai')

const app = express()
const port = 3000

app.use(bodyParser.json())

app.post('/api/chat', async (req, res) => {
  const { hotelId, message } = req.body

  try {
    const filePath = path.join(__dirname, `../hoteles/${hotelId}.json`)
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Hotel config no encontrada' })
    }

    const config = JSON.parse(fs.readFileSync(filePath))

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: config.system_prompt },
        { role: 'user', content: message }
      ]
    })

    res.json({ reply: completion.choices[0].message.content })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
})

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`)
})