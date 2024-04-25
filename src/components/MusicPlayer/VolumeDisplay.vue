<template>
  <div v-if="show" class="bg-white text-black p-2 rounded-md w-fit absolute top-8 left-8">
    <div class="h-28 w-1 bg-gray-200 flex flex-col-reverse">
      <div
        class="w-full bg-red-600"
        :style="{ height: volume * 100 + '%' }"
      ></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useAudioStore } from "./stores/audiostore";
import { ref, watch } from "vue";

const { volume } = storeToRefs(useAudioStore());
const show = ref(false);
const timeout = ref<number | undefined>(undefined);

watch(volume, async (newVolume, oldVolume) => {
  show.value = true;
    clearTimeout(timeout.value);
    timeout.value = setTimeout(() => {
      show.value = false;
    }, 5000);
});
</script>
