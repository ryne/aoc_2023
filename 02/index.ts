const JFile = require('jfile');
const data = new JFile('input.txt');
const gamesArray = data.lines;
gamesArray.pop(); // Remove blank entry

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

const gamesObj = parseGameStrings(gamesArray); // Formatted games object.

// Part one: What is the sum of the IDs of those games?
const sumGameIDs: number = gamesObj
  .map((game, i) => {
    const [id, subGames] = Object.entries(game)[0];

    const allSubgamesPass = subGames.every((subGame: Subgame) => {
      return Object.entries(subGame).every(
        ([color, count]) => count <= targetBagAmounts[color as keyof Subgame]
      );
    });

    return allSubgamesPass ? i + 1 : -1;
  })
  .filter((i) => i !== -1) // Remove invalid games.
  .reduce((a, b) => a + b); // Add all game IDs.

// Part two: What is the sum of the power of these sets?
const minGameCubes: Subgame[] = gamesObj.flatMap((game: Game) =>
  Object.values(game).map((subGame: Subgame[]) =>
    subGame.reduce((a, b) => ({
      red: Math.max(a.red, b.red),
      green: Math.max(a.green, b.green),
      blue: Math.max(a.blue, b.blue),
    }))
  )
);

const sumSetsPower = minGameCubes
  .map((subGame) => subGame.red * subGame.green * subGame.blue) // Get cube power of each game.
  .reduce((a, b) => a + b); // Add all cube powers.

console.log(`Sum of Game IDs: ${sumGameIDs}`);
console.log(`Sum of Minimum Cube Set Powers: ${JSON.stringify(sumSetsPower)}`);
