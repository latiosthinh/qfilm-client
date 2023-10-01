import { component$ } from "@builder.io/qwik"

export default component$(({src, altText}: {src: string, altText:string}) => {
    return (
        <article class="relative pt-[56.25%] rounded overflow-hidden">
            <img class="absolute top-0 left-0 h-full w-full object-cover"
                src={src}
                width={500}
                height={330}
                alt={altText}
            />
        </article>
    )
})