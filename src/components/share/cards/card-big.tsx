import { Resource, component$, useResource$, type NoSerialize } from "@builder.io/qwik"
import { useGetMovieBySlug } from "~/firebase/ultis"
import type { IGenreData } from "~/interfaces/genre"
import { type IMovie } from "~/interfaces/movie"
import { PlayIcon } from "../icons/video"

export default component$(({movieData}: {movieData: NoSerialize<IMovie>}) => {
    const getMovieData = useGetMovieBySlug(movieData?.data().slug as string)
    const genres = useResource$(async () => {
        const _data = await getMovieData
        return _data.movie.category
    })

    return (
        <article class="bg-zinc-900 group">
            <div class="relative pt-[56.25%] cursor-pointer">
                <img class="absolute top-0 left-0 w-full h-full object-cover rounded-lg group-hover:opacity-50"
                    src={movieData?.data().poster_url}
                    width={500}
                    height={330}
                    alt={movieData?.data().name}
                />
                <button class="w-14 h-14 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    opacity-0 group-hover:opacity-100 duration-300
                ">
                    <PlayIcon width="14" height="14" />
                </button>
            </div>

            <div class="p-3 absolute bottom-0 left-0 w-full
                translate-y-full opacity-0 
                group-hover:translate-y-0 group-hover:opacity-100 duration-300">
                
                <Resource
                    value={genres}
                    onPending={() => <p>Loading...</p>}
                    onRejected={() => <p>Failed to load data</p>}
                    onResolved={(genres: IGenreData[]) => {
                        return <div class="flex items-center text-xs gap-2 mb-2">
                            {genres.map(g => <span key={g.slug} class="p-1 bg-orange-200 rounded">{g.name}</span>)}
                        </div>
                    }}
                />
                <h3 class="font-bold text-lg">{movieData?.data().name} ({movieData?.data().year})</h3>
            </div>
        </article>
    )
})