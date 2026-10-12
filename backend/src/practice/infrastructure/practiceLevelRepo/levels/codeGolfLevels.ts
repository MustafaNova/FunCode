import { CodeGolfLevel } from '../../../domain/models/codeGolfLevel';

const oceanBreezeTests = `
function assertEqual(actual: unknown, expected: unknown) {
    if (actual !== expected) {
        throw new Error(\`Expected \${expected}, but received \${actual}\`);
    }
}

assertEqual(sumEvenNumbers([1, 2, 3, 4]), 6);
assertEqual(sumEvenNumbers([2, 2, 2]), 6);
assertEqual(sumEvenNumbers([1, 3, 5]), 0);
assertEqual(sumEvenNumbers([]), 0);
assertEqual(sumEvenNumbers([-2, -3, 4]), 2);
`.trim();

const alpineFairwayTests = `
assert compress_string("aaabbc") == "a3b2c1"
assert compress_string("abcd") == "a1b1c1d1"
assert compress_string("aaaa") == "a4"
assert compress_string("a") == "a1"
assert compress_string("") == ""
assert compress_string("xxxyyyzz") == "x3y3z2"
`.trim();

const desertSunsetTests = `
function assertArrayEqual(actual: number[], expected: number[]) {
    if (
        actual.length !== expected.length ||
        actual.some((value, index) => value !== expected[index])
    ) {
        throw new Error(
            \`Expected [\${expected}], but received [\${actual}]\`,
        );
    }
}

assertArrayEqual(uniqueSorted([4, 2, 4, 1, 2]), [1, 2, 4]);
assertArrayEqual(uniqueSorted([3, 3, 3]), [3]);
assertArrayEqual(uniqueSorted([]), []);
assertArrayEqual(uniqueSorted([5, -1, 5, 0, -1]), [-1, 0, 5]);
assertArrayEqual(uniqueSorted([10, 2, 1]), [1, 2, 10]);
`.trim();


const oceanBreezeLevel: CodeGolfLevel = {
    gameMode: 'code-golf',
    levelNumber: 1,

    description:
        'Shorten the implementation of sumEvenNumbers as much as possible. The function must return the sum of all even numbers in the array and pass every hidden test.',

    initialCode: `
function sumEvenNumbers(numbers: number[]): number {
    let total = 0;

    for (let index = 0; index < numbers.length; index++) {
        const currentNumber = numbers[index];

        const isEven = currentNumber % 2 === 0;

        if (isEven) {
            total = total + currentNumber;
        }
    }

    return total;
}
`.trim(),

    language: 'typescript',
    tests: oceanBreezeTests,

    maxCharacters: 100,
};

const alpineFairwayLevel: CodeGolfLevel = {
    gameMode: 'code-golf',
    levelNumber: 2,

    description:
        'Shorten compress_string while preserving its behavior. Consecutive equal characters must be replaced by the character followed by the number of times it appears.',

    initialCode: `
def compress_string(text):
    if len(text) == 0:
        return ""

    compressed_text = ""

    current_character = text[0]
    current_count = 1

    for index in range(1, len(text)):
        next_character = text[index]

        if next_character == current_character:
            current_count = current_count + 1
        else:
            compressed_text = (
                compressed_text
                + current_character
                + str(current_count)
            )

            current_character = next_character
            current_count = 1

    compressed_text = (
        compressed_text
        + current_character
        + str(current_count)
    )

    return compressed_text
`.trim(),

    language: 'python',
    tests: alpineFairwayTests,

    maxCharacters: 170,
};

const desertSunsetLevel: CodeGolfLevel = {
    gameMode: 'code-golf',

    levelNumber: 3,

    description:
        'Shorten uniqueSorted as much as possible. The function must remove duplicate numbers and return the remaining numbers in ascending numeric order.',

    initialCode: `
function uniqueSorted(numbers: number[]): number[] {
    const uniqueNumbers: number[] = [];

    for (let index = 0; index < numbers.length; index++) {
        const currentNumber = numbers[index];

        const alreadyExists =
            uniqueNumbers.includes(currentNumber);

        if (alreadyExists === false) {
            uniqueNumbers.push(currentNumber);
        }
    }

    uniqueNumbers.sort(
        (firstNumber, secondNumber) => {
            return firstNumber - secondNumber;
        },
    );

    return uniqueNumbers;
}
`.trim(),

    language: 'typescript',
    tests: desertSunsetTests,

    maxCharacters: 90,
};


export const CODE_GOLF_LEVELS: Record<string, CodeGolfLevel> = {
    'ocean-breeze': oceanBreezeLevel,
    'alpine-fairway': alpineFairwayLevel,
    'desert-sunset': desertSunsetLevel,
};