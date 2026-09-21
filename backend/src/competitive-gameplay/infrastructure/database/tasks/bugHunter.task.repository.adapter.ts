import { BugHunterTaskRepositoryPort } from '../../../application/ports/outbound/bugHunter.task.repository.port';
import { Injectable } from '@nestjs/common';
import { BugHunterTask } from '@funcode/shared';

@Injectable()
export class BugHunterTaskRepositoryAdapter implements BugHunterTaskRepositoryPort {

    getRandomTask(): BugHunterTask {
        return {
            id: 'bh-001',
            name: 'Shopping Cart Total',
            description: 'This function calculates the total price of all items in a shopping cart. Find and fix the hidden bug',
            code: `function calculateTotal(items) {
    let total = 0;

    for (let i = 0; i <= items.length; i++) {
        total += items[i].price;
    }

    return total;
}`,
        }
    }

}