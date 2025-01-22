// Elementos del DOM
const listaTopicos = document.querySelector('#lista-topicos');
const listaTopicosUsuario = document.querySelector('#lista-topicos-usuario');
const formularioCrearTopico = document.querySelector('#formulario-crear-topico');
const listaCursos = document.querySelector('#lista-cursos');
const nombreUsuario = document.querySelector('#nombre-usuario');

// Obtiene el JWT de las cookies
const jwt = obtenerCookie('jwt');

/**
 * Función para obtener una cookie por su nombre.
 * @param {string} nombre Nombre de la cookie.
 * @returns {string | null} Valor de la cookie o null si no existe.
 */
function obtenerCookie(nombre) {
    let cookieArray = document.cookie.split(";");
    for (let i = 0; i < cookieArray.length; i++) {
        let cookiePair = cookieArray[i].split("=");
        if (nombre == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}

// Cargar los tópicos en la lista si el elemento existe
if (listaTopicos) {
    fetch('http://localhost:8080/topicos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los tópicos.');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            data.content.forEach(topico => {
                // Crear un elemento de lista para cada tópico
                const li = document.createElement('li');
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

                // Botón para ver más detalles del tópico
                const botonVer = li.querySelector('button');
                botonVer.addEventListener('click', function () {
                    window.location.href = `topicos.html/id=${topico.id}`;
                });

                listaTopicos.appendChild(li);
            });
        })
        .catch(error => console.error('Error al cargar los tópicos:', error));
}

// Cargar la lista de cursos si el elemento existe
if (listaCursos) {
    fetch('http://localhost:8080/cursos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener la lista de cursos.');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            data._embedded.datosListadoCursoList.forEach(curso => {
                const opcion = document.createElement('option');
                opcion.value = curso.id;
                opcion.textContent = `${curso.nombre} (${curso.categoria})`;
                listaCursos.appendChild(opcion);
            });
        })
        .catch(error => console.error('Error al cargar los cursos:', error));
}

// Enviar el formulario para crear un nuevo tópico
if (formularioCrearTopico) {
    formularioCrearTopico.addEventListener('submit', function (e) {
        e.preventDefault();

        // Obtener los datos del formulario
        const titulo = document.querySelector('#titulo').value;
        const descripcion = document.querySelector('#descripcion').value;
        const cursoId = document.querySelector('#lista-cursos').value;
        const fechaCreacion = document.querySelector('#fecha-creacion').value;
        const autor = document.querySelector('#autor').value;

        // Validar los campos
        if (titulo === '' || descripcion === '' || cursoId === '') {
            console.log('Todos los campos son obligatorios.');
            return;
        }

        // Formatear la fecha para el envío al backend
        const fechaCreacionFormateada = new Date(fechaCreacion).toISOString();

        // Enviar los datos al backend
        fetch('http://localhost:8080/topicos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
            body: JSON.stringify({
                titulo: titulo,
                mensaje: descripcion,
                fechaCreacion: fechaCreacionFormateada,
                autor: autor,
                cursoId: cursoId,
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al crear el tópico.');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                window.location.href = 'principal.html';
            })
            .catch(error => console.error('Error al enviar el formulario:', error));
    });
}

// Mostrar el nombre del usuario autenticado si el elemento existe
if (nombreUsuario) {
    fetch('http://localhost:8080/usuario', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos del usuario.');
            }
            return response.json();
        })
        .then(data => {
            nombreUsuario.textContent = data.nombre;
        })
        .catch(error => console.error('Error al cargar el nombre del usuario:', error));
}