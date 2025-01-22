const listaTopicos = document.querySelector('#topic-list');
const listaTopicosUser = document.querySelector('#topic-list-user');
const crearTopicoForm = document.querySelector('#crear-topico-form');
const listaCursos = document.querySelector('#curso-select');
const nombreUsuario = document.querySelector('#nombre-usuario');
const jwt = getCookie('jwt');

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
                window.location.href = `topicos.html/id=${topico.id}`;
            });
            
            listaTopicos.appendChild(li);
        });
    }).catch(error => console.error('Error:', error));
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
    }).catch(error => console.error('Error:', error));
}