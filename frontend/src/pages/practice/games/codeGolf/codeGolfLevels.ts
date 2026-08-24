import type { PracticeLevelCardData } from '../../../../types/practiceLevelCardData.ts';
import oceanBreezeImg from '../../../../assets/practice/codeGolf/ocean-breeze.png';
import alpineFairwayImg from '../../../../assets/practice/codeGolf/alpine-fairway.png';
import desertSunsetImg from '../../../../assets/practice/codeGolf/desert-sunset.png';


export const CODE_GOLF_LEVELS: PracticeLevelCardData[] = [
    {
        id: 'ocean-breeze',
        name: 'Ocean Breeze',
        level: 1,
        image: oceanBreezeImg,
        imgAlt: 'Ocean Breeze code golf level'
    },
    {
        id: 'alpine-fairway',
        name: 'Alpine Fairway',
        level: 2,
        image: alpineFairwayImg,
        imgAlt: 'Alpine Fairway code golf level'
    },
    {
        id: 'desert-sunset',
        name: 'Desert Sunset',
        level: 3,
        image: desertSunsetImg,
        imgAlt: 'Desert sunset code golf level'
    },
]