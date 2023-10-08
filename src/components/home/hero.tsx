import { Resource, component$, useResource$, type NoSerialize } from '@builder.io/qwik';
import "swiper/swiper-bundle.css?inline";
import { useGetUpdatedMovies } from '~/api/ultis';
import type { TOphimMovieExcerpt } from '~/types/ophim.type';
import CardBig from '../share/cards/card-big';
import { SpinnerIcon } from '../share/icons/video';
import Slider from '../share/slider/slider';

export default component$(() => {
    const getMovies = useGetUpdatedMovies()
    const movies = useResource$<NoSerialize<any>>(async () => {
        const data = await getMovies;
        return data
    });

    return (
    <>
        <Slider title="Phim mới cập nhật" extraClass="md:auto-cols-1/2 xl:auto-cols-2/5 mb-24">
            <Resource
                value={movies}
                onPending={() => <SpinnerIcon />}
                onRejected={() => <p>Failed to load data</p>}
                onResolved={(movies: TOphimMovieExcerpt[]) => {
                    return <>
                        {movies.map(m => 
                            <CardBig key={m._id} movieSlug={m.slug} data={m} />
                        )}
                    </>
                }}
            />
        </Slider>
    </>
    )
})