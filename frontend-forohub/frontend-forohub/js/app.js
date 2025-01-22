// Definir las constantes con los elementos y URLs
const URL_LOGIN = 'http://localhost:8080/auth/login'; // URL para el login
const formularioLogin = document.querySelector('#login-form'); // Formulario de login
const listaTopicos = document.querySelector('#topic-list'); // Lista de tópicos
const listaTopicosUser = document.querySelector('#topic-list-user'); // Lista de tópicos del usuario
const crearTopicoForm = document.querySelector('#crear-topico-form'); // Formulario para crear un tópico
const listaCursos = document.querySelector('#curso-select'); // Lista de cursos
const nombreUsuario = document.querySelector('#nombre-usuario'); // Nombre del usuario
const topicoDetalle = document.querySelector('#topic-details'); // Detalles del tópico
const listaRespuestaPorTopico = document.querySelector('#question-list'); // Lista de respuestas para un tópico
const agregarRespuesta = document.querySelector("#question-form"); // Formulario para agregar una respuesta
const listadoCursos = document.querySelector('#curso-list'); // Lista de cursos (para algún otro uso)
const jwt = getCookie('jwt'); // Obtener el token JWT de las cookies
const crearCursoForm = document.querySelector('#crear-curso-form'); // Formulario para crear un curso

// Función para obtener el valor de una cookie por su nombre
function getCookie(name) {
    let cookieArr = document.cookie.split(";"); // Dividir todas las cookies
    for(let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("="); // Separar nombre y valor
        if(name == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]); // Decodificar y devolver el valor de la cookie
        }
    }
    return null; // Si no se encuentra la cookie, devolver null
}

// Manejo del formulario de login
if (formularioLogin) {
    formularioLogin.addEventListener('submit', function (e) {
        e.preventDefault(); // Evitar que la página se recargue
        const email = document.querySelector('#email').value; // Obtener el email ingresado
        const password = document.querySelector('#password').value; // Obtener la contraseña ingresada

        // Validación de campos vacíos
        if (email === '' || password === '') {
            console.log('Todos los campos son obligatorios');
            return;
        }

        // Hacer una petición POST al servidor para hacer login
        fetch(URL_LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include', // Incluir las credenciales (cookies)
            body: JSON.stringify({ 
                correo: email, 
                contrasena: password 
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('La respuesta de la red no fue correcta');
            }
            return response.json();
        })
        .then(data => {
            // Guardar el JWT en las cookies
            document.cookie = `jwt=${data.JWTtoken}; path=/; secure`;
            window.location.href = 'principal.html'; // Redirigir a la página principal
        })
        .catch(error => console.error('Error:', error));
    });
}

// Cargar los tópicos disponibles desde el backend
if(listaTopicos){
    fetch('http://localhost:8080/topicos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}` // Incluir el token JWT en los headers
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error('La respuesta de la red no fue correcta');
        }
        return response.json();
    }).then(data => {
        console.log(data);
        // Mostrar los tópicos en el DOM
        data.content.forEach(topico => {
            const li = document.createElement('li'); // Crear un nuevo elemento <li>
            li.classList.add('list-group-item', 'mb-3'); // Añadir clases para estilo
            li.innerHTML = `
                <div>
                    <h5>${topico.titulo}</h5>
                    <p><strong>Autor:</strong> ${topico.autor}</p>
                    <p><strong>Curso:</strong> ${topico.cursoNombre} (${topico.cursoCategoria})</p>
                    <p><strong>Fecha de Creación:</strong> ${new Date(topico.fechaCreacion).toLocaleDateString()}</p>
                    <p>${topico.mensaje}</p>
                </div>
                <button class="btn btn-primary mt-2">Ver</button> <!-- Botón para ver el tópico -->
            `;

            const viewButton = li.querySelector('button');
            viewButton.addEventListener('click', function(){
                window.location.href = `topico-detalle.html?id=${topico.id}`; // Redirigir a los detalles del tópico
            });
            
            listaTopicos.appendChild(li); // Agregar el tópico a la lista
        });
    }).catch(error => console.error('Error:', error));
}

