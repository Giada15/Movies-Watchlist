const searchBtn= document.getElementById("btn-search")
const movieSearched= document.getElementById("movie-search-bar")
const moviesContainer= document.getElementById("container-movies")
const defaultContent= document.getElementById("default-content")
let watchlistMovies = []

// localStorage.clear()

searchBtn.addEventListener("click", ()=>{
    fetch(`http://www.omdbapi.com/?apikey=dfec776a&s=${movieSearched.value}`)
        .then(res => res.json())
        .then(data => {

            if(data.Response === "True"){
                const moviesArray = data.Search //array of movie. Each movie has its unique ID
                let moviesHtml = ``
                renderMovies(moviesArray)
                async function renderMovies(moviesArray){
                        for(let movie of moviesArray){
                            const res = await fetch(`http://www.omdbapi.com/?apikey=dfec776a&i=${movie.imdbID}`)
                            const data = await res.json()

                            moviesHtml += 
                                `<div class="container-movie" id="container-movie">
                                    <img class="poster" src="${data.Poster ==="N/A"? "img/backgound-top.png": data.Poster}" alt="">
                                    <div class="description">
                                        <div class="movie-title">
                                            <h2>${data.Title}</h2>
                                            <p><i class="fa-solid fa-star"></i>${data.imdbRating}</p>
                                        </div>       
                                        <div class="movie-info">
                                            <p>${data.Runtime}</p>
                                            <p>${data.Genre}</p>
                                            <button class="add-to-watchlist" data-watchlist="${data.imdbID}">
                                            <i class="fa-sharp fa-solid fa-circle-plus"></i>Watchlist</button>
                                        </div>
                                        <div class="movie-plot">
                                            <p>${data.Plot}</p>
                                        </div>
                                    </div>
                                </div>`
                        }

                        moviesContainer.innerHTML = moviesHtml
                }
            }else{  
                defaultContent.innerHTML = 
                `<p>Unable to find what you’re looking for. <br> Please try another search.</p>`
            }
        })    
})

document.addEventListener("click", function(e){
    if(e.target.dataset.watchlist){
        addToWatchList(e.target.dataset.watchlist) 
    }  
})

//Save movies Id to local storage
function addToWatchList(movieId){
    watchlistMovies.push(movieId)
    localStorage.setItem("watchlistMovies", JSON.stringify(watchlistMovies))
} // saves an stringify array of Movies IDs ["tt0072890", "tt10293406", "tt0426883"] to local Storage

   




