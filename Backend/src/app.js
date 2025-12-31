import express from 'express'

const app = express()

app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'CrypTechKing Backend' })
})

export default app
