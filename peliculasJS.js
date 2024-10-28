document.addEventListener("DOMContentLoaded", () => {
    console.log("El archivo peliculasJs.js se ha cargado correctamente.");
    let form = document.getElementById("registroForm"); // Acceder al formulario
    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevenir el comportamiento de envío del formulario
        console.log("Evento submit detectado");
        registrarPelicula(); // Llamar a la función de registro
    });
});
let registrarPelicula = async () => {
    console.log("registrarPelicula.");
    // Obtener valores de los campos
    let campos = {
        titulo: document.getElementById("titulo").value,
        autor: document.getElementById("autor").value,
        genero: document.getElementById("genero").value
    };
    console.log("Campos a registrar:", campos);
    try {
        // Hacer la petición POST al servidor
        const respuesta = await fetch("http://localhost:8090/api/peliculas", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(campos)
        });
        if (!respuesta.ok) {
            throw new Error(`Error en la petición: ${respuesta.status}`);
        }
        const datos = await respuesta.json();
        console.log("Petición exitosa:", datos);
    } catch (error) {
        console.error("Error al registrar la película:", error);
    }
    console.log("Fin de la petición.");
};

function irAFormulario() {
    window.location.href = 'formularioPelis.html';
}