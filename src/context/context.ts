import { type Signal, createContextId } from "@builder.io/qwik";

// must give context a unique name
export const PlayerContext = createContextId<Signal<string>>("video-player-context")

export const DraggingContext = createContextId<Signal<boolean>>("slider-dragging-context")