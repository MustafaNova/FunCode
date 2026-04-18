export interface ConceptTabDto {
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

interface Icon {
    name: string;
    className: string;
}
