import { component$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { Logo } from "./icons/logo";
import { BoltIcon, CategoryIcon, FlagIcon, HomeIcon } from "./icons/navigation";


export default component$(() => {
	const location = useLocation()
	const navItemClasses = "flex items-center gap-4 pl-4 py-4 mb-4 hover:bg-black"
    const navItemActiveClasses = `${navItemClasses} border-orange-200 border-r-[3px] text-orange-200 bg-black`

	return (
		<div class="sticky z-10 top-0 left-0 bg-zinc-900 h-[100vh]">
			<Link href="/" title="fire film" class="px-4 py-8 mb-10 flex items-center gap-3">
				<Logo width="30" height="30" />
				<div>Cine<strong>BOLT</strong></div>
			</Link>

			<ul>
				<li>
					<Link href="/" class={location.url.pathname === "/" ? navItemActiveClasses : navItemClasses}>
						<HomeIcon />
						<span class="text-">Khám phá</span>
					</Link>
				</li>

				<li>
					<Link href="/" class={location.url.pathname === "2" ? navItemActiveClasses : navItemClasses}>
						<FlagIcon />
						<span class="text-">Quốc gia</span>
					</Link>
				</li>

				<li>
					<Link href="/" class={location.url.pathname === "1" ? navItemActiveClasses : navItemClasses}>
						<CategoryIcon />
						<span class="text-">Thể loại</span>
					</Link>
				</li>
			</ul>

			<button class="flex items-center justify-center gap-2 
				absolute bottom-4 left-1/2 -translate-x-1/2
				px-6 py-2 bg-orange-200 rounded-[4px]
				text-center whitespace-nowrap
				hover:opacity-90">
				<BoltIcon />
				<span>Zap me!</span>
			</button>

			{/* <Resource
				value={genresData}
				onPending={() => <p>Loading...</p>}
				onRejected={() => <p>Failed to load data</p>}
				onResolved={(genres) => {
				return (
					<ul>
						{genres.map((g: IGenre) => <li class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-orange-200" key={g.data().id}>{g.data().name}</li>)}
					</ul>
				);
			}} /> */}
		</div>
	)
});