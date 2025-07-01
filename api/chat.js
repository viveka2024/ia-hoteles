const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()
const { OpenAI } = require('openai')

const app = express()
const port = 3000

app.use(bodyParser.json())

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
const assistantId = 'asst_xyKBs3gRFxMDrqosbE9bDwM6'

app.post('/api/chat', async (req, res) => {
  const { message } = req.body

  try {
    // 1. Crear nuevo hilo
    const thread = await openai.beta.threads.create()

    // 2. Añadir el mensaje del usuario
    await openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: message
    })

    // 3. Lanzar ejecución con el Assistant
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistantId
    })

    // 4. Esperar respuesta final del Assistant
    let status = 'queued'
    while (status !== 'completed' && status !== 'failed') {
      await new Promise(r => setTimeout(r, 1000))
      const updatedRun = await openai.beta.threads.runs.retrieve(thread.id, run.id)
      status = updatedRun.status
    }

    // 5. Obtener el último mensaje de respuesta
    const messages = await openai.beta.threads.messages.list(thread.id)
    const lastMessage = messages.data.find(msg => msg.role === 'assistant')

    res.json({ reply: lastMessage.content[0].text.value })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
})

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`)
})
