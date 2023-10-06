import { component$ } from "@builder.io/qwik"
import { ClockIcon, MovieIcon } from "~/components/share/icons/video"
import { type TOphimDetailData } from "~/types/ophim.type"

export default component$(({movieData}: {movieData: TOphimDetailData}) => {
	return <>
		<div class="flex gap-4 items-start">
			<h1 class="font-bold text-2xl mb-4">{movieData.movie.name}</h1>
			<span class="uppercase font-bold text-sm p-2 rounded bg-orange-200">{movieData.movie.quality}</span>
		</div>

		<div class="flex gap-3 opacity-70 text-sm">
			<span class="inline-flex gap-1 items-center">
				<MovieIcon />
				{movieData.movie.year}
			</span>
			<span>&#8226;</span>
			<span class="inline-flex gap-1 items-center">
				<ClockIcon />
				{movieData.movie.time}
			</span>
		</div>
	</>
})