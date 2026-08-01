import bugHunterImg from '../../assets/practice/bug-hunter.png';
import codeGolfImg from '../../assets/practice/code-golf.png';


const bugHunterTitle = 'Bug Hunter';
const bugHunterDescription = 'Find and fix bugs in code as quickly and accurately as possible';

const codeGolfTitle = 'Code Golf';
const codeGolfDescription = 'Solve coding challenges using as few characters of code as possible';

export const PRACTICE_GAME_MODES: gameModes = [
    {
        name: bugHunterTitle,
        description: bugHunterDescription,
        img: bugHunterImg,
        imgAlt: 'Bug Hunter game mode',
        available: true,
        route: 'bug-hunter'
    },
    {
        name: codeGolfTitle,
        description: codeGolfDescription,
        img: codeGolfImg,
        imgAlt: 'Code Golf game mode',
        available: false,
        route: 'code-golf'
    }
]


export type gameModes = {
    name: string,
    description: string,
    img: string,
    imgAlt: string,
    available: boolean,
    route: string,
}[]