import { $, Slot, component$, useContextProvider, useSignal, type QwikMouseEvent } from '@builder.io/qwik';
import "swiper/swiper-bundle.css?inline";
import { DraggingContext } from '~/context/context';

export default component$(({title, extraClass}: {title: string, extraClass: string}) => {
    const sliderRef = useSignal<HTMLElement>();

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
        if (!sliderRef.value) return;
        const slider = sliderRef.value;
        mouseEvent.value.isMouseDown = true;
        mouseEvent.value.startX = e.pageX - slider.offsetLeft;
        mouseEvent.value.scrollLeftPos = slider.scrollLeft;
    });

    const handleMouseUp = $(() => {
        isDrag.value = false
        mouseEvent.value.isMouseDown = false;
    });

    const handleMouseMove = $((e: QwikMouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if(!mouseEvent.value.isMouseDown || !sliderRef.value) return;
        isDrag.value = true
        const slider = sliderRef.value;
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
        <h2 class="font-semibold text-2xl mb-4">{title}</h2>
        <section class={`grid grid-flow-col ${extraClass} gap-5 w-full pb-4
            overflow-x-auto overflow-y-hidden whitespace-nowrap overscroll-contain
            select-none`}
            ref={sliderRef}
            onMouseDown$={e => handleMouseDown(e)}
            onMouseUp$={() => handleMouseUp()}
            onMouseMove$={e => handleMouseMove(e)}
            onMouseLeave$={() => handleMouseLeave()}
            >
            <Slot />
        </section>
    </>
    )
})