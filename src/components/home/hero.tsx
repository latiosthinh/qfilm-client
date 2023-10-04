import { Resource, component$, useStylesScoped$, noSerialize, useResource$, type NoSerialize, useVisibleTask$ } from '@builder.io/qwik';
import "swiper/swiper-bundle.css?inline";
import { useGetNewestMovie } from '~/firebase/ultis';
import { type IMovie } from '~/interfaces/movie';
import CardBig from '../share/cards/card-big';
import Splide from '@splidejs/splide'
import splideStyles from '@splidejs/splide/dist/css/splide-core.min.css?inline'
import Arrows from '../share/carousel/arrows';
import { useGetUpdateMovies } from '~/api/ultis';
import type { TOphimMovieExcerpt } from '~/types/ophim.type';

export default component$(() => {
    const getMovies = useGetUpdateMovies()
    const movies = useResource$<NoSerialize<any>>(async () => {
        const data = await getMovies;
        return data
    });

    useStylesScoped$(splideStyles);

    useVisibleTask$(() => {
        new Splide(".splide--hero", {
            perPage: 3,
            gap: '16px',
            drag: 'free',
            pagination: false
        }).mount()
    })

    return (
    <>
        <h2 class="font-semibold text-2xl mb-4">Phim mới cập nhật</h2>
        <section class="splide splide--hero">
            <div class="splide__track">
                <div class="splide__list">
                    <Resource
                        value={movies}
                        onPending={() => <p>Loading...</p>}
                        onRejected={() => <p>Failed to load data</p>}
                        onResolved={(movies: TOphimMovieExcerpt[]) => {
                            return <>
                                {movies.map(m => 
                                    <div class="splide__slide" key={m._id}>
                                        <CardBig movieSlug={m.slug} />
                                    </div>
                                )}
                            </>
                        }}
                    />
                </div>
            </div>

            <Arrows />
        </section>
    </>
    )
})