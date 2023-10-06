import type { TEpisodes, TMovieData } from "./common.type"

export type TOphimMovieExcerpt = {
	modified: {
		time: string
	},
	_id: string,
	name: string,
	origin_name: string,
	thumb_url: string,
	slug: string,
	year: number,
	poster_url: string
}

export type TOphimNewData = {
	status: boolean,
	items: TOphimMovieExcerpt[]
}

export type TOphimDetailData = {
	status: boolean,
    msg: string,
    movie: TMovieData,
    episodes: TEpisodes[]
}