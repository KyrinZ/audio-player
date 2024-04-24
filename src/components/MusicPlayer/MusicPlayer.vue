<template>
  <div class="w-full max-w-[450px]">
    <SongDetail @onBack="showSongDetail = false" v-if="showSongDetail" />
    <SongList v-else />
  </div>
</template>

<script setup lang="ts">
import SongDetail from "@/components/MusicPlayer/SongDetail.vue";
import SongList from "@/components/MusicPlayer/SongList.vue";
import { useAudioStore } from "./stores/audiostore";
import { storeToRefs } from "pinia";

const { showSongDetail } = storeToRefs(useAudioStore());
</script>

<style scoped></style>