// Cargar los tópicos del usuario
if(listaTopicosUser){
    fetch('http://localhost:8080/topicos/usuario', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}` // Incluir el token JWT en los headers
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error('La respuesta de la red no fue correcta');
        }
        return response.json();
    }).then(data => {
        console.log(data);
        // Mostrar los tópicos del usuario
        data.content.forEach(topico => {
            const li = document.createElement('li'); // Crear un nuevo <li> para cada tópico
            li.classList.add('list-group-item', 'mb-3');
            li.innerHTML = `
                <div>
                    <h5>${topico.titulo}</h5>
                    <p><strong>Autor:</strong> ${topico.autor}</p>
                    <p><strong>Curso:</strong> ${topico.cursoNombre} (${topico.cursoCategoria})</p>
                    <p><strong>Fecha de Creación:</strong> ${new Date(topico.fechaCreacion).toLocaleDateString()}</p>
                    <p>${topico.mensaje}</p>
                </div>
                <button class="btn btn-primary mt-2">Ver</button>
            `;

            const viewButton = li.querySelector('button');
            viewButton.addEventListener('click', function(){
                window.location.href = `topico-detalle.html?id=${topico.id}`;
            });
            
            listaTopicosUser.appendChild(li); // Agregar a la lista de tópicos del usuario
        });
    })
}

// Mostrar los detalles de un tópico específico
if(topicoDetalle){
    const id = new URLSearchParams(window.location.search).get('id'); // Obtener el ID del tópico desde la URL
    fetch('http://localhost:8080/topicos/' + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}` // Incluir el token JWT en los headers
        }
    }).then(respose => {
        if (!respose.ok) {
            throw new Error('La respuesta de la red no fue correcta');
        }
        return respose.json();
    }).then(data => {
        // Mostrar los detalles del tópico
        topicoDetalle.innerHTML = `
            <h1>${data.titulo}</h1>
            <p><strong>Autor:</strong> ${data.autor}</p>
            <p><strong>Curso:</strong> ${data.cursoNombre} (${data.cursoCategoria})</p>
            <p><strong>Fecha de Creación:</strong> ${new Date(data.fechaCreacion).toLocaleDateString()}</p>
            <p>${data.mensaje}</p>
        `;
    })
}

// Cargar los cursos disponibles
if(listaCursos){
    fetch('http://localhost:8080/cursos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}` // Incluir el token JWT en los headers
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error('La respuesta de la red no fue correcta');
        }
        return response.json();
    }).then(data => {
        console.log(data);
        // Mostrar los cursos en el <select>
        data._embedded.datosListadoCursoList.forEach(curso => {
            const option = document.createElement('option'); // Crear un nuevo <option>
            option.value = curso.id;
            option.textContent = `${curso.nombre} (${curso.categoria})`; // Mostrar el nombre y la categoría del curso
            listaCursos.appendChild(option); // Añadir el curso a la lista de cursos
        });
    })
}

// Manejar la creación de un nuevo tópico
if(crearTopicoForm){
    crearTopicoForm.addEventListener('submit', function(e){
        e.preventDefault(); // Prevenir que la página se recargue
        const titulo = document.querySelector('#titulo').value; // Obtener el título del tópico
        const descripcion = document.querySelector('#descripcion').value; // Obtener la descripción
        const cursoId = document.querySelector('#curso-select').value; // Obtener el ID del curso
        const fechaCreacion = document.querySelector('#fechaCreacion').value; // Obtener la fecha de creación
        const autor = document.querySelector('#autor').value; // Obtener el autor

        // Validación de campos vacíos
        if (titulo === '' || descripcion === '' || cursoId === '') {
            console.log('Todos los campos son obligatorios');
            return;
        }

        // Formatear la fecha de creación en formato ISO
        const fechaCreacionFormatted = new Date(fechaCreacion).toISOString();
        
        // Hacer la petición POST para crear el nuevo tópico
        fetch('http://localhost:8080/topicos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}` // Incluir el token JWT
            },
            body: JSON.stringify({ 
                titulo: titulo, 
                mensaje: descripcion,
                fechaCreacion: fechaCreacionFormatted,
                autor: autor,
                cursoId: cursoId
            })
        }).then(response => {
            if (!response.ok) {
                throw new Error('La respuesta de la red no fue correcta');
            }
            return response.json();
        }).then(data => {
            console.log(data);
            window.location.href = 'principal.html'; // Redirigir a la página principal
        }).catch(error => console.error('Error:', error));
    })
}

