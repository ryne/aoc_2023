const JFile = require('jfile');
const data = new JFile('input.txt');
const gamesArray = data.lines;

// Remove blank entry
gamesArray.pop();

interface Game {
  [gameId: number]: Subgame[];
}

interface Subgame {
  red: number;
  green: number;
  blue: number;
}

const targetBagAmounts: Subgame = {
  red: 12,
  green: 13,
  blue: 14,
};

function parseGameStrings(gameStrings: string[]): Game[] {
  return gameStrings.map((gameString, index) => {
    const gameId = index;

    const subgames: Subgame[] = gameString.split(';').map((subgame) => {
      const colorRegex = /(\d+)\s*(red|green|blue)?/g;
      let match;
      const colorCounts: Subgame = { red: 0, green: 0, blue: 0 };

      while ((match = colorRegex.exec(subgame)) !== null) {
        const [, count, color = ''] = match;
        colorCounts[color as keyof Subgame] = parseInt(count, 10);
      }

      return {
        red: colorCounts.red || 0,
        green: colorCounts.green || 0,
        blue: colorCounts.blue || 0,
      };
    });

    const parsedGame: Game = { [gameId]: subgames };
    return parsedGame;
  });
}

const formattedGamesObj = parseGameStrings(gamesArray);

const filteredData: number = formattedGamesObj
  .map((obj, index) => {
    const [id, subgames] = Object.entries(obj)[0];

    const allSubgamesPass = subgames.every((subgame: Subgame) => {
      return Object.entries(subgame).every(
        ([color, count]) => count <= targetBagAmounts[color as keyof Subgame]
      );
    });

    return allSubgamesPass ? index : -1;
  })
  .filter((index) => index !== -1)
  .map((index) => index + 1)
  .reduce((a, b) => a + b);

console.log(filteredData);
