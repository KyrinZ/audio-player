<template>
    <div class="text-[#FAE9CF] p-8 py-10 rounded-[3.5rem] w-full max-w-[450px] relative overflow-hidden z-0 shadow-lg">

        <img class="absolute w-full h-full object-cover z-[-2]" src="https://source.unsplash.com/1600x900/?nature,water"
            alt="">
        <div class="absolute inset-0 z-[-1]" style="backdrop-filter: blur(15px);background-color: #000000ad; inset: 0;">
        </div>

        <!-- Top Nav Header -->
        <div class="flex justify-between items-center mb-4">
            <button>
                <BackIcon class="w-8 " />
            </button>
            <p>Now Playing</p>
            <button>
                <BackIcon class="w-8 rotate-180" />
            </button>
        </div>

        <audio ref="audio" :src="currentAudio.src" @timeupdate="upateTime"></audio>

        <!-- Image Banner -->
        <div class="relative overflow-hidden w-4/6 aspect-[123/121] mx-auto rounded-3xl shadow-lg shadow-gray-900 mb-8">
            <img class=" w-full h-full object-cover" src="https://source.unsplash.com/1600x900/?nature,water" alt="">
            <div class="absolute inset-0" style="box-shadow: inset 0 0 70px 50px #000000ad;"></div>
        </div>
        <h1 class="text-2xl text-center">{{ currentAudio.name }}</h1>
        <p class="text-center mb-12">{{ currentAudio.author }}</p>

        <div class="flex justify-between px-4">
            <p class="flex gap-1 items-center"> <span>
                    <PlayIcon class="w-3" />
                </span>{{ durationPassed }}</p>
            <p class="text-[#927A58]">{{ displayTotalDuration }}</p>
        </div>

        <div>
            <div class="relative aspect-square rounded-full overflow-hidden">
                <img class="w-full h-full object-cover" src="https://source.unsplash.com/1600x900/?nature,water" alt="">
                <div class="absolute inset-0 rounded-full"
                    style="backdrop-filter: blur(15px);background-color: #6f59449e; inset: 0;">
                </div>

                <svg viewBox="0 0 1726 1726" fill="none" xmlns="http://www.w3.org/2000/svg" class="absolute inset-0">

                    <circle cx="863" cy="863" r="425" fill="#997658" fill-opacity="0.78" shape-rendering="crispEdges" />
                    <circle @click="back" cx="236" cy="863" r="37" fill="#FEECD6" />
                    <circle @click="volumnUp" cx="863" cy="236" r="37" fill="#FEECD6" />
                    <circle @click="forward" cx="1490" cy="863" r="37" fill="#FEECD6" />
                    <circle @click="volumnDown" cx="863" cy="1489" r="37" fill="#FEECD6" />

                    <g @click="play">
                        <circle cx="863" cy="863" r="332" fill="url(#paint0_linear_0_1)" />
                        <path d="M872 866.5L764.75 953.536L764.75 779.464L872 866.5Z" fill="#FEECD6" />
                        <rect x="872" y="758" width="31" height="201" fill="#FEECD6" />
                        <rect x="919" y="758" width="30" height="201" fill="#FEECD6" />
                    </g>

                    <defs>
                        <linearGradient id="paint0_linear_0_1" x1="1136" y1="863" x2="604" y2="927.5"
                            gradientUnits="userSpaceOnUse">
                            <stop stop-color="#FFCD88" />
                            <stop offset="0.48" stop-color="#B47E52" />
                            <stop offset="0.74621" stop-color="#90643D" />
                            <stop offset="1" stop-color="#A37B4A" />
                        </linearGradient>
                    </defs>
                    <circle cx="863" cy="863" r="840" stroke-dashoffset="10"
                        class="stroke-[#CBAD90] stroke-[30] transition-all" :style="{
            'stroke-dasharray': 5303, 'stroke-dashoffset': displayProgressSpinner, 'stroke-linecap': 'round'
        }" />
                </svg>
            </div>

        </div>
        <p class=" px-4">0002/0069</p>
    </div>
</template>

<script setup lang="ts">
import BackIcon from "@/components/Icons/BackIcon.vue";
import PlayIcon from "@/components/Icons/PlayIcon.vue";
import { ref, computed, onMounted, reactive } from "vue";

const audio = ref<HTMLAudioElement | null>(null)
const currentAudio = reactive({
    src: 'music/HERO_One_Punch_Man_Epic_Orchestra.mp3',
    name: "Appalachian spring",
    author: "Aaron Copland",
    currentDurationPausedAt: 0,
    totalDuration: 0,
    isPlaying: false,
})

function play() {
    if (!audio.value) return
    if (audio.value.duration > 0 && !audio.value.paused) {
        audio.value.pause()
        currentAudio.isPlaying = false
    } else {
        audio.value.play()
        currentAudio.isPlaying = true
    }
}

const displayProgressSpinner = computed(() => {
    return 5303 - ((getProgress(currentAudio.currentDurationPausedAt) / 100) * (5303 - 23))
})
const displayProgressdot = computed(() => {
    const value = ((getProgress(currentAudio.currentDurationPausedAt) / 100) * 360)
    return value + 'deg'
})

const durationPassed = computed(() => {
    if (!audio.value) return '00:00'
    const minutes = Math.floor(currentAudio.currentDurationPausedAt / 60);
    const seconds = Math.floor(currentAudio.currentDurationPausedAt % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
})
const displayTotalDuration = computed(() => {
    if (!audio.value) return '00:00'
    const minutes = Math.floor(currentAudio.totalDuration / 60);
    const seconds = Math.floor(currentAudio.totalDuration % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
})


function upateTime() {
    if (!audio.value) return
    currentAudio.currentDurationPausedAt = audio.value.currentTime;
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
    currentAudio.currentDurationPausedAt = audio.value.currentTime
}
function forward() {
    if (!audio.value) return
    audio.value.currentTime = Math.min(audio.value.currentTime + 10, audio.value.duration)
    currentAudio.currentDurationPausedAt = audio.value.currentTime
}




onMounted(() => {
    setTimeout(() => {
        if (!audio.value) return
        currentAudio.totalDuration = audio.value.duration
    }, 500);
})




</script>