// Verificamos si el elemento 'nombreUsuario' existe en la página
if (nombreUsuario) {
    // Hacemos una solicitud GET al backend para obtener los datos del usuario
    fetch('http://localhost:8080/usuario', {
        method: 'GET', // Método de la solicitud: GET
        headers: {
            'Content-Type': 'application/json', // Indicamos que la respuesta será en formato JSON
            'Authorization': `Bearer ${jwt}` // Añadimos el token JWT a los encabezados para la autorización
        }
    }).then(response => {
        // Si la respuesta no es satisfactoria (por ejemplo, código de estado 4xx o 5xx), lanzamos un error
        if (!response.ok) {
            throw new Error('La respuesta de la red no fue correcta'); // Error en español
        }
        return response.json(); // Parseamos la respuesta a formato JSON
    }).then(data => {
        // Si la solicitud es exitosa, mostramos el nombre del usuario y su ID
        nombreUsuario.textContent = data.nombre;
        nombreUsuario.setAttribute('data-usuario-id', data.id); // Guardamos el ID del usuario en un atributo del elemento
    }).catch(error => console.error('Error:', error)); // Si hay un error, lo mostramos en la consola
}

// Verificamos si el contenedor 'listaRespuestaPorTopico' existe en la página
if (listaRespuestaPorTopico) {
    // Obtenemos el ID del tópico desde los parámetros de la URL
    id = new URLSearchParams(window.location.search).get('id');

    // Hacemos una solicitud GET al backend para obtener las respuestas del tópico
    fetch('http://localhost:8080/respuestas/topico/' + id, {
        method: 'GET', // Método de la solicitud: GET
        headers: {
            'Content-Type': 'application/json', // Indicamos que la respuesta será en formato JSON
            'Authorization': `Bearer ${jwt}` // Añadimos el token JWT a los encabezados para la autorización
        }
    }).then(response => {
        // Si la respuesta no es satisfactoria, lanzamos un error
        if (!response.ok) {
            throw new Error('La respuesta de la red no fue correcta'); // Error en español
        }
        return response.json(); // Parseamos la respuesta a formato JSON
    }).then(data => {
        console.log(data); // Mostramos los datos obtenidos
        // Iteramos sobre las respuestas del tópico
        data.content.forEach(respuesta => {
            const li = document.createElement('li');
            li.classList.add('list-group-item', 'mb-3'); // Añadido 'mb-3' para el espacio entre elementos
            li.innerHTML = `
                <div>
                    <p><strong>Autor:</strong> ${respuesta.autorNombre}</p>
                    <p><strong>Fecha de Creación:</strong> ${new Date(respuesta.fechaCreacion).toLocaleDateString()}</p>
                    <p>${respuesta.mensaje}</p>
                    <p id="solucion" style="display: none;">Solución: ${respuesta.solucion ? 'Sí' : ''}</p>
                    <button class="btn btn-secondary btn-sm solucion-btn" style="display: none;" data-autor-id="${respuesta.autorId}">${respuesta.solucion ? 'Marcar como No Solucionado' : 'Marcar como Solucionado'}</button>
                </div>
            `;

            const solucionBtn = li.querySelector('.solucion-btn');
            solucionBtn.addEventListener('click', function() {
                const nuevaSolucion = !respuesta.solucion;
                fetch(`http://localhost:8080/respuestas`, {
                    method: 'PUT', // Método de la solicitud: PUT
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${jwt}`
                    },
                    body: JSON.stringify({ 
                        id: respuesta.id,
                        solucion: nuevaSolucion 
                    })
                }).then(response => {
                    if (!response.ok) {
                        throw new Error('La respuesta de la red no fue correcta'); // Error en español
                    }
                    return response.json(); // Parseamos la respuesta a formato JSON
                }).then(data => {
                    // Actualizamos el estado de la solución y el texto del botón
                    respuesta.solucion = nuevaSolucion;
                    solucionBtn.textContent = nuevaSolucion ? 'Marcar como No Solucionado' : 'Marcar como Solucionado';
                    li.querySelector('p:nth-child(4)').textContent = `Solución: ${nuevaSolucion ? 'Sí' : ''}`;
                }).catch(error => console.error('Error:', error)); // Si hay un error, lo mostramos en la consola
            });

            // Verificamos si el usuario actual es el creador del tópico
            const usuarioId = document.querySelector('#nombre-usuario').getAttribute('data-usuario-id');
            const solucion = li.querySelector('#solucion');
            if (usuarioId !== respuesta.autorId) {
                solucionBtn.style.display = 'block';
                solucion.style.display = 'block';
            }
            listaRespuestaPorTopico.appendChild(li);
        });
    })
}

// Verificamos si el formulario para agregar respuestas existe en la página
if (agregarRespuesta) {
    // Manejamos el evento de envío del formulario
    agregarRespuesta.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevenimos el comportamiento por defecto del formulario
        const mensaje = document.querySelector('#question-input').value;
        const topicoId = new URLSearchParams(window.location.search).get('id');
        
        // Verificamos si el mensaje está vacío
        if (mensaje === '') {
            console.log('Todos los campos son obligatorios');
            return;
        }
        
        // Hacemos una solicitud POST para agregar la respuesta
        fetch('http://localhost:8080/respuestas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
            body: JSON.stringify({ 
                mensaje: mensaje, 
                topicoId: topicoId,
                fechaCreacion: new Date().toISOString(),
                solucion: false
            })
        }).then(response => {
            if (!response.ok) {
                throw new Error('La respuesta de la red no fue correcta'); // Error en español
            }
            return response.json();
        }).then(data => {
            // Redirigimos al detalle del tópico
            window.location.href = `topico-detalle.html?id=${topicoId}`;
        }).catch(error => console.error('Error:', error)); // Si hay un error, lo mostramos en la consola
    })
}

// Verificamos si el contenedor para mostrar los cursos existe
if (listadoCursos) {
    // Hacemos una solicitud GET al backend para obtener la lista de cursos
    fetch('http://localhost:8080/cursos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error('La respuesta de la red no fue correcta'); // Error en español
        }
        return response.json();
    }).then(data => {
        // Iteramos sobre los cursos y los mostramos en la página
        data._embedded.datosListadoCursoList.forEach(curso => {
            const li = document.createElement('li');
            li.classList.add('list-group-item', 'mb-3'); // Añadido 'mb-3' para el espacio entre elementos
            li.innerHTML = `
                <div>
                    <h5>${curso.nombre}</h5>
                    <p><strong>Categoría:</strong> ${curso.categoria}</p>
                </div>
            `;
            listadoCursos.appendChild(li);
        });
    })
}

// Verificamos si el formulario para crear un curso existe
if (crearCursoForm) {
    // Manejamos el evento de envío del formulario para crear un curso
    crearCursoForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevenimos el comportamiento por defecto del formulario
        const nombre = document.querySelector('#titulo').value;
        const categoria = document.querySelector('#categoria-select').value;

        // Verificamos si los campos están vacíos
        if (nombre === '' || categoria === '') {
            console.log('Todos los campos son obligatorios');
            return;
        }

        // Hacemos una solicitud POST para crear el curso
        fetch('http://localhost:8080/cursos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
            body: JSON.stringify({ 
                nombre: nombre, 
                categoria: categoria 
            })
        }).then(response => {
            if (!response.ok) {
                throw new Error('La respuesta de la red no fue correcta'); // Error en español
            }
            return response.json();
        }).then(data => {
            // Redirigimos al listado de cursos
            window.location.href = 'listado-cursos.html';
        }).catch(error => console.error('Error:', error)); // Si hay un error, lo mostramos en la consola
    })
}
