import { component$, useContext, useSignal, useStore, useTask$, useVisibleTask$ } from "@builder.io/qwik";
import Modal from "./modal";
import Player from '@oplayer/core'
import ui from '@oplayer/ui'
import OHLs from '@oplayer/hls'
import { PlayerContext } from "~/context/context";

export default component$(() => {
	const videoWrapper = useSignal<HTMLElement>();
	const videoSrc = useContext(PlayerContext)

	useTask$(async (taskContext) => {
		taskContext.track(() => videoSrc.value);
	})

	useVisibleTask$(() => {
		if (!videoWrapper.value) return
		videoSrc.value && Player.make(videoWrapper.value, {
			source: {
				src: videoSrc.value
			}
		})
		.use([ui({
			pictureInPicture: true
		})])
		.use([OHLs()])
		.create()
	})

	return <Modal>
		<div ref={videoWrapper}></div>
	</Modal>
})