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

            <!-- Image Banner -->
            <img class="rounded-3xl w-4/6 aspect-square object-cover mx-auto mb-4"
                src="https://source.unsplash.com/1600x900/?nature,water" alt="">
            <h1 class="text-2xl text-center">Appalachian spring</h1>
            <p class="text-center mb-8">Aaron Copland</p>

            <div class="flex justify-between px-4">
                <p class="flex gap-1 items-center"> <span>
                        <PlayIcon class="w-3" />
                    </span> 22:39</p>
                <p class="text-gray-400">26:07</p>
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
                    <image transform="rotate(90, 50 50)" width="200" height="-90"
                        xlink:href="https://source.unsplash.com/1600x900/?nature,water" clip-path="url(#myCircle)" />

                    <circle cx="50" cy="50" r="45" fill="#463627de"></circle>
                    <circle cx="50" cy="50" r="45" s troke-dashoffset="10" class="stroke-[#CBAD90] stroke-[2]" style="
                stroke-dasharray: 440; stroke-dashoffset:400;stroke-linecap: round;" fill="transparent"></circle>
                    <circle cx="50" cy="20" r="3" fill="#FEEED4"></circle>
                    <circle cx="50" cy="80" r="3" fill="#FEEED4"></circle>
                    <circle cx="20" cy="50" r="3" fill="#FEEED4"></circle>
                    <circle cx="80" cy="50" r="3" fill="#FEEED4"></circle>
                    <circle cx="50" cy="50" r="20" fill="#624B33"></circle>
                    <circle cx="50" cy="50" r="15" fill="#E4A06B"></circle>
                    <polygon points="45,40 55,40 50,50" fill="#fff" />
                    <line x1="55" y1="53" x2="45" y2="53" stroke="#fff" stroke-width="1" />
                    <line x1="55" y1="56" x2="45" y2="56" stroke="#fff" stroke-width="1" />

                </svg>
            </div>
            <p class=" px-4">0002/0069</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import BackIcon from "@/components/Icons/BackIcon.vue";
import PlayIcon from "@/components/Icons/PlayIcon.vue";

</script>