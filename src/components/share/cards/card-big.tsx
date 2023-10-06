import { Resource, component$, useResource$, $, useStore, useSignal, type QwikMouseEvent, useContext, useVisibleTask$ } from "@builder.io/qwik"
import { Link } from "@builder.io/qwik-city"
import { useGetMovieBySlug } from "~/firebase/ultis"
import type { TOphimMovieExcerpt} from "~/types/ophim.type";
import { type TOphimDetailData } from "~/types/ophim.type"
import { PlayIcon, SpinnerIcon } from "../icons/video"
import { DraggingContext } from "~/context/context";

export default component$(({movieSlug, data}: {movieSlug: string, data: TOphimMovieExcerpt}) => {
    const getMovieData = useGetMovieBySlug(movieSlug)
    const movieData = useResource$(async () => {
        const data = await getMovieData
        return data as TOphimDetailData
    })

    const isDrag = useContext(DraggingContext)

    if (!data.slug) return <></>

    return (
        <Resource
            value={movieData}
            onPending={() => <SpinnerIcon />}
            onRejected={() => <p>Failed to load data</p>}
            onResolved={(movieData: TOphimDetailData) => {
                return (
                    <article class="bg-zinc-900 rounded-lg group relative select-none" title={movieData.movie.name}>
                        <div class="relative pt-[56.25%]">
                            <img class="absolute top-0 left-0 w-full h-full object-cover select-none rounded-lg group-hover:opacity-30"
                                src={movieData.movie.poster_url || movieData.movie.thumb_url}
                                width={500}
                                height={330}
                                alt={movieData.movie.name}
                            />
                            <div class="absolute top-0 bottom-0 left-0 right-0"></div>

                            <Link class="flex justify-center items-center w-16 h-16 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                                opacity-0 group-hover:opacity-100 duration-300"
                                onMouseMove$={() => isDrag.value = false}
                                onMouseEnter$={() => isDrag.value = false}
                                onMouseDown$={() => isDrag.value = false}
                                href={`/${movieData.movie.slug}`} target="_blank" aria-label={movieData.movie.name}
                            >
                                <PlayIcon width="14" height="14" />
                            </Link>
                        </div>

                        <div class="px-4 pt-3 pb-1 absolute bottom-0 left-0 w-full bg-black bg-opacity-70 group-hover:bg-transparent">
                            <div class="flex items-center text-xs gap-2 mb-2">
                                {movieData.movie.category.map((g, gIndex) => gIndex<3 && <span key={g.id} class="p-1 bg-orange-200 rounded">{g.name}</span>)}
                            </div>
                            <h3 class="font-bold text-lg break-words overflow-ellipsis capitalize truncate">{movieData.movie.name} ({movieData.movie.year})</h3>
                        </div>
                    </article>
                )
            }}
        />
    )
})