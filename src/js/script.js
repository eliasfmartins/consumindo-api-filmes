

const url='https://api.themoviedb.org/3/movie/top_rated?api_key=17cee563809b303918f439483a696deb&language=pt-BR'
const urlCategorias ='https://api.themoviedb.org/3/genre/movie/list?api_key=17cee563809b303918f439483a696deb&language=pt-BR'
const div = document.querySelector('.cards');
const img ="https://image.tmdb.org/t/p";
const tamanho='w300';
const btnBusca = document.querySelector('.busca');
const input = document.querySelector('#buscaFilme');
const gallery = document.querySelector('.gallery');
const home = document.querySelector('.home')
const categoria = document.querySelector('.categoria');
const btn = document.querySelector('.mobile');
const nav = document.querySelector('.nav');



btn.addEventListener('click', (e)=>{
  btn.classList.toggle('active');
  nav.classList.toggle('hidden')
})
// const cardsFIlmes = document.querySelector('.card');


// cardsFIlmes.addEventListener('click', (e)=>{
//   // cardsFIlmes.
//  cardsFIlmes.classList.add('adc')
  
// })







btnBusca.addEventListener('click', (e)=>{
  e.preventDefault();
  const inputValue = input.value
  searchMovieByName(inputValue);

  
})
home.addEventListener('click',(e)=>{
  div.innerHTML=''
  filmes(url);
  
});
categoria.addEventListener('click',  async(e)=>{
  const response = await fetch(urlCategorias)
  const data = await response.json();
  console.log(data);
})
async function filmes(){
  const response = await fetch(url);
  const data =  await response.json();
  const carouselMovies = data.results.splice(0,5)
  console.log(carouselMovies);
  console.log(data);
  createCarousel(carouselMovies)
  createMovieCard(data);
}
 
 createCarousel = (data) =>{

  data.map((results) => {
     const {adult, poster_path,title,release_date,overview} = results
     const paragrafo = document.createElement('p');
     const h1 = document.createElement('h1');
     const item = document.querySelector('.item');
     const photo = document.createElement('div');
     const left = document.createElement('div');
     const rigth = document.createElement('div');
     item.innerHTML=''     
     gallery.appendChild(item);
     item.appendChild(left);
     item.appendChild(rigth);
     left.classList.add('itenCarusel1');
     rigth.classList.add('itenCarusel2');
     left.appendChild(photo);
     rigth.append(h1)
     rigth.appendChild(paragrafo)
    
     photo.innerHTML= `<img src="${img}/${tamanho}/${poster_path}" alt="fotoDosFilmes">`
     paragrafo.innerHTML=overview;
     h1.innerHTML=title
    
  

    

   });
  }
  

   
 


async function searchMovieByName(name){
  if(!name){
    alert('Dados invalidos Preenchar o formulario e envie novamente ')
    div.innerHTML=''
    filmes(url);
    return
  }
  const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=17cee563809b303918f439483a696deb&query=${name}&language=pt-BR`)
  
  const data = await response.json();
  if(data.results.length === 0){
    alert('Não retornou resultados')
    //colocar a função de voltar a home 
    
  }
  div.innerHTML='';
  createMovieCard(data);
}

function createMovieCard(data){
  data.results.map((results) =>{
    
    // doente metal do krlheo tem q seleconar o array dentro do obj q e retornado pela api
    //n esquecer de deixar o ( em todo map e (no parametro))
  const {adult, poster_path,title,release_date,overview} = results
  const titulo = document.createElement('h1');
  const card = document.createElement('div');
  
  const informacoes = document.createElement('div');
  const fotofilme = document.createElement('div');
  const resumo = document.createElement('p');
  
  informacoes.classList.add('dados');

  card.classList.add('card');
  div.appendChild(card);
  card.appendChild(informacoes);
  informacoes.appendChild(titulo)
  card.appendChild(fotofilme);
  informacoes.appendChild(titulo);
  informacoes.appendChild(resumo);
  fotofilme.innerHTML= `<img src="${img}/${tamanho}/${poster_path}" alt="fotoDosFilmes">`
  titulo.innerHTML= title
  resumo.innerHTML= overview
  
  
});
}

filmes(url);
// carousel
const controls = document.querySelectorAll('.control');
let currentItem = 0;
const items = document.querySelectorAll('.item')
const maxItems = items.length;

controls.forEach(control =>{
control.addEventListener('click', () =>{
const isLeft = control.classList.contains('arrow-left');

    if (isLeft) {
      currentItem -=1;
    }else {
      currentItem +=1;
    }

    if (currentItem >= maxItems) {
      currentItem = 0
    }
    if (currentItem < 0){
      currentItem = maxItems - 1 
    }
    items.forEach(item =>
      item.classList.remove('current-item'));
      // console.log(currentItem);
    

      items[currentItem].scrollIntoView({
        //items[currentItem].scrollIntoView({
        //vai tentar deixar o intem da vez no centro correspondente ao curreitem
        inline: "center",
        // behavior: "smooth",
      });
      items[currentItem].classList.add('current-item')
})
});



















































// async function getAllObj(){
//   const response = await fetch(url)
//   const data =await response.json()
//   console.log(data);
//   return data.results.map(item=>{
//   const divfilho = document.createElement('div')
//   const name = document.createElement('h2');
//   const corpo = document.createElement('p')
//   name.innerText=item.name
//    corpo.innerText=item.url

//     divfilho.classList.add('filha')
//     div.appendChild(divfilho);   
//     divfilho.appendChild(name);
//     divfilho.appendChild(corpo);
//   })
    


//  }


//  getAllObj();
