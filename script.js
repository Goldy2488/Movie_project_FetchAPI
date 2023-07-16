const searchMovieForm = document.querySelector("#searchForm");

    searchMovieForm.addEventListener("submit",(e)=>{
        e.preventDefault();  // prevent default event   propagation for form submit event when  form submit is clicked  on  the search  field             
        const search = document.querySelector("#searchMovie");
        fetchMovieData(search.value)
})


const fetchMovieData=async(search)=>{
    try{
        const response = await fetch(`http://www.omdbapi.com/?s=${search}&apikey=afe11847`);
        const data=await response.json();
        cloneMovieData(data.Search)
    }catch(error){  
        console.log(error);
        
    } 
};

const cloneMovieData=(movies)=>{ 
    const movieParent=document.querySelector(".cards-parent");
    const movieTemplate=document.querySelector("#movie-card-template");
    movieParent.innerHTML="";
    
    movies.map((movie)=>{
        if (movie.Poster==="N/A") return;
        // if (movie.Title==="N/A") return;
        // if (movie.Year==="N/A") return;
        // if (movie.Type==="N/A") return;
        const cardClone=movieTemplate.content.cloneNode(true);//for deep cloning node
        makeCard(cardClone, movie);
        movieParent.appendChild(cardClone);
    })
}

const makeCard=(cardClone,movie)=>{
    console.log(movie);
    const cardImg=cardClone.querySelector("img");
    const cardTitle=cardClone.querySelector("h2 span");
    const cardYear=cardClone.querySelector("h3 span");
    const cardMovieType=cardClone.querySelector("h4 span");   
    cardImg.src = movie.Poster;
    cardTitle.innerHTML = movie.Title;
    cardYear.innerHTML = movie.Year;
    cardMovieType.innerHTML = movie.Type;    
}



 