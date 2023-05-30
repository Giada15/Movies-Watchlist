const moviesContainerWatchlist= document.getElementById("container-movies-watchlist")

// set a variable = to the parsed array of movies IDs got from local storage
let watchlistMovies = JSON.parse(localStorage.getItem("watchlistMovies"))

renderMoviesWatchlist(watchlistMovies)

async function renderMoviesWatchlist(moviesArray){
    let moviesHtml = ``
    if(moviesArray.length > 0){
        for(let movie of moviesArray){
            const res = await fetch(`http://www.omdbapi.com/?apikey=dfec776a&i=${movie}`)
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
                             <button class="add-to-watchlist" data-remove="${data.imdbID}">
                             <i class="fa-solid fa-circle-minus"></i>Remove</button>
                         </div>
                         <div class="movie-plot">
                             <p>${data.Plot}</p>
                           </div>
                    </div>
                 </div>`
        }
        moviesContainerWatchlist.innerHTML = moviesHtml
    }else{
        moviesContainerWatchlist.innerHTML = 
        `<div id="default-content-watchlist" class="default-content">
            <p>Your watchlist is looking a little empty...</p>
            <a href="index.html" class="watchlist-content"><i class="fa-sharp fa-solid fa-circle-plus"></i>Let’s add some movies!</a>
        </div>`
    }
}

document.addEventListener("click", function(e){
    if(e.target.dataset.remove){
        removeMovieFromWatchlist(e.target.dataset.remove)
    }
})

//remove movies from Local Storage

function removeMovieFromWatchlist(movieId){
    watchlistMovies = watchlistMovies.filter(function(movie){
        return movie !== movieId
    })

    renderMoviesWatchlist(watchlistMovies)

    //Update Local Storage with the new array of movies(including the deleted ones)
    localStorage.setItem("watchlistMovies", JSON.stringify(watchlistMovies))

}
