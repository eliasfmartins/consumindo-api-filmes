const url =
  "https://api.themoviedb.org/3/movie/top_rated?api_key=17cee563809b303918f439483a696deb&language=pt-BR&page=1";
const urlCategorias =
  "https://api.themoviedb.org/3/genre/movie/list?api_key=17cee563809b303918f439483a696deb&language=pt-BR";
const div = document.querySelector(".cards");
const img = "https://image.tmdb.org/t/p";
const tamanho = "w300";
const botaopesquisa = document.querySelector('.btn-busca');
const input = document.querySelector("#buscaFilme");
const slides = document.querySelector(".slides");
const home = document.querySelector(".home");
const categoria = document.querySelector(".categoria");
const tendencias = document.querySelector(".tendencias");
const btn = document.querySelector(".mobile");
const nav = document.querySelector(".nav");
const more = document.querySelector('.moreMovies');
let page = 1
const numeropage = document.querySelector('.pag')
const numeropage1 = document.querySelector('.pag1')
const btnPageNext = document.querySelector('.next')
const btnPagepreve = document.querySelector('.prev')
const btnpageNext1 = document.querySelector('.next1')
const btnpagepreve1 = document.querySelector('.prev1')


// numeropage.innerHTML=page

btnPageNext.addEventListener('click', async e=>{
  e.preventDefault()
  page++
  numeropage.innerHTML=page
  numeropage1.innerHTML=page
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=17cee563809b303918f439483a696deb&language=pt-BR&page=${page}`
  )
  const data = await response.json();
  div.innerHTML = "";
  createMovieCard(data);
  window.location.href='#card';
})
btnpageNext1.addEventListener('click', async e=>{
  e.preventDefault()
  page++
  numeropage.innerHTML=page
  numeropage1.innerHTML=page
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=17cee563809b303918f439483a696deb&language=pt-BR&page=${page}`
  )
  const data = await response.json();
  div.innerHTML = "";
  createMovieCard(data);
  window.location.href='#card';
})
btnPagepreve.addEventListener('click',async e=>{
  console.log()
  e.preventDefault()
  if(page>=2)
  page--
  numeropage.innerHTML=page
  numeropage1.innerHTML=page
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=17cee563809b303918f439483a696deb&language=pt-BR&page=${page}`
  )
  const data = await response.json();
  div.innerHTML = "";
  createMovieCard(data);
  window.location.href='#card';
})
btnpagepreve1.addEventListener('click',async e=>{
  console.log()
  e.preventDefault()
  if(page>=2)
  page--
  numeropage.innerHTML=page
  numeropage1.innerHTML=page
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=17cee563809b303918f439483a696deb&language=pt-BR&page=${page}`
  )
  const data = await response.json();
  div.innerHTML = "";
  createMovieCard(data);
  window.location.href='#card';
})

home.addEventListener("click", (e) => {
  btn.classList.remove("active");
  nav.classList.remove("hidden");
});
tendencias.addEventListener("click", (e) => {
  btn.classList.remove("active");
  nav.classList.remove("hidden");
});
categoria.addEventListener("click", (e) => {
  btn.classList.remove("active");
  nav.classList.remove("hidden");
});

btn.addEventListener("click", (e) => {
  btn.classList.toggle("active");
  nav.classList.toggle("hidden");
});
botaopesquisa.addEventListener('click', e =>{
   const inputValue = input.value;
   searchMovieByName(inputValue);
   if(input.value){
    input.value= '';
  }

   window.location.href='#card'; 
 });
// document.addEventListener('click', e=>{
//   const targent = e.target
//   if(targent.classList.contains("btn-busca")){
//     console.log('foi')
//   }
//  console.log(targent)})
// botaopesquisa.addEventListener('click', e=>{
//   const  targent = e.target
//   al
// })



