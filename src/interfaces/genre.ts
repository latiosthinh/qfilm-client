interface IGenreData {
	id: string,
	name: string,
	slug: string
}

export interface IGenre {
	id: string,
	data: () => IGenreData
}