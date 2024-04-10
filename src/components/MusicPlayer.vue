<template>
    <div class="text-white p-8 py-10 rounded-[3.5rem] w-full max-w-[500px] relative overflow-hidden"
        style="background-image: url('https://source.unsplash.com/1600x900/?nature,water');">
        <div class="absolute" style="backdrop-filter: blur(15px);background-color: #000000c7; inset: 0;"></div>

        <div class="relative z-10">
            <!-- Top Nav Header -->
            <div class="flex justify-between items-center mb-4">
                <button>
                    <BackIcon class="w-8" />
                </button>
                <p>Now Playing</p>
                <button>
                    <BackIcon class="w-8 rotate-180" />
                </button>
            </div>

            <audio ref="audio" src="sample.music.mp3" @timeupdate="upateTime"></audio>

            <!-- Image Banner -->
            <img class="rounded-3xl w-4/6 aspect-square object-cover mx-auto mb-4"
                src="https://source.unsplash.com/1600x900/?nature,water" alt="">
            <h1 class="text-2xl text-center">Appalachian spring</h1>
            <p class="text-center mb-8">Aaron Copland</p>

            <div class="flex justify-between px-4">
                <p class="flex gap-1 items-center"> <span>
                        <PlayIcon class="w-3" />
                    </span>{{ durationPassed }}</p>
                <p class="text-gray-400">{{ duration }}</p>
            </div>

            <div>
                <svg class="w-4/6 mx-auto rotate-[270deg]" viewBox="0 0 100 100">
                    <defs>
                        <filter id="f2" x="0" y="0" xmlns="http://www.w3.org/2000/svg">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="55" />
                        </filter>
                        <clipPath id="myCircle">
                            <circle filter="url(#f2)" cx="50" cy="50" r="45" fill="#FFFFFF" />
                        </clipPath>
                    </defs>
                    <image transform="rotate(90, 50 50)" width="200" height="120"
                        xlink:href="https://source.unsplash.com/1600x900/?nature,water" clip-path="url(#myCircle)" />

                    <circle cx="50" cy="50" r="45" fill="#463627de"></circle>
                    <circle cx="50" cy="50" r="45" s troke-dashoffset="10"
                        class="stroke-[#CBAD90] stroke-[2] transition-all" :style="{
                'stroke-dasharray': 440, 'stroke-dashoffset': displayProgressSpinner, 'stroke-linecap': 'round'
            }" fill="transparent"></circle>
                    <circle :style="{
                'rotate': displayProgressdot,
                'transform-origin': '50%'
            }" cx="95" cy="50" r="2" fill="#FEEED4"></circle>
                    <circle @click="back" class="cursor-pointer" cx="50" cy="20" r="3" fill="#FEEED4"></circle>
                    <circle @click="forward" class="cursor-pointer" cx="50" cy="80" r="3" fill="#FEEED4"></circle>
                    <circle @click="volumnDown" class="cursor-pointer" cx="20" cy="50" r="3" fill="#FEEED4"></circle>
                    <circle @click="volumnUp" class="cursor-pointer" cx="80" cy="50" r="3" fill="#FEEED4"></circle>
                    <g @click="play" class="cursor-pointer">
                        <circle cx="50" cy="50" r="20" fill="#624B33"></circle>
                        <circle cx="50" cy="50" r="15" fill="#E4A06B"></circle>
                        <polygon v-if="isPlaying" points="45,45 55,45 50,55" fill="#fff" />

                        <line v-if="!isPlaying" x1="55" y1="48" x2="45" y2="48" stroke="#fff" stroke-width="2" />
                        <line v-if="!isPlaying" x1="55" y1="53" x2="45" y2="53" stroke="#fff" stroke-width="2" />
                    </g>

                </svg>
            </div>
            <p class=" px-4">0002/0069</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import BackIcon from "@/components/Icons/BackIcon.vue";
import PlayIcon from "@/components/Icons/PlayIcon.vue";
import { ref, computed, onMounted } from "vue";

const audio = ref<HTMLAudioElement | null>(null)
const currentTime = ref(0)
const duration = ref('00:00')
const isPlaying = ref(false)

function play() {
    if (!audio.value) return
    if (audio.value.duration > 0 && !audio.value.paused) {
        audio.value.pause()
        isPlaying.value = false
    } else {
        audio.value.play()
        isPlaying.value = true
    }
}

const displayProgressSpinner = computed(() => {
    return 440 - ((getProgress(currentTime.value) / 100) * (440 - 158))
})
const displayProgressdot = computed(() => {
    const value = ((getProgress(currentTime.value) / 100) * 360)
    return value + 'deg'
})

const durationPassed = computed(() => {
    if (!audio.value) return '00:00'
    const minutes = Math.floor(currentTime.value / 60);
    const seconds = Math.floor(currentTime.value % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
})



function upateTime() {
    if (!audio.value) return
    currentTime.value = audio.value.currentTime;
}

function getProgress(currentTime: number) {
    if (!audio.value) return 0
    const duration = audio.value.duration;
    return (currentTime / duration) * 100;
}

function volumnUp() {
    if (!audio.value) return
    audio.value.volume = Math.min(audio.value.volume + (audio.value.volume * 0.5), 1)
}
function volumnDown() {
    if (!audio.value) return
    audio.value.volume = Math.max(audio.value.volume - (audio.value.volume * 0.5), 0)
}

function back() {
    if (!audio.value) return
    audio.value.currentTime = Math.max(audio.value.currentTime - 10, 0)
    currentTime.value = audio.value.currentTime
}
function forward() {
    if (!audio.value) return
    audio.value.currentTime = Math.min(audio.value.currentTime + 10, audio.value.duration)
    currentTime.value = audio.value.currentTime
}




onMounted(() => {
    setTimeout(() => {
        if (!audio.value) return
        const minutes = Math.floor(audio.value.duration / 60);
        const seconds = Math.floor(audio.value.duration % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        duration.value = `${minutes}:${returnedSeconds}`;
    }, 500);
})




</script>