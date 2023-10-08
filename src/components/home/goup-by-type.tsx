import { Resource, component$, noSerialize, useResource$, type NoSerialize } from '@builder.io/qwik';
import "swiper/swiper-bundle.css?inline";
import { useGetMovieByType } from '~/firebase/ultis';
import { type TMovieType } from '~/types/common.type';
import CardMd from '../share/cards/card-md';
import { SpinnerIcon } from '../share/icons/video';
import Slider from '../share/slider/slider';

export default component$(({title, slug}: {title: string, slug: string}) => {
    const getMovies = useGetMovieByType(slug)
    const movies = useResource$<NoSerialize<any>>(async () => {
        const data = await getMovies;
        return noSerialize(data?.docs)
    });

    return (
    <>
        <h2 class="font-semibold text-2xl mb-4">{title}</h2>

        <div class="grid grid-flow-col md:auto-cols-1/2 xl:auto-cols-fr mb-20
            gap-5 w-full pb-4
            overflow-x-auto overflow-y-hidden whitespace-nowrap overscroll-contain
            select-none ">
            <Resource
                value={movies}
                onPending={() => <SpinnerIcon />}
                onRejected={() => <p>Failed to load movies list (sub slider)</p>}
                onResolved={(movies: TMovieType[]) => {
                    return <>
                        {movies.map(m => 
                            <CardMd key={m.id} movieSlug={m.data().slug} />
                        )}
                    </>
                }}
            />
        </div>
    </>
    )
})