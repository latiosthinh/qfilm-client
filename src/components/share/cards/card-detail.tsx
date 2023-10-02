import { component$ } from "@builder.io/qwik"
import { type IMovie } from "~/interfaces/movie"

export default component$(({movieData}: {movieData: IMovie}) => {
    return (
        <div class="absolute pt-[56.25%] cursor-pointer top-">
            <img class="absolute top-0 left-0 h-full w-full object-cover rounded-lg"
                src={movieData.data().poster_url}
                width={500}
                height={330}
                alt={movieData.data().name}
            />


        </div>
    )
})