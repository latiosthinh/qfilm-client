import { component$ } from "@builder.io/qwik";
import { CameraIcon } from "~/components/share/icons/video";
import { type TOphimDetailData } from "~/types/ophim.type";

export default component$(({movieData}: {movieData: TOphimDetailData}) => {
	return <>
		<div class="mt-12">
			<div class="flex gap-4 border-b-[1px] border-zinc-900 pb-2 items-center">
				<h2 class="font-bold text-xl uppercase">Xem phim</h2>
				<span class="text-orange-100"><CameraIcon /></span>
			</div>

			<div class="my-6">
				{movieData.episodes.map((episode, index) =>
					<div key={index} class="grid grid-cols-[150px_auto] items-start mb-4">
						<h3>{episode.server_name}</h3>
						<div class="flex flex-wrap gap-4">
							{episode.server_data.map(item =>
								<button key={item.slug} title={item.filename}
									class="w-7 h-7 rounded bg-slate-700 hover:bg-orange-200"
								>
									{item.name}
								</button>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	</>
})