document.addEventListener("DOMContentLoaded", function () {
    const watchlistContainer = document.getElementById("watch-list")

    function removeFromWatchlist(movieTitle) {
        // Get the watchlist data from local storage
        const watchlistData = JSON.parse(localStorage.getItem("watchlist")) || []
        // Find the index of the movie to remove based on its title
        const movieIndex = watchlistData.findIndex((movie) => movie.title === movieTitle)
        if (movieIndex !== -1) {
            // Remove the movie from the watchlist data
            watchlistData.splice(movieIndex, 1)
            // Update the watchlist data in local storage
            localStorage.setItem("watchlist", JSON.stringify(watchlistData))
            // Re-render the watchlist to reflect the changes
            renderWatchlist()
        }
    }
    function renderWatchlist() {
        const watchlistData = JSON.parse(localStorage.getItem("watchlist")) || [];
        if (watchlistData.length === 0) {
            // Display a message for an empty watchlist
            const emptyWatchlistMessage = document.createElement("h2")
            emptyWatchlistMessage.innerHTML =
                `<h2>Your watchlist is looking a little empty...</h2>
                <i class="fa-solid fa-circle-plus "></i><span> Let’s add some movies!</span>`
            watchlistContainer.innerHTML = "" // Clear existing content
            watchlistContainer.appendChild(emptyWatchlistMessage)
        } else {
            // Clear existing content
            watchlistContainer.innerHTML = ""
            // Create a container for each movie in the watchlist
            const renderedMovieTitles = []
            watchlistData.forEach(function (movie) {
                // Check if the movie title is already in the renderedMovieTitles array
                if (!renderedMovieTitles.includes(movie.title)) {
                    const movieContainer = document.createElement("div")
                    movieContainer.classList.add("movie-container")
    
                    const moviePoster = document.createElement("img")
                    moviePoster.src = movie.poster;
    
                    const movieInfo = document.createElement("div")
                    movieInfo.classList.add("movie-info")
    
                    const movieTitle = document.createElement("h2")
                    movieTitle.classList.add("movie-title");
                    movieTitle.textContent = `${movie.title} ⭐️ ${movie.rating}`
    
                    const movieRuntime = document.createElement("p")
                    movieRuntime.classList.add("movie-runtime")
                    movieRuntime.innerHTML =
                        `${movie.runtime} &nbsp&nbsp <span class="movie-genre">${movie.genre}</span> &nbsp&nbsp 
                        <button class="remove-btn">
                            <i class="fa-solid fa-circle-minus"></i>
                            <span>Remove</span>
                        </button>`
    
                    const moviePlot = document.createElement("p")
                    moviePlot.classList.add("movie-plot")
                    moviePlot.textContent = movie.plot
    
                    // Add a click event listener to the "Remove" button
                    const removeButton = movieRuntime.querySelector(".remove-btn");
                    removeButton.addEventListener("click", function () {
                        removeFromWatchlist(movie.title)
                        // Re-render the watchlist after removal
                        renderWatchlist()
                    });
    
                    movieInfo.appendChild(movieTitle)
                    movieInfo.appendChild(movieRuntime)
                    movieInfo.appendChild(moviePlot)
    
                    movieContainer.appendChild(moviePoster);
                    movieContainer.appendChild(movieInfo)
                    watchlistContainer.appendChild(movieContainer)
    
                    // Add the movie title to the renderedMovieTitles array
                    renderedMovieTitles.push(movie.title)
                }
            })
        }
    }
    // Initial rendering of the watchlist
    renderWatchlist()
})
