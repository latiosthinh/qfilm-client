import { component$, useContext, $ } from "@builder.io/qwik";
import { CameraIcon } from "~/components/share/icons/video";
import { PlayerContext } from "~/context/context";
import { type TOphimDetailData } from "~/types/ophim.type";

export default component$(({movieData}: {movieData: TOphimDetailData}) => {
	const videoSrc = useContext(PlayerContext)

	const handleEpisodeClick = $((src: string) => {
		if (!videoSrc.value) {
			videoSrc.value = src
			return
		}

		videoSrc.value = ""
		setTimeout(() => {
			videoSrc.value = src
		}, 300);
	})

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
									class={`${/\d/.test(item.slug) ? 'w-7' : 'px-2'} h-7 rounded bg-zinc-900 hover:bg-orange-200`}
									onClick$={() => handleEpisodeClick(item.link_m3u8)}
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