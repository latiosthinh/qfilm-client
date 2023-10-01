import { component$ } from "@builder.io/qwik";
import { LeftIcon, RightIcon } from "../icons/arrow";

export default component$(() => {
    const arrowClass = "splide__arrow cursor-pointer disabled:opacity-30"
    const arrowPrevClass = `${arrowClass} splide__arrow--prev`
    const arrowNextClass = `${arrowClass} splide__arrow--next`

    return (
        <div class="splide__arrows splide__arrows--ltr absolute -top-9 right-0 flex gap-2">
            <button class={arrowPrevClass} aria-label="prev">
                <LeftIcon />
            </button>
            <button class={arrowNextClass} aria-label="next">
                <RightIcon />
            </button>
        </div>
    )
})