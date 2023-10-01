import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import HeroSlider from "~/components/home/hero";

export default component$(() => {
  return (
      <HeroSlider />
  );
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
