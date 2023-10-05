import { Resource, component$, useResource$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { useLocation, Link } from '@builder.io/qwik-city';
import TableInfo from '~/components/movie/table-info';
import { ClockIcon, MovieIcon, PlayIcon, YoutubeIcon } from '~/components/share/icons/video';
import { useGetMovieBySlug } from '~/firebase/ultis';
import type { TOphimDetailData } from '~/types/ophim.type';

export default component$(() => {
	const location = useLocation();
	const getMovieData = useGetMovieBySlug(location.url.pathname.split("/")[1])
    const movieData = useResource$(async () => {
        const data = await getMovieData
        return data as TOphimDetailData
    })

	const count = useSignal(0);

	useVisibleTask$(() => {
		movieData.value.then(data => document.title = data.movie.name)
	});

	return <Resource
		value={movieData}
		onPending={() => <p>Loading...</p>}
		onRejected={() => <p>Failed to load data</p>}
		onResolved={(movieData: TOphimDetailData) => {
			return (
				<article class="grid grid-cols-1/3 items-start gap-8">
					<button class="w-full relative group" title="play">
						<img class="object-cover w-full rounded-lg opacity-70 group-hover:opacity-50"
							src={movieData.movie.thumb_url}
							width={500}
							height={330}
							alt={movieData.movie.name}
						/>
						<div class="w-14 h-14 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
							opacity-60 group-hover:opacity-100 duration-200">
							<PlayIcon width="14" height="14" />
						</div>
					</button>

					<div>
						<div class="flex gap-4 items-start">
							<h1 class="font-bold text-2xl mb-4">{movieData.movie.name}</h1>
							<span class="uppercase font-bold text-sm p-2 rounded bg-orange-200">{movieData.movie.quality}</span>
						</div>

						<div class="flex gap-3 opacity-70 text-sm">
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


						<div class="mt-12">
							<div class="flex gap-4 border-b-[1px] border-zinc-900 pb-2 items-center">
								<h2 class="font-bold text-xl uppercase">Tổng quan</h2>
								<span>|</span>
								<Link class="text-orange-100 hover:text-orange-200 inline-flex gap-1 items-center duration-200"
									title="open trailer"
									href={movieData.movie.trailer_url} target="_blank">
									<YoutubeIcon />
									Trailer
								</Link>
							</div>

							<div dangerouslySetInnerHTML={movieData.movie.content} class="my-8" />
							
							<TableInfo movieData={movieData} />
						</div>
					</div>
				</article>
			)
		}}
	/>
});