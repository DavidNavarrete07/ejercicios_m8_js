const formAgregar = document.querySelector('#formAgregarAutor');
let autores = [];

// Funciones
async function traerAutores(){
      const data = await fetch('http://localhost:3000/api/autores');
      let tbody = document.querySelector('tbody');
      autores = await data.json();
      tbody.innerHTML = "";
        autores.forEach((a, i) => {
          tbody.innerHTML += `
          <tr>
            <td>${a.id}</td>
            <td>${a.primerNombre}</td>
            <td>${a.apellido}</td>
            <td>${a.notas}</td>
            <td>
              <button class="btn btn-warning" onclick="prepararCancion(${i},'${a.id
            }')">Editar</button>
              <button class="btn btn-danger" onclick="eliminarCancion(${i},'${a.id
            }')">Eliminar</button>
            </td>
          </tr>
        `;
        });
}

// Eventos
formAgregar.addEventListener('submit', async () => {
    let primerNombre = document.querySelector('#inputPrimerNombre').value.trim();
    let apellido = document.querySelector('#inputApellido').value.trim();
    let notas = document.querySelector('#inputNotas').value.trim();
    const response = await fetch('http://localhost:3000/api/autores', {
        method: 'POST', 
        body: JSON.stringify({
            primerNombre, 
            apellido,
            notas,
        }),
    });
});

traerAutores();