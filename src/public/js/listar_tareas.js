export async function listarTareas() {
    try {
        const response = await fetch('/api/listar_tareas');
        const data = await response.json();
        return data;
    } catch (error) {
        return error;
    }
}
