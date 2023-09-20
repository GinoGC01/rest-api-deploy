const z = require('zod')

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Movie title must be a string',
    required_error: 'Movie title is required'
  }),
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(1).max(10).default(5),
  poster: z
    .string()
    .url({
      message: 'Poster must be a valid URL'
    })
    .endsWith('webp'),
  genre: z
    .enum(
      ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Tryler'],
      {
        required_error: 'Movie genre is required',
        invalid_type_error: 'Movie genre must be an array of enum Genre'
      }
    )
    .array()
})

function validateMovie(object) {
  // para try catch => object resolved que devuelve si hay error o no. Es mas sencillo para usar condicionales (if)
  return movieSchema.safeParse(object)
}

function validatePartialMovie(object) {
  return movieSchema.partial().safeParse(object)
}

module.exports = {
  validateMovie,
  validatePartialMovie
}
