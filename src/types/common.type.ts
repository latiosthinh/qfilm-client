export type TGenre = {
	id: string,
	name: string,
	slug: string
}

export type TEpisodeData = {
	name: string,
	slug: string,
	filename: string,
	link_embed: string,
	link_m3u8: string
}

export type TEpisodes = {
	server_name: string,
	server_data: TEpisodeData[]
}

export type TCountry = {
	id: string,
	name: string,
	slug: string
}

export type TMovieData = {
	created: {
		time: string
	},
	modified: {
		time: string
	},
	_id: string,
	name: string,
	origin_name: string,
	thumb_url: string,
	slug: string,
	year: number,
	poster_url: string,
	content: string,
	type: string,
	status: string,
	trailer_url: string,
	time: string,
	episode_current: string,
	episode_total: string,
	quality: string,
	category: TGenre[],
	countries: TCountry[],
	actor: string[],
	director: string[],
}