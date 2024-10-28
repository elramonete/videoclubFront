window.onload = function() {
    listarPeliculas();
}

let listarPeliculas = async () => {
    console.log("listar pelis");

    try {
        const peticion = await fetch("http://localhost:8090/api/peliculas", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!peticion.ok) {
            throw new Error(`Error en la petición: ${peticion.status}`);
        }

        const peliculas = await peticion.json();
        console.log("Petición exitosa:", peliculas);

        let contenidoTabla = "";
        for (let pelicula of peliculas) {
            let contenidoFila = `
                <tr>
                    <td>${pelicula.id}</td>
                    <td>${pelicula.titulo}</td>
                    <td>${pelicula.autor}</td>
                    <td>${pelicula.genero}</td>
                    <td>
                        <i onClick="editarPelicula(${pelicula.id})" class="material-icons button edit">edit</i>
                        <i onClick="borrarPelicula(${pelicula.id})" class="material-icons button delete">delete</i>
                    </td>
                </tr>`;
            contenidoTabla += contenidoFila;
        }

        document.querySelector("#tabla tbody").innerHTML = contenidoTabla;

    } catch (error) {
        console.error("Error al listar las películas:", error);
    }
    console.log("Fin de la petición.");
}

let borrarPelicula = async (id) => {
    console.log("borrar pelis");

    try {
        const peticion = await fetch(`http://localhost:8090/api/pelicula/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!peticion.ok) {
            throw new Error(`Error en la petición: ${peticion.status}`);
        }

        listarPeliculas();

        
    } catch (error) {
        console.error("Error al borrar la película:", error);
    }
}

let idEditar;

let editarPelicula = async (id) => {
    console.log("editar pelis");
    mostrarFormulario();
    idEditar = id;

    const peticion = await fetch(`http://localhost:8090/api/pelicula/${id}`, {
        
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    const pelicula = await peticion.json();

    document.getElementById("titulo").value = pelicula.titulo;
    document.getElementById("autor").value = pelicula.autor;
    document.getElementById("genero").value = pelicula.genero;

       
    let btnModificar = document.getElementById("btnModificar");
    
}

btnModificar.addEventListener("click", evento =>{
    aplicarActualizacion(idEditar);
})



let aplicarActualizacion = async (id) => {
    console.log("actualizar pelis");
    let campos = {};
    campos.id = id;

    campos.titulo = document.getElementById("titulo").value;
    campos.autor = document.getElementById("autor").value;
    campos.genero =document.getElementById("genero").value;

    const peticion = await fetch(`http://localhost:8090/api/peliculas`, {
        
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(campos)
    });

    listarPeliculas();

}

function mostrarFormulario(){
    let formulario = document.getElementById("formulario").style.visibility="visible";
}

function volverAPeliculas() {
    window.location.href = 'peliculas.html';
}