const formAgregar = document.querySelector('#formAgregarLibro');
let libros = [];

// Funciones
async function traerLibros() {
  const data = await fetch('http://localhost:3000/api/libros');
  let tbody = document.querySelector('tbody');
  libros = await data.json();
  tbody.innerHTML = "";
  libros.forEach((l, i) => {
    tbody.innerHTML += `
          <tr>
            <td>${l.id}</td>
            <td>${l.titulo}</td>
            <td>${l.descripcion}</td>
            <td>
              <button class="btn btn-warning" onclick="prepararCancion(${i},'${l.id}')">Editar</button>
              <button class="btn btn-danger" onclick="eliminarCancion(${i},'${l.id}')">Eliminar</button>
            </td>
          </tr>
        `;
  });
}

// Eventos
formAgregar.addEventListener('submit', async () => {
  let titulo = document.querySelector('#inputTitulo').value.trim();
  let descripcion = document.querySelector('#inputDescripcion').value.trim();
  const response = await fetch('http://localhost:3000/api/libros', {
    method: 'POST',
    body: JSON.stringify({
      titulo,
      descripcion,
    }),
  });
});

traerLibros();