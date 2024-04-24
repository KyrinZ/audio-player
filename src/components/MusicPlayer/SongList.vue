<template>
  <div
    class="text-[#FAE9CF] p-8 py-10 rounded-[3.5rem] w-full max-w-[450px] relative overflow-hidden z-0 shadow-lg h-[59rem] flex flex-col"
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

    <div class="flex items-center gap-4 mb-10" v-if="thumbnail !== ''">
      <img
        class="w-32 rounded-full aspect-square object-cover"
        :src="thumbnail"
        alt=""
      />
      <div>
        <p class="text-2xl">{{ selectedAudio.title }}</p>
        <p>{{ selectedAudio.dataset.author }}</p>
      </div>
    </div>

    <!-- Top Nav Header -->
    <div class="flex justify-center items-center mb-8">
      <p>Tracklist</p>
    </div>

    <hr class="mb-8" />

    <div
      class="flex flex-col gap-4 flex-1 overflow-y-auto"
      v-if="songList.length > 0"
    >
      <div
        class="flex gap-6 cursor-pointer"
        :class="
          cIndex === index && !audioPaused ? 'text-[#A48360]' : ''
        "
        v-for="(item, index) in songList"
        :key="item.path"
        @click="onSelect(item, index)"
      >
        <PauseIcon
          v-if="cIndex === index && !audioPaused"
          class="w-8"
        />
        <PlayIcon v-else class="w-8" />
        <div>
          <p class="font-bold">{{ item.name }}</p>
          <p class="font-thin">{{ item.author }}</p>
        </div>
      </div>
    </div>

    <div class="flex-1" v-else>No tracks.</div>

    <div class="flex justify-center gap-8 p-4 border-t mt-8">
      <button><SearchIcon class="w-8" /></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import PlayIcon from "@/components/MusicPlayer/Icons/PlayIcon.vue";
import PauseIcon from "@/components/MusicPlayer/Icons/PauseIcon.vue";
import SearchIcon from "@/components/MusicPlayer/Icons/SearchIcon.vue";
import { useAudioStore } from "./stores/audiostore";
import { storeToRefs } from "pinia";

const { playAudio, togglePlayback } = useAudioStore();
const { songList, thumbnail, selectedAudio, cIndex, audioPaused } = storeToRefs(
  useAudioStore()
);

function onSelect(item: any, index: number) {
  if (cIndex.value === index && !audioPaused.value) {
    togglePlayback();
  } else {
    playAudio(item, index);
  }
}
</script>
