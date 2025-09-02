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