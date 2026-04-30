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
};
