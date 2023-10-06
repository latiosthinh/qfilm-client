import { Resource, component$, useResource$, useVisibleTask$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
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
					<img class="object-cover w-full rounded-lg opacity-70 group-hover:opacity-50"
						src={movieData.movie.thumb_url}
						width={500}
						height={330}
						alt={movieData.movie.name}
					/>

					<div>
						<MovieInfo movieData={movieData} />
						<MovieDetail movieData={movieData} />
						<MovieEpisode movieData={movieData} />
					</div>
				</article>
			)
		}}
	/>
});