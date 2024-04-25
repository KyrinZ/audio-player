import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { musics } from "../data/music-data";

export const useAudioStore = defineStore("AudioStore", () => {
  const songList = ref(musics);
  const selectedAudio = ref(new Audio());
  const progress = ref(0);
  const showSongDetail = ref(false);
  const thumbnail = ref("");
  const cIndex = ref(-1);
  const audioPaused = ref(true);
  const volume = ref(1);

  function playAudio(item: any, index: number) {
    resetAudio();
    thumbnail.value = item.thumbnail;
    cIndex.value = index;
    selectedAudio.value.src = item.path;
    selectedAudio.value.title = item.name;
    selectedAudio.value.dataset.author = item.author;
    selectedAudio.value.dataset.index = index.toString();

    selectedAudio.value.oncanplaythrough = () => {
      showSongDetail.value = true;
      selectedAudio.value.play();
      audioPaused.value = false;
    };

    selectedAudio.value.ontimeupdate = () => {
      const duration = selectedAudio.value.duration;
      progress.value = !Number.isNaN(duration)
        ? (selectedAudio.value.currentTime / duration) * 100
        : 0;
      if (selectedAudio.value.currentTime >= duration) {
        playNextAudio();
      }
    };
  }

  function playNextAudio() {
    let currentIndex = -2;
    try {
      currentIndex = parseInt(selectedAudio.value.dataset.index ?? "-2");
    } catch (error) {}

    const audioItem = songList.value[currentIndex + 1];
    if (!audioItem) return;
    playAudio(audioItem, currentIndex + 1);
  }
  function playPrevAudio() {
    let currentIndex = -2;
    try {
      currentIndex = parseInt(selectedAudio.value.dataset.index ?? "-2");
    } catch (error) {}

    const audioItem = songList.value[currentIndex - 1];
    if (!audioItem) return;
    playAudio(audioItem, currentIndex - 1);
  }

  function resetAudio() {
    selectedAudio.value.pause();
    selectedAudio.value.currentTime = 0;
    selectedAudio.value.src = "";
    selectedAudio.value.title = "";
    selectedAudio.value.dataset.author = "";
    selectedAudio.value.dataset.index = "";
    selectedAudio.value.oncanplaythrough = null;
    selectedAudio.value.ontimeupdate = null;
    progress.value = 0;
    cIndex.value = -1;
    thumbnail.value = "";
  }

  function togglePlayback() {
    if (selectedAudio.value.duration > 0 && !selectedAudio.value.paused) {
      selectedAudio.value.pause();
      audioPaused.value = true;
    } else {
      selectedAudio.value.play();
      audioPaused.value = false;
    }
  }

  function volumeUp() {
    console.log(selectedAudio.value.volume);

    if (!selectedAudio.value) return;
    selectedAudio.value.volume = Math.min(
      selectedAudio.value.volume +  0.05,
      1
    );
    volume.value = selectedAudio.value.volume;
  }
  function volumeDown() {
    if (!selectedAudio.value) return;
    selectedAudio.value.volume = Math.max(
      selectedAudio.value.volume -  0.05,
      0
    );
    volume.value = selectedAudio.value.volume;
  }

  function rewindFiveSeconds() {
    selectedAudio.value.currentTime = Math.max(
      selectedAudio.value.currentTime - 10,
      0
    );
  }
  function fastForwardFiveSeconds() {
    selectedAudio.value.currentTime = Math.min(
      selectedAudio.value.currentTime + 10,
      selectedAudio.value.duration
    );
  }

  return {
    playAudio,
    playNextAudio,
    playPrevAudio,
    songList,
    selectedAudio,
    progress,
    showSongDetail,
    togglePlayback,
    volumeUp,
    volumeDown,
    rewindFiveSeconds,
    fastForwardFiveSeconds,
    thumbnail,
    cIndex,
    audioPaused,
    volume,
  };
});
