import { Resource, component$, useContextProvider, useResource$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { BookmarkIcon } from '~/components/share/icons/video';
import ModalMovie from '~/components/share/modal/modal-movie';
import { PlayerContext } from '~/context/context';
import { useGetMovieBySlug } from '~/firebase/ultis';
import type { TOphimDetailData } from '~/types/ophim.type';
import MovieDetail from './movie-detail';
import MovieEpisode from './movie-episode';
import MovieInfo from './movie-info';

export default component$(() => {
	const location = useLocation();
	const getMovieData = useGetMovieBySlug(location.url.pathname.split("/")[1])
    const movieData = useResource$(async () => {
        const data = await getMovieData
        return data as TOphimDetailData
    })

	const videoSrc = useSignal("")
	useContextProvider(PlayerContext, videoSrc)

	useVisibleTask$(() => {
		movieData.value.then(data => document.title = data.movie.name)
	});

	return <Resource
		value={movieData}
		onPending={() => <p>Loading...</p>}
		onRejected={() => <p>Failed to load data</p>}
		onResolved={(movieData: TOphimDetailData) => {
			return <>
				<article class="grid grid-cols-1/3 items-start gap-8">
					<div class="relative">
						<img class="object-cover w-full rounded-lg opacity-70 group-hover:opacity-50"
							src={movieData.movie.thumb_url}
							width={500}
							height={330}
							alt={movieData.movie.name}
							title={movieData.movie.name}
						/>

						<div class="flex justify-end absolute bottom-4 left-0 px-4 w-full">
							<button aria-label="bookmark" title="bookmark" class="hover:text-orange-200">
								<BookmarkIcon />
							</button>
						</div>
					</div>

					<div>
						<MovieInfo movieData={movieData} />
						<MovieDetail movieData={movieData} />
						<MovieEpisode movieData={movieData} />
					</div>
				</article>

				{videoSrc.value &&
					<ModalMovie />
				}
			</>
		}}
	/>
});