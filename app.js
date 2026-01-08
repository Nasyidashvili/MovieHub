const track = document.getElementById("carouselTrack");
const moviesGrid = document.getElementById("cardRow");
const comingSoonGrid = document.getElementById("comingSoonRow");

let currentIndex = 0;
const cardWidth = 520;
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
        <div class="card-info">
          <h3>${movie.title}</h3>
          <p>🎭 ${movie.genre}</p>
          <p>📅 ${movie.releaseDate || 'TBA'}</p>
          <span class="format-badge coming">Coming Soon</span>
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


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");

    if(targetId === '#home') {
      window.scrollTo ({
        top: 0,
        behavior: 'smooth'       
      });
    }
    else {
      const targetSection = document.querySelector(targetId);
      if(targetSection) {
        const headerHeight = 135;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  });
})


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


const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.navLinks a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksAll.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});




