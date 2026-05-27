import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type LevelTabs = "goal" | "concept" | "quiz" | "task"
export type LevelStep = {
    icon: IconDefinition;
    tab: LevelTabs
}