import { Slot, component$ } from "@builder.io/qwik";

export default component$(() => {
	return <div class="fixed top-0 right-0 z-50 w-[700px] shadow-md shadow-zinc-900">
		<Slot />
	</div>
})