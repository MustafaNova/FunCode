import type { LevelStep } from './types.ts';
import { faBook, faBullseye, faCode, faQuestion } from '@fortawesome/free-solid-svg-icons';

export const steps: LevelStep[] = [
    { icon: faBullseye, tab: "goal"},
    { icon: faBook, tab: "concept"},
    { icon: faQuestion, tab: "quiz"},
    { icon: faCode, tab: "task"},
];