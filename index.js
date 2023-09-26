const searchBtn = document.getElementById("search-button")
const searchInput = document.getElementById("search-input")
const movieList = document.getElementById("movie-list")

searchBtn.addEventListener("click", fetchMovie)
async function fetchMovie() {
    const searchInputValue = searchInput.value.trim()
    const errorMessage = document.createElement("p")
    errorMessage.classList.add("error-message")
    if (searchInputValue === "") {
        // Handle empty search input
        return
    }
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=8acad267&t=${searchInputValue}&type=movie`)
        if (!response.ok) {
            // Handle non-successful response (e.g., show an error message)
            console.error("Error fetching movie data")
            errorMessage.textContent = "An error occurred while fetching movie data. Please try again later."
            movieList.innerHTML = ""
            movieList.appendChild(errorMessage)
            return
        }
        const data = await response.json()
        // Clear previous results
        movieList.innerHTML = ""
        if (data.Title) {
            renderMovie(data)
            const addBtn = document.getElementById("add-btn")
            addBtn.addEventListener("click", function () {
                addToLocalStorage(data)
                addBtn.innerHTML = `<span>In Watchlist</span>`
            })
            searchInput.value = "" // Clear the search input
        } else {
            // Handle the case where no movie was found
            errorMessage.textContent = "Unable to find what you’re looking for. Please try another search."
            movieList.appendChild(errorMessage)
        }
    } catch (error) {
        // Handle any unexpected errors (e.g., show an error message)
        console.error("An error occurred:", error)
    }
}

function addToLocalStorage(movieData) {
    // Check if the movie data is valid
    if (!movieData) {
        // Handle the case where movie data is missing or invalid
        return
    }
    const movieTitle = movieData.Title
    const moviePoster = movieData.Poster
    const movieRating = movieData.imdbRating
    const movieRunTime = movieData.Runtime
    const movieGenre = movieData.Genre
    const moviePlot = movieData.Plot

    const movie = {
        title: movieTitle,
        poster: moviePoster,
        rating: movieRating,
        runtime: movieRunTime,
        genre: movieGenre,
        plot: moviePlot
    }
    // Check if there are existing movies in the watchlist in local storage
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || []
    // Add the new movie to the watchlist
    watchlist.push(movie)
    // Save the updated watchlist back to local storage
    localStorage.setItem("watchlist", JSON.stringify(watchlist))
}

function renderMovie(data){
    // Create a movie container and display movie details
    const movieContainer = document.createElement("div")
    movieContainer.classList.add("movie-container")

    const moviePoster = document.createElement("img")
    moviePoster.src = data.Poster

    const movieInfo = document.createElement("div")
    movieInfo.classList.add("movie-info")

    const movieTitle = document.createElement("h2")
    movieTitle.classList.add("movie-title")
    movieTitle.textContent = `${data.Title} ⭐️ ${data.imdbRating}`

    const movieRuntime = document.createElement("p")
    movieRuntime.classList.add("movie-runtime")
    movieRuntime.innerHTML += 
            `${data.Runtime} &nbsp&nbsp <span class="movie-genre">${data.Genre}</span> &nbsp&nbsp 
            <button id="add-btn" class="add-btn">
                <i class="fa-solid fa-circle-plus"></i> 
                <span>Watchlist</span>
            </button>
           `
    const moviePlot = document.createElement("p")
    moviePlot.classList.add("movie-plot")
    moviePlot.textContent = data.Plot

    movieInfo.appendChild(movieTitle)
    movieInfo.appendChild(movieRuntime)
    movieInfo.appendChild(moviePlot)

    movieContainer.appendChild(moviePoster)
    movieContainer.appendChild(movieInfo)
    movieList.appendChild(movieContainer)
}




