export const loginCodeSnippets = [
    `async function loginPlayer() {
  const token = await auth.login(tag);
  arena.join(token);
}`,
    `if (player.ready) {
  queue.match("ranked-1v1");
  deploy(skill);
}`
]

export const terminalCrashCode = `SYSTEM PANIC: unauthorized input
> write access denied
> arena terminal crashed
> reboot required...`;