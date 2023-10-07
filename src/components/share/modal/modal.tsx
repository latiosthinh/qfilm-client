import { Slot, component$ } from "@builder.io/qwik";

export default component$(() => {
	return <div class="fixed top-0 right-0 z-50 w-[700px] border-orange-200 border-2 group">
		<Slot />
	</div>
})