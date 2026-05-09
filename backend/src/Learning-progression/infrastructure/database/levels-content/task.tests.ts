import { TaskTest } from '../../../domain/types/task.test';

export const TASK_TESTS: Record<string, TaskTest> = {
    HELLO_WEB: {
        type: 'htmlE2E',
        checks: [
            {
                type: 'element_exists',
                selector: 'h1',
                text: 'Hallo Web!',
            },
            {
                type: 'element_exists',
                selector: 'button',
                text: 'Klick',
            },
            {
                type: 'interaction',
                action: 'click',
                target: 'button',
                result: {
                    selector: '#result',
                    text: 'Geklicked',
                },
            },
        ],
    },
    CHANGE: {
        type: 'htmlE2E',
        checks: [
            {
                type: 'element_exists',
                selector: 'h1',
                text: 'Meine Seite',
            },
            {
                type: 'element_exists',
                selector: 'button',
                text: 'Ändern',
            },
            {
                type: 'interaction',
                action: 'click',
                target: 'button',
                result: {
                    selector: '#result',
                    text: 'Geändert!',
                },
            },
        ],
    },
    TOGGLE_VISIBILITY: {
        type: 'htmlE2E',
        checks: [
            {
                type: 'element_exists',
                selector: 'span',
                text: 'Hallo Welt',
            },
            {
                type: 'element_exists',
                selector: 'button',
                text: 'Toggle',
            },
            {
                type: 'element_visibility_changes',
                selector: 'span',
                trigger: {
                    event: 'click',
                    selector: 'button',
                },
            },
        ],
    },
    INPUT_PREVIEW: {
        type: 'htmlE2E',
        checks: [
            {
                type: 'element_exists',
                selector: 'input',
            },
            {
                type: 'element_exists',
                selector: 'p',
            },
            {
                type: 'input_sync',
                inputId: '#input',
                targetId: '#output',
            },
        ],
    },
    FORM_SUBMIT: {
        type: 'htmlE2E',
        checks: [
            {
                type: 'element_exists',
                selector: 'input#name',
            },
            {
                type: 'element_exists',
                selector: 'button',
                text: 'Senden',
            },
            {
                type: 'element_exists',
                selector: 'p#result',
            },
            {
                type: 'formGreeting',
                inputSelector: 'input#name',
                buttonSelector: 'button',
                targetSelector: 'p#result',
                inputValue: 'Name',
                expectedValue: 'Hallo, Name',
            },
        ],
    },
    COUNTER: {
        type: 'htmlE2E',
        checks: [
            {
                type: 'element_exists',
                selector: 'p#count',
                text: '0',
            },
            {
                type: 'element_exists',
                selector: 'button',
                text: '+',
            },
            {
                type: 'counterIncrement',
                buttonSelector: 'button',
                counterSelector: 'p#count',
                incrementBy: 1,
            },
        ],
    },
    COLOR_PICKER: {
        type: 'htmlE2E',
        checks: [
            {
                type: 'inputType',
                selector: 'input',
                expectedInputType: 'color',
            },
            {
                type: 'backgroundColorChange',
                inputSelector: 'input',
            },
        ],
    },
    RANDOM_NUMBER: {
        type: 'htmlE2E',
        checks: [
            {
                type: 'element_exists',
                selector: 'button',
                text: 'Zufall',
            },
            {
                type: 'element_exists',
                selector: 'p#result',
            },
            {
                type: 'randomNumber',
                buttonSelector: 'button',
                targetSelector: 'p#result',
                min: 1,
                max: 10,
            },
        ],
    },
    CHAR_COUNTER: {
        type: 'htmlE2E',
        checks: [
            {
                type: 'element_exists',
                selector: 'textarea',
            },
            {
                type: 'element_exists',
                selector: 'p#count',
            },
            {
                type: 'charCount',
                inputSelector: 'textarea',
                targetSelector: 'p#count',
            },
        ],
    },
};
