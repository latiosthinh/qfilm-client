import { Resource, component$, useResource$ } from "@builder.io/qwik"
import { Link } from "@builder.io/qwik-city"
import { useGetMovieBySlug } from "~/firebase/ultis"
import { type TOphimDetailData } from "~/types/ophim.type"
import { PlayIcon } from "../icons/video"

export default component$(({movieSlug}: {movieSlug: string}) => {
    const getMovieData = useGetMovieBySlug(movieSlug)
    const movieData = useResource$(async () => {
        const data = await getMovieData
        return data as TOphimDetailData
    })

    return (
        <Resource
            value={movieData}
            onPending={() => <p>Loading...</p>}
            onRejected={() => <p>Failed to load data</p>}
            onResolved={(movieData: TOphimDetailData) => {
                return (
                    <article class="bg-zinc-900 group">
                        <Link href={`/${movieData.movie.slug}`} target="_blank">
                            <div class="relative pt-[56.25%]">
                                <img class="absolute top-0 left-0 w-full h-full object-cover rounded-lg group-hover:opacity-40"
                                    src={movieData.movie.poster_url}
                                    width={500}
                                    height={330}
                                    alt={movieData.movie.name}
                                />
                                <button class="w-14 h-14 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                                    opacity-0 group-hover:opacity-100 duration-300
                                ">
                                    <PlayIcon width="14" height="14" />
                                </button>
                            </div>

                            <div class="p-4 pb-3 absolute bottom-0 left-0 w-full bg-black bg-opacity-70 group-hover:bg-transparent">
                                <div class="flex items-center text-xs gap-2 mb-2">
                                    {movieData.movie.category.map(g => <span key={g.id} class="p-1 bg-orange-200 rounded">{g.name}</span>)}
                                </div>
                                <h3 class="font-bold text-lg">{movieData.movie.name} ({movieData.movie.year})</h3>
                            </div>
                        </Link>
                    </article>
                )
            }}
        />
    )
})