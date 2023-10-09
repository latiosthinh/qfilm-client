import { component$, useContext, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import Player from '@oplayer/core';
import OHLs from '@oplayer/hls';
import ui from '@oplayer/ui';
import { PlayerContext } from "~/context/context";
import Modal from "./modal";

export default component$(() => {
	const videoWrapper = useSignal<HTMLElement>();
	const videoSrc = useContext(PlayerContext)

	useVisibleTask$(() => {
		if (!videoWrapper.value) return
		videoSrc.value && Player.make(videoWrapper.value, {
			source: {
				src: videoSrc.value
			},
			autoplay: true
		})
		.use([ui({
			pictureInPicture: true
		})])
		.use([OHLs()])
		.create()
	})

	return <Modal>
		<div ref={videoWrapper}></div>
		<button class="absolute top-0 left-0 hidden group-hover:block opacity-40 pb-1 px-2 bg-orange-200 hover:opacity-100"
			onClick$={() => videoSrc.value = ""}
		>
			close
		</button>
	</Modal>
})