import type { NoSerialize} from "@builder.io/qwik";
import { Resource, component$, noSerialize, useResource$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import HeroSlider from "~/components/home/hero";
import GroupByType from "~/components/home/goup-by-type";
import { SpinnerIcon } from "~/components/share/icons/video";
import { useGetTypes } from "~/firebase/ultis";
import type { TMovieType } from "~/types/common.type";

export default component$(() => {
  const getTypeData = useGetTypes()
  const types = useResource$<NoSerialize<any>>(async () => {
    const data = await getTypeData;
    return noSerialize(data?.docs)
  });

  return <>
    <HeroSlider />
    
    <Resource
      value={types}
      onPending={() => <SpinnerIcon />}
      onRejected={() => <p>Failed to load data</p>}
      onResolved={(types: TMovieType[]) => {
          return <>
              {types.map(t => 
                  <GroupByType key={t.data().slug} title={t.data().name} slug={t.data().slug} />
              )}
          </>
      }}
    />

  </>
});

export const head: DocumentHead = {
  title: "CineBOLT",
  meta: [
    {
      name: "description",
      content: "Tổng hợp phim hành động, kinh dị, trinh thám, tình cảm, hài hước, viễn tưởng, cổ trang",
    },
  ],
};
