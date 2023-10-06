import { Resource, component$, useResource$, $, type NoSerialize, useVisibleTask$, useSignal, useContextProvider, type QwikMouseEvent } from '@builder.io/qwik';
import "swiper/swiper-bundle.css?inline";
import { useGetUpdateMovies } from '~/api/ultis';
import type { TOphimMovieExcerpt } from '~/types/ophim.type';
import CardBig from '../share/cards/card-big';
import { DraggingContext } from '~/context/context';
import { SpinnerIcon } from '../share/icons/video';

export default component$(() => {
    const heroSlider = useSignal<HTMLElement>();
    const getMovies = useGetUpdateMovies()
    const movies = useResource$<NoSerialize<any>>(async () => {
        const data = await getMovies;
        return data
    });

    const isDrag = useSignal(false)
    useContextProvider(DraggingContext, isDrag)

    const mouseEvent = useSignal({
        isMouseDown: false,
        startX: 0,
        scrollLeftPos: 0
    })

    const handleMouseDown = $((e: QwikMouseEvent<HTMLAnchorElement, MouseEvent>) => {
        const el = e.target as Element
        if (el.tagName === "A" || el.parentElement?.tagName === "A") return
        if (!heroSlider.value) return;
        // isDrag.value = true
        const slider = heroSlider.value;
        mouseEvent.value.isMouseDown = true;
        mouseEvent.value.startX = e.pageX - slider.offsetLeft;
        mouseEvent.value.scrollLeftPos = slider.scrollLeft;
    });

    const handleMouseUp = $(() => {
        isDrag.value = false
        mouseEvent.value.isMouseDown = false;
    });

    const handleMouseMove = $((e: QwikMouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if(!mouseEvent.value.isMouseDown || !heroSlider.value) return;
        isDrag.value = true
        const slider = heroSlider.value;
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - mouseEvent.value.startX);
        slider.scrollLeft = mouseEvent.value.scrollLeftPos - walk;
    })

    const handleMouseLeave = $(() => {
        mouseEvent.value.isMouseDown = false
        isDrag.value = false
    })

    return (
    <>
        <h2 class="font-semibold text-2xl mb-4">Phim mới cập nhật</h2>
        <section class="grid grid-flow-col md:auto-cols-1/2 xl:auto-cols-1/3 gap-5 w-full pb-2
            overflow-x-auto overflow-y-hidden whitespace-nowrap overscroll-contain
            select-none cursor-grab"
            ref={heroSlider}
            onMouseDown$={e => handleMouseDown(e)}
            onMouseUp$={() => handleMouseUp()}
            onMouseMove$={e => handleMouseMove(e)}
            onMouseLeave$={() => handleMouseLeave()}
            >
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

            <div class={`absolute top-0 left-0 w-full h-full z-[5] ${ isDrag.value ? 'block' : 'hidden'}`}></div>
        </section>
    </>
    )
})