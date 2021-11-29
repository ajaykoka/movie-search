const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=d9e2eda26ce9d82015a9827acd6e64c3&page=1'

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'

const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=d9e2eda26ce9d82015a9827acd6e64c3&query='

const main = document.getElementById('main')

const form = document.getElementById('form')

const search = document.getElementById('search')

// get movies on initial load

getMovies(API_URL)

async function getMovies(x) {
    const res = await fetch(x);
    const data = await res.json();

    console.log(data)

    showMovies(data.results)
}

function showMovies(movies) {
    // render
    main.innerHTML = ''
    movies.forEach((movie) =>{
        const { title, poster_path, vote_average, overview} = movie

        const movieEL = document.createElement('div')
        movieEL.classList.add('movie')

        movieEL.innerHTML = `
                <img src="${IMG_PATH + poster_path}">
                <div class="movie-info">
                    <h3>${title}</h3>
                    <span class ="${getClassByRate(vote_average)}">${vote_average}</span>
                </div>
                <div class="overview">
                <h3>Overview</h3>
                <p>${overview}</p>
                </div>    
            `
            main.appendChild(movieEL)
    })
}


function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 5){
    return 'orange'
    } else {
        return 'red'
    }
}

// search 
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm && searchTerm !== ''){
        getMovies(SEARCH_API + searchTerm)
    }


})