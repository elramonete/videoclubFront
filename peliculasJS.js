function irAFormulario() {
    window.location.href = 'formularioPelis.html';
}
const AUTH_URL = 'http://localhost:8020/auth';  // Ajusta la URL de tu backend
const MOVIES_URL = 'http://localhost:8090/api/pelicula';  // URL para registrar películas

// Elementos del DOM
const loginFormContainer = document.getElementById('loginFormContainer');
const registroUsuarioFormContainer = document.getElementById('registroUsuarioFormContainer');
const formRegistrarPelicula = document.getElementById('formRegistrarPelicula');
const logoutButtonContainer = document.getElementById('logoutButtonContainer');

// Formularios
const loginUsuarioForm = document.getElementById('loginUsuarioForm');
const registroUsuarioForm = document.getElementById('registroUsuarioForm');
const registroPeliculaForm = document.getElementById('registroPeliculaForm');

// Función para mostrar u ocultar formularios
function toggleForms(showLogin = true) {
    if (showLogin) {
        loginFormContainer.style.display = 'block';
        registroUsuarioFormContainer.style.display = 'none';
        formRegistrarPelicula.style.display = 'none';
        logoutButtonContainer.style.display = 'none';
    } else {
        loginFormContainer.style.display = 'none';
        registroUsuarioFormContainer.style.display = 'none';
        formRegistrarPelicula.style.display = 'none';
        logoutButtonContainer.style.display = 'none';
    }
}

// Mostrar el formulario de login o de registro
document.getElementById('irARegistro').addEventListener('click', (event) => {
    event.preventDefault();
    loginFormContainer.style.display = 'none';
    registroUsuarioFormContainer.style.display = 'block';
});

document.getElementById('irALogin').addEventListener('click', (event) => {
    event.preventDefault();
    registroUsuarioFormContainer.style.display = 'none';
    loginFormContainer.style.display = 'block';
});

// Función para manejar el registro de usuario
registroUsuarioForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch(`${AUTH_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
        alert('Usuario registrado con éxito!');
        loginFormContainer.style.display = 'block'; // Mostrar formulario de login
        registroUsuarioFormContainer.style.display = 'none'; // Ocultar formulario de registro
    } else {
        alert('Error al registrar el usuario.');
    }
});

// Función para manejar el login
loginUsuarioForm.addEventListener('submit', async (event) => 
    {
        event.preventDefault();
        const loginEmail = document.getElementById('loginEmail').value;
        const loginPassword = document.getElementById('loginPassword').value;
    
        const response = await fetch(`${AUTH_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: loginEmail, password: loginPassword }),
        });
    
        if (response.ok) {
            const data = await response.json();
            const token = data.token;
    
            // Guardar el token en localStorage
            localStorage.setItem('jwt_token', token);
    
            // Mostrar el formulario para registrar películas
            formRegistrarPelicula.style.display = 'block';
            loginFormContainer.style.display = 'none';
            logoutButtonContainer.style.display = 'block';
            //toggleForms(false);
        } else {
            alert('Error al iniciar sesión.');
        }
    });


// Función para manejar el logout (cerrar sesión)
document.getElementById('btnLogout').addEventListener('click', () => {
    // Eliminar el token del localStorage
    localStorage.removeItem('jwt_token');

    // Ocultar el formulario de registrar película
    formRegistrarPelicula.style.display = 'none';
    logoutButtonContainer.style.display = 'none';  // Ocultar el botón de logout

    // Volver a mostrar el formulario de login
    toggleForms(true);
});    

// Función para manejar el registro de una película
registroPeliculaForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Obtener el token de localStorage
    const token = localStorage.getItem('jwt_token');

    if (!token) {
        alert('Por favor, inicie sesión antes de registrar una película.');
        return;
    }

    // Obtener los datos de la película desde el formulario
    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;
    const genero = document.getElementById('genero').value;

    // Enviar la solicitud al backend para registrar la película
    const response = await fetch(MOVIES_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
           // 'Authorization': `Bearer ${token}` // Agregar el token al encabezado Authorization
        },
        body: JSON.stringify({ titulo, autor, genero }),
    });

    if (response.ok) {
        alert('Película registrada con éxito!');
        // Limpiar el formulario
        registroPeliculaForm.reset();
    } else {
        alert('Error al registrar la película.');
    }
});