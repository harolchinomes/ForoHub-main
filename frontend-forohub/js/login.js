const URL_LOGIN = 'http://localhost:8080/auth/login';
const formularioLogin = document.querySelector('#login-form');

if (formularioLogin) {
    formularioLogin.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;

        if (email === '' || password === '') {
            console.log('Todos los campos son obligatorios');
            return;
        }

        fetch(URL_LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ 
                correo: email, 
                contrasena: password 
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            
            // El JWT se almacena en una cookie HttpOnly desde el servidor
            // Almacenar el JWT en una cookie
            document.cookie = `jwt=${data.JWTtoken}; path=/; secure`;
            // Almacenar el JWT en localStorage
            // localStorage.setItem('jwt', data.JWTtoken);
            window.location.href = 'principal.html';
        })
        .catch(error => console.error('Error:', error));
    });
}