import { QueryConstraint, collection, doc, getCountFromServer, getDoc, getDocs, limit, orderBy, query, startAfter, startAt } from "firebase/firestore";
import { db } from "./config";
import OPHIM_API from "~/api/api";

const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max)
}

export const useGenres = async () => {
    const genresRef = collection(db, "genres")

    try {
        const genres = await getDocs(genresRef);
        if(genres.docs.length > 0) {
            return genres
        }
    } catch (error) {
        console.error(error);
    }
}

export const useGetMovieBySlug = async (slug: string) => {
    const movieData = await fetch(OPHIM_API.QUERY_BY_SLUG + slug)
    return movieData.json()
}

export const getGenreByID = async (id: string) => {
    const genreRef = doc(db, "genres", id)

    try {
        const genre = await getDoc(genreRef);
        if(genre.data()) {
            return genre.data()
        }
    } catch (error) {
        console.error(error);
    }
}

export const useGetNewestMovie = async () => {
    const movieRef = collection(db, "movies")
    const movieQuery = query(movieRef, limit(10))

    try {
        const movies = await getDocs(movieQuery);
        if(movies.docs.length > 0) {
            return movies
        }
    } catch (error) {
        console.error(error);
    }
}