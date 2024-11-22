import express from 'express'
import fs from 'node:fs'
import process from 'node:process'
import { InsertUser } from './DB_Coneccion.js'

const app = express()
const clickLogFile = 'clicks.json'

app.use('/', express.static('src/page'))

app.get('/', (req, res) => {
  const userId = req.query.id
  const clickData = {
    userId: userId,
    timestamp: new Date().toISOString(),
    ipAddress: req.ip
  }
  console.log(req.ip)

  const stats = fs.statSync(clickLogFile)
  let clicks
  if (stats.size === 0) {
    clicks = []
    clicks.push(clickData)
  } else {
    const fileContent = fs.readFileSync(clickLogFile)
    clicks = JSON.parse(fileContent)
    clicks.push(clickData)
  }

  fs.writeFile(clickLogFile, JSON.stringify(clicks), (err) => {
    if (err) console.error('Error guardando clic:', err)
  })

  // res.sendFile(
  //   'C:\\Frederic\\WhatsAppProyect\\Desarrollo\\phisihing_test\\src\\page\\index.html'
  // )
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Servidor escuchando en http://localhost:7000')
})