input.addEventListener("keypress", (e) => {
  const inputValue = input.value;
  if (e.keyCode === 13) {
    searchMovieByName(inputValue);
    input.value = '';
    // if(input.value){
    //   input.value= '';
    // }
  

  }
  if(e.keyCode == 13){
    window.location.href='#card';
  };
});
home.addEventListener("click", (e) => {
  div.innerHTML = "";
  page = 1;
  numeropage.innerHTML=1    
  numeropage1.innerHTML=1
  filmes(url);
});
categoria.addEventListener("click", async (e) => {
  const response = await fetch(urlCategorias);
  const data = await response.json();
  console.log(data);
});
async function filmes() {
  const response = await fetch(url);
  const data = await response.json();
  const carouselMovies = data.results.splice(0, 5);
  console.log(carouselMovies);
  console.log(data);
  createCarousel(carouselMovies);
  createMovieCard(data);
}

createCarousel = (data) => {
  data.map((results) => {
    const { adult, poster_path, title, release_date, overview } = results;
    const paragrafo = document.createElement("p");
    const h1 = document.createElement("h1");
    const item = document.querySelector(".item");
    const photo = document.createElement("div");
    const left = document.createElement("div");
    const rigth = document.createElement("div");
    item.innerHTML = "";
    slides.appendChild(item);
    item.appendChild(left);
    item.appendChild(rigth);
    left.classList.add("itenCarusel1");
    rigth.classList.add("itenCarusel2");
    left.appendChild(photo);
    rigth.append(h1);
    rigth.appendChild(paragrafo);

    photo.innerHTML = `<img src="${img}/${tamanho}/${poster_path}" alt="fotoDosFilmes">`;
    paragrafo.innerHTML = overview;
    h1.innerHTML = title;
  });
};

async function searchMovieByName(name) {
  if (!name) {
    alert("Dados invalidos Preencha o formulario e envie novamente ");
    div.innerHTML = "";
    filmes(url);
    return;
  }
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=17cee563809b303918f439483a696deb&query=${name}&language=pt-BR`
  );

  const data = await response.json();
  if (data.results.length === 0) {
    alert("Não retornou resultados");
    //colocar a função de voltar a home
  }
  div.innerHTML = "";
  createMovieCard(data);
}

function createMovieCard(data) {
  data.results.map((results) => {
    // doente metal do krlheo tem q seleconar o array dentro do obj q e retornado pela api
    //n esquecer de deixar o ( em todo map e (no parametro))
    const { adult, poster_path, title, release_date, overview } = results;
    const titulo = document.createElement("h1");
    const card = document.createElement("div");

    const informacoes = document.createElement("div");
    const fotofilme = document.createElement("div");
    const resumo = document.createElement("p");

    informacoes.classList.add("dados");

    card.classList.add("card");
    div.appendChild(card);
    card.appendChild(informacoes);
    informacoes.appendChild(titulo);
    card.appendChild(fotofilme);
    informacoes.appendChild(titulo);
    informacoes.appendChild(resumo);
    fotofilme.innerHTML = `<img src="${img}/${tamanho}/${poster_path}" alt="fotoDosFilmes">`;
    titulo.innerHTML = title;
    resumo.innerHTML = overview;
  });
}

filmes(url);
// carousel

let counter = 1
document.getElementById("radio1").checked = true;
let div1 = document.querySelector(".auto-btn1")
let div2 = document.querySelector(".auto-btn2")
let div3 = document.querySelector(".auto-btn3")
let div4 = document.querySelector(".auto-btn4")
let div5 = document.querySelector(".auto-btn5")

div1.addEventListener('click', e=>{
  document.getElementById("radio1").checked = true;
})
div2.addEventListener('click', e=>{
  document.getElementById("radio2").checked = true;
})
div3.addEventListener('click', e=>{
  document.getElementById("radio3").checked = true;
})
div4.addEventListener('click', e=>{
  document.getElementById("radio4").checked = true;
})
div5.addEventListener('click', e=>{
  document.getElementById("radio5").checked = true;
})


setInterval( function(){
  nextSlide();
},7000);
function nextSlide(){
  counter++;
  if(counter>5){
    counter =1
  }
  document.getElementById("radio"+counter).checked = true;
}