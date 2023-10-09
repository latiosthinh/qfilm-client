import { Resource, component$, useResource$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { useGetMovieBySlug } from "~/firebase/ultis";
import { type TOphimDetailData } from "~/types/ophim.type";
import { ClockIcon, MovieIcon, PlayIcon, SpinnerIcon } from "../icons/video";

export default component$(({movieSlug}: {movieSlug: string}) => {
    const getMovieData = useGetMovieBySlug(movieSlug)
    const movieData = useResource$(async () => {
        const data = await getMovieData
        return data as TOphimDetailData
    })
    
    return (
        <Resource
            value={movieData}
            onPending={() => <SpinnerIcon />}
            onRejected={() => <p>Failed to load data</p>}
            onResolved={(movieData: TOphimDetailData) => {
                return (
                    <article class="rounded-lg group relative select-none overflow-hidden" title={movieData.movie.name}>
                        <div class="absolute -top-[1px] -left-[1px] bg-orange-200 text-sm z-[1] px-3 py-1 rounded-br-lg">
                            {movieData.movie.episode_total !== "1" && /\d/.test(movieData.movie.episode_total) && /\//.test(movieData.movie.episode_total)
                                ? <>{movieData.movie.episode_current}/{movieData.movie.episode_total}</>
                                : <>{movieData.movie.episode_current}</>
                            }
                        </div>

                        <Link class="block relative pt-[120%] rounded-lg overflow-hidden"
                            href={`/${movieData.movie.slug}`} target="_blank" aria-label={movieData.movie.name}
                        >
                            <img class="absolute top-0 left-0 w-full h-full object-cover select-none group-hover:opacity-30"
                                src={movieData.movie.thumb_url}
                                width={500}
                                height={330}
                                alt={movieData.movie.name}
                            />
                            <div class="absolute top-0 bottom-0 left-0 right-0"></div>

                            <div class="flex justify-center items-center w-16 h-16 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                                opacity-0 group-hover:opacity-100 duration-300"
                            >
                                <PlayIcon width="14" height="14" />
                            </div>
                        </Link>

                        <div class="pt-4 w-full">
                            <div class="flex gap-3 opacity-70 text-sm mb-1">
                                <span class="inline-flex gap-1 items-center">
                                    <MovieIcon />
                                    {movieData.movie.year}
                                </span>
                                <span>&#8226;</span>
                                <span class="inline-flex gap-1 items-center">
                                    <ClockIcon />
                                    {movieData.movie.time}
                                </span>
                            </div>

                            <h3 class="text-lg break-words overflow-ellipsis capitalize truncate group-hover:text-orange-200">
                                <Link href={`/${movieData.movie.slug}`} target="_blank" aria-label={movieData.movie.name}>
                                    {movieData.movie.name}
                                </Link>
                            </h3>
                        </div>
                    </article>
                )
            }}
        />
    )
})