import { QueryConstraint, collection, getCountFromServer, getDocs, limit, orderBy, query, startAfter, startAt } from "firebase/firestore";
import { db } from "./config";

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