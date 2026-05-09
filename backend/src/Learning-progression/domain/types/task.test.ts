export type TaskTest = {
    type: 'htmlStatic' | 'htmlE2E' | 'js' | 'python';
    checks: Check[];
};

export type ElementExistsCheck = {
    type: 'element_exists';
    selector: string;
    text?: string;
};

export type InteractionCheck = {
    type: 'interaction';
    action: 'click';
    target: string;
    result: {
        selector: string;
        text: string;
    };
};

export type ElementVisibilityChangesCheck = {
    type: 'element_visibility_changes';
    selector: string;
    trigger: {
        event: 'click';
        selector: string;
    };
};

export type InputSync = {
    type: 'input_sync';
    inputId: string;
    targetId: string;
};

export type FormGreeting = {
    type: 'formGreeting';
    inputSelector: string;
    buttonSelector: string;
    targetSelector: string;
    inputValue: string;
    expectedValue: string;
};

export type CounterIncrement = {
    type: 'counterIncrement';
    buttonSelector: string;
    counterSelector: string;
    incrementBy: number;
};

export type InputType = {
    type: 'inputType';
    selector: string;
    expectedInputType: string;
};

export type BackgroundColorChange = {
    type: 'backgroundColorChange';
    inputSelector: string;
};

export type RandomNumber = {
    type: 'randomNumber';
    buttonSelector: string;
    targetSelector: string;
    min: number;
    max: number;
};

export type CharCount = {
    type: 'charCount';
    inputSelector: string;
    targetSelector: string;
};

export type Check =
    | ElementExistsCheck
    | InteractionCheck
    | ElementVisibilityChangesCheck
    | InputSync
    | FormGreeting
    | CounterIncrement
    | InputType
    | BackgroundColorChange
    | RandomNumber
    | CharCount;
