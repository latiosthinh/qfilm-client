import { component$, noSerialize, useResource$, type NoSerialize } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { useGenres } from "~/firebase/ultis";

export default component$(() => {
    const location = useLocation()
    const getGenres = useGenres()
    const genresData = useResource$<NoSerialize<any>>(async () => {
        const data = await getGenres;
        return noSerialize(data?.docs)
    });

    const navItemClasses = "flex items-center gap-4 pl-4 py-3 mb-4 hover:bg-[#171717]"
    const navItemActiveClasses = `${navItemClasses} border-orange-200 border-r-[3px] text-orange-200 bg-[#171717]`

    return (
        <header class="w-64">
            
        </header>
    );
});
