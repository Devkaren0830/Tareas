import { listarTareas } from "./listar_tareas.js";

let global = {};


document.addEventListener('DOMContentLoaded', () => {
    main();
    obtenerTareas();
});

async function obtenerTareas() {
    let response = await listarTareas();
    console.log(response);

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
