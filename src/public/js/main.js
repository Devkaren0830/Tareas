let global = {};


document.addEventListener('DOMContentLoaded', () => {
    main();
    obtenerTareas();
});

export async function obtenerTareas() {
    mostrarCargando();
    let response = await listarTareas();
    console.log(response);
    cerrarCargando();
    if (response.estado) {
        global.listarTareas = response.data.rows;
        construir_tareas();
    } else {
        console.log('Error al listar las tareas:', response);
    }
}

function main() {
    let lista_tareas = document.querySelector(".task-list");
    console.log(lista_tareas);

    if (lista_tareas) {
        global.Lista_Tareas_Html = lista_tareas.innerHTML;

        lista_tareas.innerHTML = "";
    } else {
        console.log('Elemento .task-list no encontrado');
    }
    console.log(lista_tareas);
}

function reeplazar_html(htmlm, objeto) {
    let html = htmlm;
    for (const key in objeto) {
        const element = objeto[key];
        html = html.replaceAll(`{${key}}`, element);
    }
    return html;
}

function construir_tareas() {
    let html_final = "";
    if (global.listarTareas) {
        global.listarTareas.forEach(tarea => {
            let html = reeplazar_html(global.Lista_Tareas_Html, tarea);
            html_final += html;
        });
        document.querySelector(".task-list").innerHTML = html_final;
    }
}

function tareas_hamburguesa() {
    document.getElementById('menu').classList.toggle('active');
}

export async function listarTareas() {
    try {
        const response = await fetch('/api/listar_tareas');
        const data = await response.json();
        return data;
    } catch (error) {
        return error;
    }
}


function separarTareasPorPrioridad(prioridad) {
    // quitar 'active' de todos los botones
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    // agregar 'active' al botón actual
    prioridad.classList.add('active');

    // ocultar todas las tareas
    document.querySelectorAll('.task-card').forEach(element => {
        element.style.display = 'none';
    });

    let tareas = [];
    const filtro = prioridad.textContent.trim().toLowerCase();
    if (filtro === 'todos') {
        tareas = document.querySelectorAll('.task-card');
    } else if (filtro === 'bajo') {
        tareas = document.querySelectorAll('.task-card[prioridad="3"]');
    } else if (filtro === 'medio') {
        tareas = document.querySelectorAll('.task-card[prioridad="2"]');
    } else if (filtro === 'alto') {
        tareas = document.querySelectorAll('.task-card[prioridad="1"]');
    }

    tareas.forEach(element => {
        element.style.display = 'block';
    });
}


function eliminar_tarea(
    nombreTarea
) {

    let text = `La tarea ${nombreTarea} será eliminada permanentemente.`;
    let title = `Eliminar tarea ${nombreTarea}`;

    confirmarEliminacion(
        title,
        text,
        () => {

        },
        []
    );



    async function eliminar_tarea_bd() {
        mostrarCargando();
        const response = await fetch('/api/eliminar_tarea');
        const data = await response.json();
        if (data) {
            if (data.estado) {
                cerrarCargando();
                Swal.fire({
                    title: '¡Tarea eliminada!',
                    text: `La tarea "${nombreTarea}" se eliminó correctamente.`,
                    icon: 'success',
                    confirmButtonColor: '#4C95E1',
                    background: '#1d1f27',
                    color: '#f1faee'
                });

            }
        }
        return data;
    }
}



function confirmarEliminacion(
    title,
    text,
    function_aceptar,
    params_aceptar,
    icon = 'warning',
) {
    Swal.fire({
        title: title,
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#e63946', // Rojo eliminar
        cancelButtonColor: '#457b9d',  // Azul cancelar
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        background: '#1d1f27',
        color: '#f1faee'
    }).then((result) => {
        if (result.isConfirmed) {
            function_aceptar(...params_aceptar);
            // Aquí va tu lógica para eliminar la tarea en tu app
        }
    })
}


function mostrarCargando() {
    Swal.fire({
        title: 'Cargando...',
        allowOutsideClick: false, // evita que se cierre al hacer clic afuera
        didOpen: () => {
            Swal.showLoading()
        }
    })
}

// Para cerrarlo después:
function cerrarCargando() {
    Swal.close()
}


function crearNuevaTarea() {
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const fecha_venvimiento = document.getElementById('taskDueDate').value;
    // Get all radio buttons with the name 'priority'
    const priorityRadios = document.getElementsByName('priority');
    let prioridad = '';

    // Loop through each radio button
    for (const radio of priorityRadios) {
        // Check if the current radio button is selected
        if (radio.checked) {
            prioridad = radio.value;
            // Break the loop once you find the active one
            break;
        }
    }


    if (title == '' || description == '' || fecha_venvimiento == '' || prioridad == '') {
        alert('Por favor, completa todos los campos del formulario.');
        return;
    }

    fetch('/api/agregar_tarea', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            description: description,
            fecha_venvimiento: fecha_venvimiento,
            prioridad
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Tarea creada:', data);
            alert('Tarea creada con éxito');

            window.location.href = '/listar_tareas';
        })
        .catch(error => {
            console.error('Error al crear la tarea:', error);
        });
}

// Ejemplo de uso:
// crearNuevaTarea('Título de la tarea', 'Descripción de la tarea');