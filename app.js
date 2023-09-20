const express = require('express')
const movies = require('./movies.json')
const crypto = require('node:crypto')
const cors = require('cors')
const { validateMovie, validatePartialMovie } = require('./Schemas/movies')

const app = express()
app.use(express.json())
app.use(
  cors({
    origin: (origin, callback) => {
      const ACCEPTED_ORIGINS = [
        'http://localhost:8080',
        'http://localhost:1234'
      ]
      if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
        return callback(null, true)
      }
      return callback(new Error('not allowed by Cors'))
    }
  })
) // midelware
app.disable('x-powered-by')

app.get('/movies', (req, res) => {
  // const origin = req.header('origin') // parte del header que tiene el origen
  // if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
  //   res.header('Access-Control-Allow-Origin', origin)
  // }
  const { genre } = req.query
  if (genre) {
    const filteredMuvies = movies.filter(movie =>
      movie.genre.some(g => g.toLocaleLowerCase() === genre.toLocaleLowerCase())
    )
    return res.json(filteredMuvies)
  }
  res.json(movies)
})

app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  // recupera la pelicula
  const movie = movies.find(movie => movie.id === id)

  if (movie) return res.json(movie)

  res.status(404).json({ message: 'Movie not finded' })
})

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data
  }
  // esto no seria REST porque estamos guardando el estado en de la aplicación en memoria
  movies.push(newMovie)

  res.status(201).json(newMovie)
})

app.patch('/movies/:id', (req, res) => {
  const result = validatePartialMovie(req.body)
  // valida los datos
  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }
  // actualiza los datos
  const { id } = req.params // id película
  const movieIndex = movies.findIndex(movie => movie.id === id) // indice(id)
  if (movieIndex < 0) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  const updateMovie = {
    // actualiza datos de la película
    ...movies[movieIndex],
    ...result.data
  }
  movies[movieIndex] = updateMovie // retorna la película

  return res.json(updateMovie)
})

app.delete('/movies/:id', (req, res) => {
  // const origin = req.header('origin') // parte del header que tiene el origen
  // if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
  //   res.header('Access-Control-Allow-Origin', origin)
  // }

  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)
  if (movieIndex < 0) {
    return res.status(404).json({ message: 'Movie not fund' })
  }

  movies.splice(movieIndex, 1)

  return res.status(204).json({ message: 'Movie deleted' })
})

// app.options('/movies/:id', (req, res) => {
//   const origin = req.header('origin')
//   if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
//     res.header('Access-Control-Allow-Origin', origin)
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
//   }
//   res.send(200)
// })

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server listening on port https://localhost:${PORT}`)
})
