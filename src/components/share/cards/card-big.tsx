import { Resource, component$, useResource$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { useGetMovieBySlug } from "~/firebase/ultis";
import { type TOphimDetailData } from "~/types/ophim.type";
import { PlayIcon, SpinnerIcon } from "../icons/video";

export default component$(({movieSlug}: {movieSlug: string}) => {
    const getMovieData = useGetMovieBySlug(movieSlug)
    const movieData = useResource$(async () => {
        const data = await getMovieData
        return data as TOphimDetailData
    })
	const poster = useSignal<HTMLElement>();
    useVisibleTask$(() => {
        if (!poster.value) return
        const http = new XMLHttpRequest();
        const posterSrc = poster.value.getAttribute("src") as string
        const posterThumbSrc = poster.value.dataset.src as string
        http.open('HEAD', posterSrc, false);
        http.send();
        if (http.status == 404) {
            poster.value.setAttribute("src", posterThumbSrc)
        }
    })

    return (
        <Resource
            value={movieData}
            onPending={() => <SpinnerIcon />}
            onRejected={() => <p>Failed to load data</p>}
            onResolved={(movieData: TOphimDetailData) => {
                return (
                    <article class="bg-zinc-900 rounded-lg group relative select-none overflow-hidden" title={movieData.movie.name}>
                        <div class="absolute -top-[1px] -left-[1px] bg-orange-200 text-sm z-[1] px-3 py-1 rounded-br-lg">
                            {movieData.movie.episode_total !== "1" && /\d/.test(movieData.movie.episode_total)
                                ? <>{movieData.movie.episode_current}/{movieData.movie.episode_total}</>
                                : <>{movieData.movie.episode_current}</>
                            }
                        </div>

                        <div class="relative pt-[56.25%] rounded-lg overflow-hidden">
                            <img ref={poster} class="absolute top-0 left-0 w-full h-full object-cover object-top select-none group-hover:opacity-30"
                                src={movieData.movie.poster_url || movieData.movie.thumb_url}
                                data-src={movieData.movie.thumb_url}
                                width={500}
                                height={330}
                                alt={movieData.movie.name}
                            />
                            <div class="absolute top-0 bottom-0 left-0 right-0"></div>

                            <Link class="flex justify-center items-center w-16 h-16 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                                opacity-0 group-hover:opacity-100 duration-300"
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