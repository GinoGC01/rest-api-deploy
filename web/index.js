fetch('http://localhost:1234/movies')
  .then(res => res.json())
  .then(movies => {
    const html = movies
      .map(movie => {
        return `
        <article data-id=${movie.id}>
            <h2>${movie.title}</h2>
            <p>${movie.director}</p>
            <img src='${movie.poster}' alt='${movie.title}' width="300"/>
            <button>Eliminar Película</button>
        </article>
        `
      })
      .join('')

    document.querySelector('main').innerHTML = html

    document.addEventListener('click', e => {
      if (e.target.matches('button')) {
        const article = e.target.closest('article') // articulo mas "cercano"
        const id = article.dataset.id // recupero el id

        fetch(`http://localhost:1234/movies/${id}`, { method: 'DELETE' }).then(
          res => {
            if (res.ok) {
              article.remove()
            }
          }
        )
      }
    })
  })
