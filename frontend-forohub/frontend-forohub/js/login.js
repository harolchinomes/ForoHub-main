const URL_LOGIN = 'http://localhost:8080/auth/login';
const formularioLogin = document.querySelector('#formulario-login');

if (formularioLogin) {
    formularioLogin.addEventListener('submit', function (e) {
        e.preventDefault();
        const correo = document.querySelector('#correo').value;
        const contrasena = document.querySelector('#contrasena').value;

        if (correo === '' || contrasena === '') {
            console.log('Por favor, complete todos los campos.');
            return;
        }

        fetch(URL_LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ 
                correo: correo, 
                contrasena: contrasena 
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ocurrió un problema al iniciar sesión. Verifique sus datos.');
            }
            return response.json();
        })
        .then(data => {
            document.cookie = `jwt=${data.JWTtoken}; path=/; secure`;
            window.location.href = 'principal.html';
        })
        .catch(error => console.error('Error al procesar la solicitud:', error));
    });
}
