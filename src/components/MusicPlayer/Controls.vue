<template>
  <div
    class="relative z-0 aspect-square before:absolute before:inset-0 before:rounded-full before:backdrop-blur-lg before:bg-[#6f59449e] before:z-[-1] shadow-sm before:scale-[1.005]"
  >
    <img
      class="absolute inset-0 w-full h-full object-cover rounded-full z-[-2]"
      src="https://source.unsplash.com/1600x900/?nature,water"
      alt=""
    />

    <div class="grid grid-rows-3 grid-cols-3 place-items-center h-full">
      <div
        @click="emit('onBack')"
        class="w-6 aspect-square rounded-full bg-[#FEECD6] shadow-lg cursor-pointer row-start-2"
      ></div>
      <div
        @click="emit('onForward')"
        class="w-6 aspect-square rounded-full bg-[#FEECD6] shadow-lg cursor-pointer row-start-2 col-start-3"
      ></div>
      <div
        @click="emit('onVolumeUp')"
        class="w-6 aspect-square rounded-full bg-[#FEECD6] shadow-lg cursor-pointer col-start-2"
      ></div>
      <div
        @click="emit('onVolumeDown')"
        class="w-6 aspect-square rounded-full bg-[#FEECD6] shadow-lg cursor-pointer row-start-3 col-start-2"
      ></div>
      <div
        class="row-start-2 relative z-0 h-full w-full rounded-full before:absolute before:inset-0 before:rounded-full before:backdrop-blur-lg before:bg-[#997658c4] before:z-[-1] before:scale-[1.005] shadow-sm"
      >
        <img
          class="absolute inset-0 w-full h-full object-cover rounded-full z-[-2]"
          src="https://source.unsplash.com/1600x900/?nature,water"
          alt=""
        />
        <div
          class="aspect-square rounded-full m-4 flex items-center justify-center cursor-pointer"
          style="
            background: linear-gradient(
              263.09deg,
              #ffcd88 13.33%,
              #b47e52 48.13%,
              #90643d 67.44%,
              #a37b4a 85.84%
            );
          "
          @click="emit('onPlay')"
        >
          <svg class="w-8" viewBox="0 0 185 201" fill="none">
            <path
              d="M108 108.5L0.750007 195.536L0.750015 21.4644L108 108.5Z"
              fill="#FEECD6"
            />
            <rect x="108" width="31" height="201" fill="#FEECD6" />
            <rect x="155" width="30" height="201" fill="#FEECD6" />
          </svg>
        </div>
      </div>
    </div>
    <svg
      class="absolute inset-0 h-full w-full scale-[1.07] rotate-90 pointer-events-none"
      viewBox="0 0 100 100"
    >
      <defs>
        <linearGradient
          id="paint0_linear_26_2"
          x1="105.5"
          y1="99.5"
          x2="-16"
          y2="-44"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FFCD88" />
          <stop offset="1" stop-color="#B47E52" />
        </linearGradient>
      </defs>
      <circle
        cx="50"
        cy="50"
        r="47"
        stroke="url(#paint0_linear_26_2)"
        :style="{
          fill: 'transparent',
          strokeWidth: 1.5,
          strokeLinecap: 'round',
          strokeDasharray: 440,
          strokeDashoffset: displayProgressSpinner,
        }"
      />
      <circle
        cx="97"
        cy="50"
        r="2"
        :style="{
          fill: '#B47E52',
          transformOrigin: 'center',
          rotate: displayProgressDot,
        }"
      />
    </svg>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";

export interface Props {
  progress?: number;
}

const props = withDefaults(defineProps<Props>(), {
  progress: 0,
});

const emit = defineEmits([
  "onBack",
  "onForward",
  "onVolumeUp",
  "onVolumeDown",
  "onPlay",
]);

const displayProgressSpinner = computed(() => {
  return 440 - (props.progress / 100) * (440 - 140);
});
const displayProgressDot = computed(() => {
  const value = Math.min((props.progress / 100) * 366, 360);
  return value + "deg";
});
</script>
