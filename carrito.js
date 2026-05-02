// Array donde guardamos los libros
let carrito = [];
// let es una palabra para crear una variable que puede cambiar su valor
// en este caso creo una variable llamada carrito que será un arreglo vacío

// botones agregar
let botones =   document.querySelectorAll(".agregar-carrito");
// creo una variable llamada botones
// document estoy mandando a llamar toda la página web
// querySelectorAll va a buscar todos los elementos que coincidan a que?
// lo que está dentro del paréntesis, es el nombre que creamos en html 
// entonces hace esto: busca en todo el HTML, todos los elementos ue tengan la clase "agrear-carrito" y guárdalos en la variable botones

// elementos del modal
let modal = document.getElementById("modal-carrito");
// getElementById busca un elemento en el HTML que tenga ese ID dentro del kparéntesis o sea, modal-carrito que está en html, cuando lo encuentra lo guarda en la variable modal
let lista = document.getElementById("lista-carrito");
let totalElemento = document.getElementById("total");
let cerrar = document.getElementById("cerrar-carrito");
// ícono del carrito
let iconoCarrito = document.getElementById("icono-carrito");
// mismo caso para los otros 3
// para que hace eso? JavaScript busca elementos del HTML para poder controlarlos o modificarlos, como: mostrar u ocultar elementos, cambiar texto, agregar contenido nuevo, etc

// abrir carrito desde icono
iconoCarrito.addEventListener("click", function(e){
    e.preventDefault();
    modal.style.display = "flex";
});
// Ocupamos la variable que creamos arriba llamada iconoCarrito, que es la representación que hicimos del ícono de comprar. Lo que hay dentro del paréntesis de addEventListener es la función que permite que algo suceda cuando pasa un evento. Qué acción sucederá?, indicamos que al hacer click, en function(e) se hará lo que queremos que pase cuando ocurra el evento. Esto se llama función callback. Entonces, la e representa el evento que pasará.
// e.preventDefault(); entonces se ocupa para que no haga el efecto que está por default en html, o sea, navegar y poder ocupar o abrir el carrito
// Entonces, modal.style.display = "flex"; acuerdanse que modal es la variable que cree
// Recuarda que en CSS modal-carrito lo oculté con display none, y con esta línea cambiamos a display flex, pero cuándo? al click
// cerrar carrito
cerrar.addEventListener("click",function(){

    modal.style.display = "none";

});
// Ya abrimos con esa acción una interfaz en medio, ahora necesito cerrar, por eso, estas líneas. Declaré arriba cerrar, lo mando a llamar. Misma explicación que la anterior pero en este caso actua el botón para cerrar, por eso none.

// Aquí viene lo bueno. Este es el que hacce todo

