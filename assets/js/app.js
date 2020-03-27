//variables
const listaTweets = document.getElementById("lista-tweets");

//event listeners

eventListeners();

function eventListeners() {
  // cuando se envia el formulario

  document.querySelector("#formulario")
    .addEventListener("submit", agregarTweet);

    //borrar tweets

    listaTweets.addEventListener('click',borrarTweet);

    document.addEventListener('DOMContentLoaded', localStorageListo);


}

//funciones

//funcion para agregar tweet

function agregarTweet(e) {
  e.preventDefault();

  //leer el valor de text tarea
  const tweet = document.getElementById("tweet").value;
  // crear boton para eliminar tweet

  const botonBorrar = document.createElement("a");

  botonBorrar.classList = "borrar-tweet";
  botonBorrar.innerText = "X";

  //crear elemento y añadir el contenido a la lista
  const li = document.createElement("li");
  li.innerText = tweet;
  li.appendChild(botonBorrar);
  //añade el tweet a la lista
  listaTweets.appendChild(li);

  //añadir a local storage
  agregarTweetLocalStorage(tweet);

}

//elimina el tweet del dom
function borrarTweet (e){
   e.preventDefault();
   if  (e.target.className === 'borrar-tweet'){
       e.target.parentElement.remove();
       borrarTweetLocalStorage(e.target.parentElement.innerText)
   }
   
}

//mostrar los valoresz de local storage
function localStorageListo(){

    let tweets; 

    tweets = obtenerTweetLocalStorage();
    
    tweets.forEach (function (tweet){
      
        const botonBorrar = document.createElement("a");

        botonBorrar.classList = "borrar-tweet";
        botonBorrar.innerText = "X";
      
        //crear elemento y añadir el contenido a la lista
        const li = document.createElement("li");
        li.innerText = tweet;
        li.appendChild(botonBorrar);
        //añade el tweet a la lista
        listaTweets.appendChild(li);    

    })

}

// agregar el tweet a local storage

function agregarTweetLocalStorage (tweet){
    let tweets ;

    tweets = obtenerTweetLocalStorage();

    tweets.push (tweet)
    localStorage.setItem('tweets', JSON.stringify(tweets));

    
}

//revisamoa s los valores de local storage
function obtenerTweetLocalStorage(){
let tweets; 
if(localStorage.getItem('tweets')=== null){

    tweets= [];
} else {
    tweets = JSON.parse(localStorage.getItem('tweets'))
}
return tweets;
}


//eliminar tweet de ,ocal storage

function borrarTweetLocalStorage (tweet){

    let tweets, tweetsBorrar ;

    tweetsBorrar = tweet.substring (0, tweet.length-1)

    tweets = obtenerTweetLocalStorage();

    tweets.forEach(function (tweet, index){
       if (tweetsBorrar === tweet){
tweets.splice (index,1)

       }
    })

    localStorage.setItem('tweets',JSON.stringify(tweets))
    console.log(tweets)
}