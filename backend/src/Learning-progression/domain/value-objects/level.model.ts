export interface LevelModel {
    tabs: {
        goal: GoalTab;
        concept: ConceptTab;
        quiz: QuizTab[];
        task: TaskTab;
    };
}

export interface GoalTab {
    subtitle: string;
    title: string;
    objectives: string[];
    hint: string;
}

export interface ConceptTab {
    title: string;
    subtitle: string;
    icon: Icon;
    unitOneTitle: string;
    unitOne: string;
    unitOneNote: string;
    visualOne: string;
    keyPointsTitle: string;
    keyPointsSubtitle: string;
    pointOneTitle: string;
    pointOneContent: string;
    pointTwoTitle: string;
    pointTwoContent: string;
    pointThreeTitle: string;
    pointThreeContent: string;
    unitTwoTitle: string;
    unitTwo: string;
    unitTwoNote: string;
    visualTwo: string;
}

export interface QuizTab {
    question: string;
    hint: string;
    answers: string[];
    correct: number;
    correctMsg: string;
    falseMsg: string;
}

export interface TaskTab {
    title: string;
    subtitle: string;
    goals: string[];
    hint: string;
}

interface Icon {
    name: string;
    className: string;
}
