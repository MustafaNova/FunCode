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
        ]
    },
};
