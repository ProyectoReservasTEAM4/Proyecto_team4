let pagina = 1;
let carrito = [];
const siguiente = document.getElementById('btnSiguiente');
const anterior = document.getElementById('btnAnterior');


const cargarPeliculas = async () => {
    try {

        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=fcf3b46004b36ac8884ab89fab7a6b0c&language=es-MX&page=${pagina}`);
        console.log(response)
        const card = document.getElementById('row-container')

        if(!response.ok){
            throw new Error('Error en la llamada a la API')
        }else{
            console.log('Todo bien')
            const datos = await response.json()
            card.innerHTML = "";
           
                    datos.results.forEach(pelicula => {
            const col = document.createElement('div');
            col.classList.add("col-12", "col-sm-6", "col-md-3", "mb-4"); 

            const poster = pelicula.poster_path 
                ? `https://image.tmdb.org/t/p/w500${pelicula.poster_path}` 
                : "https://via.placeholder.com/500x750?text=Sin+imagen";

            col.innerHTML = `
                <div class="card h-100 shadow-sm">
                <img src="${poster}" class="card-img-top mb-3" alt="${pelicula.title}">
                <div class="card-body">
                    <h5 class="card-title">${pelicula.title}</h5>
                    <p class="card-text">${pelicula.overview ? pelicula.overview.slice(0, 100) + "…" : "Sin descripción disponible."}</p>
                    <button class="btn btn-primary reservar-btn">
                    <i class="fa-solid fa-circle-info"></i> Reservar película
                    </button>
                </div>
                </div>
            `;

            const btn = col.querySelector('.reservar-btn');
            btn.addEventListener('click', () => {
                carrito.push(pelicula);
                actualizarCarrito();
            });

            card.appendChild(col);
            });


           
            
            
        }
        

    } catch (error) {
        console.log(error)
        
    }
  
}


//Funcionalidad de siguiente y atras
siguiente.addEventListener('click', () =>{

    if (pagina<1000) {

            pagina += 1
        cargarPeliculas();
        
    }
    

})

anterior.addEventListener('click', () =>{

    if (pagina>1) {

        pagina -= 1;
        cargarPeliculas();
        
    }
    

})


//Funcionalidad de carrito de compras
function actualizarCarrito() {
  const carritoBody = document.getElementById('carritoBody');
  const carritoCount = document.getElementById('carritoCount');


  carritoCount.textContent = carrito.length;

  if (carrito.length === 0) {
    carritoBody.innerHTML = `<p class="text-muted">No hay películas reservadas.</p>`;
    return;
  }

  carritoBody.innerHTML = "";
  carrito.forEach((pelicula, index) => {
    const item = document.createElement('div');
    item.className = "d-flex align-items-center mb-3 border-bottom pb-2";
    item.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w92${pelicula.poster_path}" class="me-3 rounded" alt="${pelicula.title}">
      <div class="flex-grow-1">
        <h6 class="mb-1">${pelicula.title}</h6>
        <small class="text-muted">${pelicula.overview ? pelicula.overview.slice(0, 60) + "…" : "Sin descripción."}</small>
      </div>
      <button class="btn btn-sm btn-danger ms-2" onclick="eliminarDelCarrito(${index})">
        <i class="fa-solid fa-trash"></i>
      </button>
    `;
    carritoBody.appendChild(item);
  });
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

// Inicializa el modal del carrito
document.getElementById('btnCarrito').addEventListener('click', () => {
  const carritoModal = new bootstrap.Modal(document.getElementById('carritoModal'));
  carritoModal.show();
});







cargarPeliculas();