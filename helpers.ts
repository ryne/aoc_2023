export const loadPuzzleInput = async (path: string) => {
  const inputFile = Bun.file(path);
  const inputText = await inputFile.text();
  return inputText.split('\n');
};
