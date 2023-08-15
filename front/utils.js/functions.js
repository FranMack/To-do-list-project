
export function orderByDate(array) {
	// Utilizamos el método sort para ordenar el array de objetos por la propiedad 'fecha'
	array.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
	return array;
}