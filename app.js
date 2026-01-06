const track = document.getElementById("carouselTrack");
const moviesGrid = document.getElementById("cardRow");
const comingSoonGrid = document.getElementById("comingSoonRow");

let currentIndex = 0;
const cardWidth = 820;
let totalMovies = 0;

const rightArrow = document.querySelector(".arrow.right");
const leftArrow = document.querySelector(".arrow.left");

fetch("movies.json")
  .then(response => response.json()) 
  .then(data => {
    const nowShowing = data.nowShowing;
    const comingSoon = data.comingSoon;

    totalMovies = nowShowing.length;

    nowShowing.forEach(movie => {
      const card = document.createElement("a");
      card.classList.add("movie-card");
      card.href = "#";
      card.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title}">
        <h3>${movie.title}</h3>
      `;
      track.appendChild(card);
    });

    nowShowing.forEach(movie => {
      const heroCard = document.createElement("a");
      heroCard.classList.add("heroCard");
      heroCard.href = "#";
      heroCard.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title}">
        <div class="card-info">
          <h3>${movie.title}</h3>
          <p>🎭 ${movie.genre} | 🌐 ${movie.language}</p>
          <span class="format-badge">${movie.format}</span>
      `;
      moviesGrid.appendChild(heroCard);
    });
    
    comingSoon.forEach(movie => {
      const comingCard = document.createElement("a");
      comingCard.classList.add("heroCard");
      comingCard.classList.add("comingSoonCard");
      comingCard.href = "#";
      comingCard.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title}">
        <div class="comingSoonOverlay">
          <span class="comingSoonText">Coming Soon</span>
          <h3>${movie.title}</h3>
          <span class="releaseDate">📅 ${movie.releaseDate || 'TBA'}</span>
          <p style="color: #B3B3B3;">🎭 ${movie.genre}</p>
        </div>`;
      comingSoonGrid.appendChild(comingCard);   
    })
    
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  })
  .catch(err => console.error("Failed to load movies:", err));


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

const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.navLinks');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});


window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.style.height = '80px';
  }
  else {
    header.style.height = '135px';
  }
});


// const languageSelect = document.querySelector(".filter-select.language");
// const choices = new Choices(languageSelect, {
//     searchEnabled: false,
//     itemSelectText: '',
//     shouldSort: false,
// });


// function renderMovies(movies) {
//   track.innerHTML = "";

//   movies.forEach(movie => {
//     const card = document.createElement("a");
//     card.classList.add("movie-card");
//     card.href = "#"; 

//     card.innerHTML = `
//       <img src="${movie.poster}" alt="${movie.title}">
//       <h3>${movie.title}</h3>
//       <p>${movie.genre} | ${movie.language} | ${movie.format}</p>
//     `;

//     track.appendChild(card);
//   });
// }


// fetch("movies.json")
//   .then(res => res.json())
//   .then(movies => {
//     window.allMovies = movies;  

//     renderMovies(movies); 
//   })
//   .catch(err => console.error(err));


// const genreFilter = document.querySelector(".filter-select.genre");

// genreFilter.addEventListener("change", (e) => {
//   const selectedGenre = e.target.value;

//   const filteredMovies = selectedGenre 
//     ? window.allMovies.filter(m => m.genre === selectedGenre)
//     : window.allMovies;

//   renderMovies(filteredMovies);
// });




