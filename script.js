let page = 1;
let compteur = 0;
const filmsAjoutes = [];
const popular = document.querySelector(".movie-list");
const favoris = document.querySelector(".compteur");
const films_favoris = document.querySelector(".films-favoris");
favoris.textContent = compteur;
const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page.toString()}`;
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      `Bearer ${API_KEY}`,
  },
};

function charger_film() {
  fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      json.results.forEach((element) => {
        popular.insertAdjacentHTML(
          "beforeend",
          `<a href="javascript:void(0)">
        <div class="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
        <div class="relative overflow-hidden text-white rounded-md">
            <img src="https://image.tmdb.org/t/p/w1280${element.poster_path}" />
        </div>
        <div class="p-4">
            <div class="mb-4 rounded-full bg-cyan-600 py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm w-20 text-center">
            POPULAR
            </div>
            <h6 class="mb-2 text-slate-800 text-xl font-semibold">
            ${element.title}
            </h6>
            <p class="text-slate-600 leading-normal font-light">
            ${element.overview}
            </p>
        </div>

        <div class="flex items-center justify-between p-4">
            <div class="flex items-center">
            <div class="flex flex-col ml-3 text-sm">
                <span class="text-slate-800 font-semibold">Note : ${element.vote_average.toFixed(1)}/10</span>
                <span class="text-slate-600">${element.release_date}</span>
            </div>
            </div>
        </div>
        </div>
    </a>`,
        );

        const card = popular.lastElementChild;
        card.addEventListener("click", function () {
          if (filmsAjoutes.includes(element.id)) {
            return;
          }
          filmsAjoutes.push(element.id);
          compteur = compteur + 1;
          favoris.textContent = compteur;
          films_favoris.insertAdjacentHTML(
            "beforeend",
            `<li>${element.title} <button class="corbeille fa-solid fa-trash" style="cursor: pointer"></button></li>`,
          );

          const item = films_favoris.lastElementChild;
          const corbeille = item.querySelector(".corbeille");
          corbeille.addEventListener("click", () => {
            item.remove();
            filmsAjoutes.splice(filmsAjoutes.indexOf(element.id), 1);
            compteur = compteur - 1;
            favoris.textContent = compteur;
          });
        });
      });
    });
}

const burger = document.querySelector(".burger");
const sidebarre = document.querySelector(".barre-nav");

burger.addEventListener("click", () => {
  sidebarre.classList.toggle("hidden");
});

const page_suivante = document.querySelector(".page_suivante");
page_suivante.addEventListener("click", () => {
  page += 1;
  charger_film();
});

charger_film();
