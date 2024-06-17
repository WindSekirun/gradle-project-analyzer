export async function exec(block: () => any) {
  try {
    const response = await block();
    return { result: true, response };
  } catch (error) {
    return { result: false, error };
  }
}
