// Array para almacenar las tareas como objetos
let tareas = [];

// Clase Tarea
class Tarea {
    constructor(titulo, descripcion, fechaLimite, prioridad, estado) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.fechaLimite = fechaLimite;
        this.prioridad = prioridad;
        this.estado = estado;
    }
}

// Función para agregar una nueva tarea al array y mostrarla en la tabla
function agregarTarea(tarea) {
    // Agregar tarea al array
    tareas.push(tarea);

    // Actualizar la tabla de tareas
    mostrarTareas();
}

// Función para mostrar las tareas en la tabla
function mostrarTareas() {
    const tableBody = document.getElementById('taskTableBody');
    tableBody.innerHTML = ''; // Limpiar la tabla antes de volver a llenarla

    tareas.forEach((tarea, index) => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${tarea.titulo}</td>
            <td>${tarea.descripcion}</td>
            <td>${tarea.fechaLimite}</td>
            <td>${document.querySelector(`#prioridad option[value="${tarea.prioridad}"]`).innerText}</td>
            <td>${document.querySelector(`#estado option[value="${tarea.estado}"]`).innerText}</td>
            <td><button id="eliminar" onclick="eliminarTarea(${index})">Eliminar</button></td>
        `;
        tableBody.appendChild(newRow);
    });
}

// Función para eliminar una tarea
function eliminarTarea(index) {
    tareas.splice(index, 1); // Eliminar la tarea del array
    mostrarTareas(); // Actualizar la tabla
}

// Validación del formulario y registro de la tarea
document.getElementById('taskForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario si hay errores

    // Obtén los valores de los campos
    const title = document.getElementById('title').value.trim();
    const desc = document.getElementById('desc').value.trim();
    const fecLimite = document.getElementById('fecLimite').value;
    const prioridad = document.getElementById('prioridad').value;
    const estado = document.getElementById('estado').value;

    // Resetea los mensajes de error
    document.querySelectorAll('.error-message').forEach(function(span) {
        span.style.display = 'none';
    });

    let isValid = true;

    // Validación de campos
    if (title === '') {
        document.getElementById('titleError').style.display = 'block';
        isValid = false;
    }

    if (desc === '') {
        document.getElementById('descError').style.display = 'block';
        isValid = false;
    }

    if (fecLimite === '') {
        document.getElementById('fecLimiteError').style.display = 'block';
        isValid = false;
    } else {
        const today = new Date().toISOString().split('T')[0];
        if (fecLimite < today) {
            document.getElementById('fecLimiteError').textContent = 'La fecha límite no puede ser anterior a la fecha actual.';
            document.getElementById('fecLimiteError').style.display = 'block';
            isValid = false;
        }
    }

    if (prioridad === '') {
        document.getElementById('prioridadError').style.display = 'block';
        isValid = false;
    }

    if (estado === '') {
        document.getElementById('estadoError').style.display = 'block';
        isValid = false;
    }

    // Si todo está correcto, se registra la tarea
    if (isValid) {
        // Crear un nuevo objeto tarea
        const nuevaTarea = new Tarea(title, desc, fecLimite, prioridad, estado);

        // Agregar la nueva tarea al array y mostrarla en la tabla
        agregarTarea(nuevaTarea);

        // Reiniciar el formulario después de la inserción
        document.getElementById('taskForm').reset();
    }
});