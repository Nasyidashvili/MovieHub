const movies = [
    {title: "Avatar", poster: "movie/avatar.webp"},
    {title: "Joker", poster: "movie/joker.png"},
    {title: "Zootopia", poster: "movie/zootopia.webp"},
    {title: "Anaconda", poster: "movie/anaconda.webp"},
    {title: "Batman", poster: "movie/batman.jpg"}
];

const track = document.getElementById("carouselTrack")

movies.forEach(movie => {
    const card = document.createElement("a");
    card.classList.add("movie-card");
    card.href = "#";

    card.innerHTML = `
    <img src="${movie.poster}" alt="${movie.title}">
    <h3>${movie.title}</h3>
    `;

    track.appendChild(card);
})

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

