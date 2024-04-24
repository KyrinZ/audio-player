<template>
  <div
    class="text-[#FAE9CF] p-8 py-10 rounded-[3.5rem] w-full max-w-[450px] relative overflow-hidden z-0 shadow-lg"
  >
    <img
      class="absolute inset-0 w-full h-full object-cover z-[-2]"
      :src="thumbnail"
      alt=""
    />

    <div
      class="absolute inset-0 z-[-1]"
      style="backdrop-filter: blur(15px); background-color: #000000ad; inset: 0"
    ></div>

    <!-- Top Nav Header -->
    <div class="flex justify-between items-center mb-4">
      <button @click="playPrevAudio">
        <BackIcon class="w-8" />
      </button>
      <p class="cursor-pointer" @click="emit('onBack')">Now Playing</p>
      <button @click="playNextAudio">
        <BackIcon class="w-8 rotate-180" />
      </button>
    </div>

    <!-- Image Banner -->
    <div
      class="relative overflow-hidden w-4/6 aspect-[123/121] mx-auto rounded-3xl shadow-lg shadow-gray-900 mb-8"
    >
      <img
        class="w-full h-full object-cover"
        :src="thumbnail"
        alt=""
      />
      <div
        class="absolute inset-0"
        style="box-shadow: inset 0 0 70px 50px #000000ad"
      ></div>
    </div>
    <h1 class="text-2xl text-center">{{ selectedAudio.title }}</h1>
    <p class="text-center mb-12">{{ selectedAudio.dataset.author }}</p>

    <div class="flex justify-between px-4">
      <p class="flex gap-1 items-center">
        <span> <PlayIcon class="w-3" /> </span>{{ durationPassed }}
      </p>
      <p class="text-[#927A58]">{{ displayTotalDuration }}</p>
    </div>
    <div>
      <Controls
        :progress="progress"
        @on-back="rewindFiveSeconds"
        @on-forward="fastForwardFiveSeconds"
        @on-volume-up="volumeUp"
        @on-volume-down="volumeDown"
        @on-play="togglePlayback"
      />
    </div>
    <p class="px-4">{{ currentSongNumber }}/{{ totalSongCount }}</p>
  </div>
</template>

<script setup lang="ts">
import BackIcon from "@/components/MusicPlayer/Icons/BackIcon.vue";
import PlayIcon from "@/components/MusicPlayer/Icons/PlayIcon.vue";
import Controls from "@/components/MusicPlayer/Controls.vue";
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useAudioStore } from "./stores/audiostore";

const emit = defineEmits(["onPlay", "onBack"]);

const { progress, selectedAudio, songList, thumbnail } = storeToRefs(
  useAudioStore()
);
const {
  fastForwardFiveSeconds,
  rewindFiveSeconds,
  togglePlayback,
  volumeUp,
  volumeDown,
  playNextAudio,
  playPrevAudio,
} = useAudioStore();

const durationPassed = computed(() => {
  progress.value;
  const minutes = Math.floor(selectedAudio.value.currentTime / 60);
  const seconds = Math.floor(selectedAudio.value.currentTime % 60);
  const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${minutes}:${returnedSeconds}`;
});
const displayTotalDuration = computed(() => {
  progress.value;
  if (Number.isNaN(selectedAudio.value.duration)) return "00:00";
  const minutes = Math.floor(selectedAudio.value.duration / 60);
  const seconds = Math.floor(selectedAudio.value.duration % 60);
  const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

  return `${minutes}:${returnedSeconds}`;
});

const totalSongCount = computed(() => {
  return String(songList.value.length).padStart(4, "0");
});
const currentSongNumber = computed(() => {
  progress.value;
  let currentIndex = -1;
  try {
    currentIndex = parseInt(selectedAudio.value.dataset.index ?? "-1");
  } catch (error) {}

  return String(currentIndex + 1).padStart(4, "0");
});
</script>
