const searchMovieForm = document.querySelector("#searchForm");

searchMovieForm.addEventListener("submit", (e) => {
    e.preventDefault();  
    const search = document.querySelector("#searchMovie");
    fetchMovieData(search.value);
});

const fetchMovieData = async (search) => {
    try {
        const response = await fetch(`http://www.omdbapi.com/?s=${search}&apikey=afe11847`);
        const data = await response.json();

        if (data.Response === "True") {
            cloneMovieData(data.Search);
        } else {
            displayErrorMessage();
        }
    } catch (error) {
        console.log(error);
        displayErrorMessage();
    }
};

const cloneMovieData = (movies) => {
    const movieParent = document.querySelector(".cards-parent");
    const movieTemplate = document.querySelector("#movie-card-template");

    // Clear existing content
    movieParent.innerHTML = "";

    if (movies.length === 0) {
        displayNoMoviesMessage();
    } else {
        movies.forEach((movie) => {
            if (!movie.Poster) return;
            const cardClone = movieTemplate.content.cloneNode(true);
            makeCard(cardClone, movie);
            movieParent.appendChild(cardClone);
        });
    }
};

const makeCard = (cardClone, movie) => {
    const cardImg = cardClone.querySelector("#img");
    const cardTitle = cardClone.querySelector("#title1");
    const cardYear = cardClone.querySelector("#year1");
    const cardMovieType = cardClone.querySelector("#type1");

    cardImg.src = movie.Poster;
    cardTitle.innerHTML = movie.Title;
    cardYear.innerHTML = movie.Year;
    cardMovieType.innerHTML = movie.Type;
};


const displayErrorMessage = () => {
    const movieParent = document.querySelector(".cards-parent");
    
    // Remove existing cards
    const existingCards = document.querySelectorAll('.card');
    existingCards.forEach(card => card.remove());

    // Remove existing error messages before adding a new one
    const existingErrorMessages = document.querySelectorAll('.error-message');
    existingErrorMessages.forEach(message => message.remove());

    const errorMessage = document.createElement('p');
    errorMessage.textContent = 'No Movie exist.';
    errorMessage.classList.add('error-message'); // Add a class for easy identification if needed
    movieParent.appendChild(errorMessage);
};
