const URL_LOGIN = 'http://localhost:8080/auth/login';
const formularioLogin = document.querySelector('#login-form');
const listaTopicos = document.querySelector('#topic-list');
const listaTopicosUser = document.querySelector('#topic-list-user');
const crearTopicoForm = document.querySelector('#crear-topico-form');
const listaCursos = document.querySelector('#curso-select');
const nombreUsuario = document.querySelector('#nombre-usuario');
const topicoDetalle = document.querySelector('#topic-details');
const listaRespuestaPorTopico = document.querySelector('#question-list');
const agregarRespuesta = document.querySelector("#question-form");
const listadoCursos = document.querySelector('#curso-list');
const jwt = getCookie('jwt');
const crearCursoForm = document.querySelector('#crear-curso-form');

function getCookie(name) {
    let cookieArr = document.cookie.split(";");
    for(let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");
        if(name == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}

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

if(listaTopicos){
    fetch('http://localhost:8080/topicos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(data => {
        console.log(data);
        data.content.forEach(topico => {
            const li = document.createElement('li');
            li.classList.add('list-group-item', 'mb-3'); // Añadido 'mb-3' para el espacio entre elementos
            li.innerHTML = `
                <div>
                    <h5>${topico.titulo}</h5>
                    <p><strong>Autor:</strong> ${topico.autor}</p>
                    <p><strong>Curso:</strong> ${topico.cursoNombre} (${topico.cursoCategoria})</p>
                    <p><strong>Fecha de Creación:</strong> ${new Date(topico.fechaCreacion).toLocaleDateString()}</p>
                    <p>${topico.mensaje}</p>
                </div>
                <button class="btn btn-primary mt-2">Ver</button> <!-- Añadido 'mt-2' para el margen superior -->
            `;

            const viewButton = li.querySelector('button');
            viewButton.addEventListener('click', function(){
                window.location.href = `topico-detalle.html?id=${topico.id}`;
            });
            
            listaTopicos.appendChild(li);
        });
    }).catch(error => console.error('Error:', error));
}

if(listaTopicosUser){
    fetch('http://localhost:8080/topicos/usuario', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(data => {
        console.log(data);
        data.content.forEach(topico => {
            const li = document.createElement('li');
            li.classList.add('list-group-item', 'mb-3'); // Añadido 'mb-3' para el espacio entre elementos
            li.innerHTML = `
                <div>
                    <h5>${topico.titulo}</h5>
                    <p><strong>Autor:</strong> ${topico.autor}</p>
                    <p><strong>Curso:</strong> ${topico.cursoNombre} (${topico.cursoCategoria})</p>
                    <p><strong>Fecha de Creación:</strong> ${new Date(topico.fechaCreacion).toLocaleDateString()}</p>
                    <p>${topico.mensaje}</p>
                </div>
                <button class="btn btn-primary mt-2">Ver</button> <!-- Añadido 'mt-2' para el margen superior -->
            `;

            const viewButton = li.querySelector('button');
            viewButton.addEventListener('click', function(){
                window.location.href = `topico-detalle.html?id=${topico.id}`;
            });
            
            listaTopicosUser.appendChild(li);
        });
    })
}

if(topicoDetalle){
    const id = new URLSearchParams(window.location.search).get('id');
    fetch('http://localhost:8080/topicos/' + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        }
    }).then(respose => {
        if (!respose.ok) {
            throw new Error('Network response was not ok');
        }
        return respose.json();
    }).then(data => {
        console.log(data);
        topicoDetalle.innerHTML = `
            <h1>${data.titulo}</h1>
            <p><strong>Autor:</strong> ${data.autor}</p>
            <p><strong>Curso:</strong> ${data.cursoNombre} (${data.cursoCategoria})</p>
            <p><strong>Fecha de Creación:</strong> ${new Date(data.fechaCreacion).toLocaleDateString()}</p>
            <p>${data.mensaje}</p>
        `;
        
    })
}

if(listaCursos){
    fetch('http://localhost:8080/cursos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(data => {
        console.log(data);

        data._embedded.datosListadoCursoList.forEach(curso => {
            const option = document.createElement('option');
            option.value = curso.id;
            option.textContent = `${curso.nombre} (${curso.categoria})`;
            listaCursos.appendChild(option);
        });
    })
}

if(crearTopicoForm){
    crearTopicoForm.addEventListener('submit', function(e){
        e.preventDefault();
        const titulo = document.querySelector('#titulo').value;
        const descripcion = document.querySelector('#descripcion').value;
        const cursoId = document.querySelector('#curso-select').value;
        const fechaCreacion = document.querySelector('#fechaCreacion').value;
        const autor = document.querySelector('#autor').value;

        if (titulo === '' || descripcion === '' || cursoId === '') {
            console.log('Todos los campos son obligatorios');
            return;
        }

        // Formatear la fecha correctamente
        const fechaCreacionFormatted = new Date(fechaCreacion).toISOString();
        
        fetch('http://localhost:8080/topicos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
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
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(data => {
            console.log(data);
            window.location.href = 'principal.html';
        }).catch(error => console.error('Error:', error));
    })
}

if(nombreUsuario){
    fetch('http://localhost:8080/usuario', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(data => {
        nombreUsuario.textContent = data.nombre;
        nombreUsuario.setAttribute('data-usuario-id', data.id);
    }).catch(error => console.error('Error:', error));
}

if(listaRespuestaPorTopico){
    id = new URLSearchParams(window.location.search).get('id');
    fetch('http://localhost:8080/respuestas/topico/' + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        }
    }).then( response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(data => {
        console.log(data);
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
                    method: 'PUT',
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
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                }).then(data => {
                    respuesta.solucion = nuevaSolucion;
                    solucionBtn.textContent = nuevaSolucion ? 'Marcar como No Solucionado' : 'Marcar como Solucionado';
                    li.querySelector('p:nth-child(4)').textContent = `Solución: ${nuevaSolucion ? 'Sí' : ''}`;
                }).catch(error => console.error('Error:', error));
            });

            // Verificar si el usuario actual es el creador del tópico
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

if(agregarRespuesta){
    agregarRespuesta.addEventListener('submit', function(e){
        e.preventDefault();
        const mensaje = document.querySelector('#question-input').value;
        const topicoId = new URLSearchParams(window.location.search).get('id');
        if (mensaje === '') {
            console.log('Todos los campos son obligatorios');
            return;
        }
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
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(data => {
            //console.log(data);
            window.location.href = `topico-detalle.html?id=${topicoId}`;
        }).catch(error => console.error('Error:', error));
    })
}

if(listadoCursos){
    fetch('http://localhost:8080/cursos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(data => {
        //console.log(data);
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
if(crearCursoForm) {
    crearCursoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const nombre = document.querySelector('#titulo').value;
        const categoria = document.querySelector('#categoria-select').value;

        if (nombre === '' || categoria === '') {
            console.log('Todos los campos son obligatorios');
            return;
        }

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
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(data => {
            console.log(data);
            window.location.href = 'curso.html';
        }).catch(error => console.error('Error:', error));
    });
}