botones.forEach(function(boton){
    // Mando a llamar a la variable botones. Foreach es un ciclo especial para java. Aquí harpe que recorra cda botón de la lista, uno por uno.
    // function(boton) ejecuta la función para cada botón individualmente.

    boton.addEventListener("click",function(e){
        // mismo caso, mando a llamar a boton y recuerden que esa función de addEventLisener("click", function(e) es al accionar con el click)

        e.preventDefault();
        // Para que no se vaya a otro lado

        let libro = boton.closest(".libros_libros, .cont_recomendaciones div");
        // seguimos con libros, donde ocupamos al boton y con closet busca el contenedor más cercano que coincida con el selector. De dónde? de libros_libros que es el conenedor de html y de recomendaciones, pero aquí creo que lo eliminaremos el día que les explique

        let titulo = libro.querySelector("h3").textContent;
        // extraer información: querySelector("h3"). busca la etiqueta html h3 dentro del contenedor libro y lo asigna a título

        let autor = libro.querySelector("p").textContent;
        // lo mismo que h3

        let precioElemento = libro.querySelector("strong");
        // lo mismo que h3

        let precio = 0;
        // el precio es una variable que hay que fijar en 0

        if(precioElemento){
            // si existe un elemento de precio hará:
            precio = precioElemento.textContent
            // Esto asigna la cadena de texto que represena el precio a la variable precio. Por ahora precio es todavía un strng: $630.70.

            .replace("$","")
            // remplaza lo primero, que es el signo de pesos por lo segundo que está a un lado de la coma, que es nada.

            .replace(",","");
            // reemplaza lo primero, que es la coma por lo segundo que está a un lado de la coma, que es nada.

            precio = parseFloat(precio);
            // parseFloat ocupa números reales, o sea, flotantes. Convierte la cadena en número decimal.

            // Para qué hacemos eso? pues los datos en html son string, o conocidos como caracteres que son elementos que no podemos sumar y los estamos convirtiendo a flotante para después sumar.
        }
    
        let producto = {
            titulo: titulo,
            autor: autor,
            precio: precio
        };
        // esto de equí arriba es un objeto. Lo creo para almacenar al carrito los atributos que están dentro. Es muy parecido a la estructura de diccionario de Python. que sería clave-valor

        carrito.push(producto);
        // carrito es el array que está arriba, para qué lo ocupo, para ir agregando conforme a los clicks al array, con qué método? con push(). Dentro de él tengo que decirla qué dato agregaré

        mostrarCarrito();
        // Función que me ayudará a recorrer el array y después me ayudará a crear listas dentro de él, del carrito o modal. Sin este el usuario final, no ve nada.

        modal.style.display = "flex";
        // Este es el encargado de que el usuario vea de una vez el carrito, mando a llamar modal.style  es para ocupar estilos y display es css que hará que muestre un elemento y el flex es para que se muestre el contenedor
    
    });
});

// MOSTRAR CARRITO
function mostrarCarrito(){
    // Creamos o declaramos una función llamada mostrarCarrito. Siempre pide los paréntesis, este ayudará a que cada vez que le demos click a comprar, mande la función para actualizar
    lista.innerHTML = "";
    // lista en html es ul e innerHTML es "todo el elemento que está en HTML", le asignará los dos "", eso evita que se repita el libro ahora, después se podrá hacer que agregue un contador

    let total = 0;
    // los precios los sumaremos y ocuparemos total=0

    carrito.forEach(function(producto){
        // mi array del carrito, mi ciclo que recorre cada libro uno a uno
        let item = document.createElement("ul");
        // crea una variable llamada item donde le asignaremos un elemento dinamico que está vacío, que elemento listas, para cuando se agregue aparezcan los libros, por eso ul
        item.textContent = producto.titulo + " - $" + producto.precio;
        // ocupamos la variable item y también ocupamos al object llamado producto de arriba, o sea, un ejemplo: nombre del libro, autor y precio, los datos reales y textConten es el que ayuda a que sea visible el ul
        lista.appendChild(item);
        // Como es lista appendChild lo agrega al final pareciedo a Python
        total += producto.precio;
        // como acumulador: total=total+el precio que está en el objeto del producto 
    });
    totalElemento.textContent = "$" + total;
    // totalElemento es el <span id="total">$0</span> dentro del modal.
    // quiero que se vaya actualizando cada vez que le de click, entonces, solo se agrega esto ="$" modal

}

const header = document.querySelector("header");
// creo una variable llamada header para poder seleccionar la etiqueta

// Se añade clase por defecto al cargar la página
header.classList.add("default");
// permite manipular las clases CSS del elemento
// add (default) agrega la clase default

window.addEventListener("scroll", () => {
    // window representa la ventana del navegador
    // addEvent...es para "escuchar" un evento, pero este evento es el scroll para poder bajar!
    // La flecha me ayuda a que se ejecute solo cuando hagamos scroll

    if (window.scrollY > 50) {
        // cuando se hace scroll 50px o más pixeles hacia abajo
        header.classList.add("scrolled");
        // este funciona con css para cambiar el estilo
        header.classList.remove("default");
        // Si existen más clases al mismo tiempo los quita oara que no haya problema
    }
    else{
        header.classList.remove("scrolled");
        header.classList.add("default");
        // si no cumple la condición anterior, no hará nada
    }
});


