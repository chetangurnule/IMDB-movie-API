let apiKey = document.querySelector("#search-api");
let movieName = document.querySelector("#search-movie");
let button = document.querySelector(".btn");
let lodder = document.querySelector(".lodder");
let errorMessage = document.querySelector(".error-message");

// adding eventListner on button
button.addEventListener("click", renderMovies);

// function to render movies in the movies div
function renderMovies(){
    let moviesDiv = document.querySelector(".movies");
    let apiKeyValue = apiKey.value;
    let movieNameValue = movieName.value;

    // if apikey and movie value is not entered by user then showing error message
    if(!apiKeyValue || !movieNameValue){
        errorMessage.textContent = 'Please provide both an API Key and a movie title.';
        errorMessage.style.display = 'block';
        setTimeout(()=>{
            errorMessage.style.display = "none";
        }, 3000);
        return;
    }

    // if apiKey and movie value is entered then fetch the movies from omdb api

    let apiUrl = `https://www.omdbapi.com/?s=${movieNameValue}&apikey=${apiKeyValue}`;
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        data.Search.forEach(movie=>{
            let div = document.createElement("div");
            div.classList.add("movie");
            div.innerHTML = `
            <div class="image">
                <img src="${movie.Poster}" alt="movie Image">
            </div>
            <div class="movie-title">
                <h3>${movie.Title}</h3>
            </div>
            <div class="release-year">
                <p>Release Year : ${movie.Year}</p>
            </div>
            <div class="more-details">
                <a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank">More Details</a>
            </div>`;
            moviesDiv.append(div);
        })
    });

}

// // function to clear the input tags
// function clear(){
//     apiKey.value = "";
//     movieName.value = "";
// }