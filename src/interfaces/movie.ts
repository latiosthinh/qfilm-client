import type { IGenre } from "./genre"

interface IEpisodeData {
	name: string,
	slug: string,
	filename: string,
	link_embed: string,
	link_m3u8: string
}

interface IEpisodes {
	server_name: string,
	server_data: IEpisodeData[]
}

export interface ICountry {
	id: string,
	name: string,
	slug: string
}

export interface IMovieData {
	id: string,
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
	genres: IGenre[],
	countries: ICountry[],
	actor: string[],
	director: string[],
	episodes: IEpisodes[]
}

export interface IMovie {
	id: string,
	data: () => IMovieData
}