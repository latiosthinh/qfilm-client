import { type TOphimNewData } from "~/types/ophim.type";
import OPHIM_API from "./api";

export const useGetUpdateMovies = async () => {
    const req = await fetch(OPHIM_API.QUERY_NEWEST)
	const data = await req.json() as TOphimNewData

	if (data.status) {
		return data.items
	}

	return null
}