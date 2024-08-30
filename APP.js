document.querySelector('form').addEventListener("submit", (e) => {
    e.preventDefault();
    let movie = document.querySelector('.movieName').value;
    let year = document.querySelector('.movieYear').value;
    getAllMovies(movie, year);
});

async function getAllMovies(movie, year) {
    let url = `https://www.omdbapi.com/?s=${movie}&apikey=f23015c5`;
    if (year) {
        url += `&y=${year}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    console.log(data.Search);

    let movies = data.Search;
    let movieDetails = document.getElementById('movieDetails');
    movieDetails.innerHTML = ``;

    if (movies) {
        for (let i = 0; i < movies.length; i++) {
            let movieId = movies[i].imdbID;


            let movieResponse = await fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=f23015c5`);
            let movieData = await movieResponse.json();

            let newDiv = document.createElement('div');
            newDiv.className = 'movie-card';
            newDiv.innerHTML = `
            <div class="movie-poster">
                <img src="${movieData.Poster}" alt="${movieData.Title}">
            </div>
            <div class="movie-info">
                <p class="title">${movieData.Title}</p>
                <p><strong>Year:</strong> ${movieData.Year}</p>
                <p><strong>Type:</strong> ${movieData.Type}</p>
                <p><strong>Genre:</strong> ${movieData.Genre}</p>
                <p><strong>Director:</strong> ${movieData.Director}</p>
                <p><strong>Actors:</strong> ${movieData.Actors}</p>
                
            </div>
            `;
            movieDetails.appendChild(newDiv);
        }
    } else {
        movieDetails.innerHTML = `<p>No movies found.</p>`;
    }
}