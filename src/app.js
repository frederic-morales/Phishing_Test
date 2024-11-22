import express from 'express'
import fs from 'node:fs'
import process from 'node:process'
import { InsertUser } from './DB_Coneccion.js'

const app = express()
const clickLogFile = 'clicks.json'

app.get('', (req, res) => {
  const userId = req.query.id
  const clickData = {
    userId: userId,
    timestamp: new Date().toISOString(),
    ipAddress: req.ip
  }
  console.log(req.ip)
  // console.log(req.query.id)

  // console.log(req.connection.remoteAddress)
  InsertUser(req.ip)

  fs.readFile(clickLogFile, (err, data) => {
    const clicks = data ? JSON.parse(data) : []
    clicks.push(clickData)
    fs.writeFile(clickLogFile, JSON.stringify(clicks), (err) => {
      if (err) console.error('Error guardando clic:', err)
    })
  })

  res.send(
    '<h1>¡Has caído en una simulación de phishing!</h1><p>Aprende cómo evitar estos ataques...</p>'
  )
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Servidor escuchando en http://localhost:7000')
})
