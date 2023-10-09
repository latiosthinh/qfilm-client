import { onSnapshot, collection, doc, getCountFromServer, getDoc, getDocs, limit, orderBy, query, startAfter, startAt, where } from "firebase/firestore";
import { db } from "./config";
import OPHIM_API from "~/api/api";

const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max)
}

export const useGenres = async () => {
    const genresRef = collection(db, "genre")

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

export const useGetTypes = async () => {
    const typeRef = collection(db, "type")
    const typeQuery = query(typeRef, orderBy("name", "desc"))

    try {
        const types = await getDocs(typeQuery)
        if (types.docs.length > 0) {
            return types
        }
    } catch (error) {
        console.error(error)
    }
}

export const useGetMovieByType = async (type: string) => {
    const movieRef = collection(db, "movies")
    const typeRef = doc(db, "type", type)
    const movieQuery = query(movieRef, where("type", "==", typeRef), limit(6))

    try {
        const movies = await getDocs(movieQuery);
        if(movies.docs.length > 0) {
            return movies
        }
    } catch (error) {
        console.error(error);
    }
}

export const getGenreByID = async (id: string) => {
    const genreRef = doc(db, "genre", id)

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