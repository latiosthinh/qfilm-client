import { component$ } from "@builder.io/qwik"
import { Link } from "@builder.io/qwik-city"
import TableInfo from "~/components/movie/table-info"
import { YoutubeIcon } from "~/components/share/icons/video"
import { type TOphimDetailData } from "~/types/ophim.type"

export default component$(({movieData}: {movieData: TOphimDetailData}) => {
	return <>
		<div class="mt-12">
			<div class="flex gap-4 border-b-[1px] border-zinc-900 pb-2 items-center">
				<h2 class="font-bold text-xl uppercase">Tổng quan</h2>
				<span>|</span>
				<Link class="text-orange-100 hover:text-orange-200 inline-flex gap-1 items-center duration-200"
					title="open trailer"
					href={movieData.movie.trailer_url} target="_blank">
					<YoutubeIcon />
					Trailer
				</Link>
			</div>

			<div dangerouslySetInnerHTML={movieData.movie.content} class="my-8" />
			
			<TableInfo movieData={movieData} />
		</div>
	</>
})