export interface TaskTest<
    Input extends unknown[] = unknown[],
    Output = unknown,
> {
    input: Input;
    expectedOutput: Output;
}
