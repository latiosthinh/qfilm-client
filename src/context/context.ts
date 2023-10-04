import { type Signal, createContextId } from "@builder.io/qwik";

export const PlayerContext = createContextId<Signal<string>>("")