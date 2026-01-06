const track = document.getElementById("carouselTrack");

fetch("movies.json")
  .then(response => response.json()) 
  .then(movies => {
    movies.forEach(movie => {
      const card = document.createElement("a");
      card.classList.add("movie-card");
      card.href = "#";
      card.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title}">
        <h3>${movie.title}</h3>
      `;
      track.appendChild(card);
    });
  })
  .catch(err => console.error("Failed to load movies:", err));


let currentIndex = 0;

const cardWidth = 820;
const totalMovies = movies.length;

const rightArrow = document.querySelector(".arrow.right");
const leftArrow = document.querySelector(".arrow.left");

rightArrow.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex >= totalMovies) {
        currentIndex = 0;
    }

    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
});

leftArrow.addEventListener("click", () => {
    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = totalMovies - 1;
    }

    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
});

flatpickr("input[type=datetime-local]", {});


const languageSelect = document.querySelector(".filter-select.language");
const choices = new Choices(languageSelect, {
    searchEnabled: false,
    itemSelectText: '',
    shouldSort: false,
});


function renderMovies(movies) {
  track.innerHTML = "";

  movies.forEach(movie => {
    const card = document.createElement("a");
    card.classList.add("movie-card");
    card.href = "#"; 

    card.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>${movie.genre} | ${movie.language} | ${movie.format}</p>
    `;

    track.appendChild(card);
  });
}


fetch("movies.json")
  .then(res => res.json())
  .then(movies => {
    window.allMovies = movies;  

    renderMovies(movies); 
  })
  .catch(err => console.error(err));


const genreFilter = document.querySelector(".filter-select.genre");

genreFilter.addEventListener("change", (e) => {
  const selectedGenre = e.target.value;

  const filteredMovies = selectedGenre 
    ? window.allMovies.filter(m => m.genre === selectedGenre)
    : window.allMovies;

  renderMovies(filteredMovies);
});