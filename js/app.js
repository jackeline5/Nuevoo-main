const menu = document.querySelector('.hamburguesa');
const navegacion = document.querySelector('.navegacion');
const imagenes = document.querySelectorAll('img');
const btnTodos = document.querySelector('.todos');
const btnNatural = document.querySelector('.natural');
const btnEsculpidas = document.querySelector('.esculpidas');
const btnPorcelanas = document.querySelector('.porcelanas');
const btnAcrilicas = document.querySelector('.acrilicas');
const contenedorDiseños = document.querySelector('.diseños');
document.addEventListener('DOMContentLoaded',()=>{
    eventos();
    diseños();
});

const eventos = () =>{
    menu.addEventListener('click',abrirMenu);
}

const abrirMenu = () =>{
     navegacion.classList.remove('ocultar');
     botonCerrar();
}

const botonCerrar = () =>{
    const btnCerrar = document.createElement('p');
    const overlay  = document.createElement('div');
    overlay.classList.add('pantalla-completa');
    const body = document.querySelector('body');
    if(document.querySelectorAll('.pantalla-completa').length > 0) return;
    body.appendChild(overlay);
    btnCerrar.textContent = 'x';
    btnCerrar.classList.add('btn-cerrar');

   
    navegacion.appendChild(btnCerrar);   
    cerrarMenu(btnCerrar,overlay);
    
}

const observer = new IntersectionObserver((entries, observer)=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                const imagen = entry.target;
                imagen.src = imagen.dataset.src;
                observer.unobserve(imagen);
            }
        }); 
});


imagenes.forEach(imagen=>{
   
    observer.observe(imagen);
});

const cerrarMenu = (boton, overlay) =>{
    boton.addEventListener('click',()=>{
        navegacion.classList.add('ocultar');
        overlay.remove();
        boton.remove();
    });

    overlay.onclick = function(){
        overlay.remove();
        navegacion.classList.add('ocultar');  
        boton.remove();
    }
}

const diseños = () =>{
    let diseñosArreglo = [];
    const diseños = document.querySelectorAll('.diseño');

    diseños.forEach(diseño=> diseñosArreglo = [...diseñosArreglo,diseño]);

    const natural = diseñosArreglo.filter(natural=> natural.getAttribute('data-diseño') === 'natural');
    const esculpidas = diseñosArreglo.filter(esculpidas => esculpidas.getAttribute('data-diseño') === 'esculpidas');
    const porcelanas = diseñosArreglo.filter(porcelanas => porcelanas.getAttribute('data-diseño') === 'porcelanas');
    const acrilicas = diseñosArreglo.filter(acrilicas=> acrilicas.getAttribute('data-diseño') === 'acrilicas');

    mostrarDiseños(natural, esculpidas, porcelanas, acrilicas, diseñosArreglo);

}

const  mostrarDiseños = (natural, esculpidas, porcelanas, acrilicas, todos) =>{
    btnNatural.addEventListener('click', ()=>{
        limpiarHtml(contenedorDiseños);
        natural.forEach(natural=> contenedorDiseños.appendChild(natural));
    });

    btnEsculpidas.addEventListener('click', ()=>{
        limpiarHtml(contenedorDiseños);
         esculpidas.forEach(esculpidas=> contenedorDiseños.appendChild(esculpidas));
    });

    btnPorcelanas.addEventListener('click', ()=>{
        limpiarHtml(contenedorDiseños);
        porcelanas.forEach(porcelanas=> contenedorDiseños.appendChild(porcelanas));
    });
    btnAcrilicas.addEventListener('click', ()=>{
        limpiarHtml(contenedorDiseños);
        acrilicas.forEach(acrilicas=> contenedorDiseños.appendChild(acrilicas));
    });
    btnTodos.addEventListener('click',()=>{
        limpiarHtml(contenedorDiseños);
        todos.forEach(todo=>contenedorDiseños.appendChild(todo));
    });
}

const limpiarHtml = (contenedor) =>{
    while(contenedor.firstChild){
        contenedor.removeChild(contenedor.firstChild);
    }
}