import { component$ } from "@builder.io/qwik";
import { type TOphimDetailData } from "~/types/ophim.type";

export default component$(({movieData}: {movieData: TOphimDetailData}) => {
	return <>
		<table>
			<tbody>
				{movieData.movie.category.length &&
				<tr>
					<td width={150} class="align-top py-2 opacity-70">Thể loại</td>
					<td class="align-top py-2">{movieData.movie.category.map((g, gIndex) => <span key={g.id}>{gIndex!==0 ? `, ${g.name}` : `${g.name}`}</span>)}</td>
				</tr>
				}
				{movieData.movie.country.length > 0 &&
				<tr class="border-zinc-900 border-t-[1px]">
					<td width={150} class="align-top py-2 opacity-70">Quốc gia</td>
					<td class="align-top py-2">{movieData.movie.country.map((g, gIndex) => <span key={g.id}>{gIndex!==0 ? `, ${g.name}` : `${g.name}`}</span>)}</td>
				</tr>
				}
				{movieData.movie.director.filter(item => item).length > 0 &&
				<tr class="border-zinc-900 border-t-[1px]">
					<td width={150} class="align-top py-2 opacity-70">Đạo diễn</td>
					<td class="align-top py-2">{movieData.movie.director.map((g, gIndex) => <span key={gIndex}>{gIndex!==0 ? `, ${g}` : `${g}`}</span>)}</td>
				</tr>
				}
				{movieData.movie.actor.filter(item => item).length > 0 &&
				<tr class="border-zinc-900 border-t-[1px]">
					<td width={150} class="align-top py-2 opacity-70">Diễn viên</td>
					<td class="align-top py-2">{movieData.movie.actor.map((g, gIndex) => <span key={gIndex}>{gIndex!==0 ? `, ${g}` : `${g}`}</span>)}</td>
				</tr>
				}
			</tbody>
		</table>
	</>
})