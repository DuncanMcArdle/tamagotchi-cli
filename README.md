# Tamagotchi CLI

The Tamagotchi CLI application is a command-line driven version of the classic Tamagotchi game. Players will attempt to grow an alien Tamagotchi from birth to death, whilst feeding, resting, healing and cleaning up after it along the way.

The application is written in [TypeScript](https://github.com/microsoft/TypeScript 'TypeScript'), with [Jest](https://github.com/facebook/jest 'Jest') used for automated testing and [chalk](https://github.com/chalk/chalk 'chalk') added in to help with styling console outputs.

The board's development was and is tracked on [this publically visible Trello board](https://trello.com/b/Gkbecsav/tamagotchi 'this publically visible Trello board').

## Installation & Running

To run the CLI, first clone the repo to your local machine. Next, browse to the repo's source folder in a command prompt (or preferably, using VSCode), and do the following:

1. Run `npm install` to install and build the solution
2. Run `npm start` to start the application

If all goes well, it should look like this:

[![A sample screenshot of the Tamagoshi CLI](https://i.imgur.com/evAZjvS.png 'A sample screenshot of the Tamagoshi CLI')](https://i.imgur.com/evAZjvS.png 'A sample screenshot of the Tamagoshi CLI')

## Linting & Testing

The application is configured for usage with ESLint, Prettier and Jest, all of which are covered by the package file. However, for a full experience, it is recommended that you also install these extensions in your IDE (the recommended IDE for this project is Visual Studio Code).

Linting is automatically run before testing, so to perform both, simply run `npm test`.

## Features

In this version of the game, there are currently 5 key features, which you'll need to keep on top of in order to get your Tamgotchi to the maximum age. **Keep an eye out**, because when one of the features is in danger of killing your Tamigotchi, it'll change colour!

### Ageing

The Tamagotchi will age from 0 upwards, until it reaches an amount specified in `constants.ts` (100 by default). There is nothing to be done about ageing, and having your Tamagotchi die of old age should be considered a victory!

### Food

As your Tamagotchi ages, it will use up its food reserves. You need to ensure your Tamagotchi is well fed by constantly feeding it whenever it becomes hungry. If you fail to feed your Tamagotchi enough, it will eventually die.

### Cleaning

The more you feed your Tamagotchi, the more it poops! Nobody likes to be surrounded by poop, least of all your new alien pet, so clean up after it! If you fail to clean up regularly enough, your Tamagotchi may die due to poor hygiene.

### Sleep

Throughout its life, your Tamagotchi will maintain an amount of energy. This energy level will reduce over time, and the only way to raise it back up again will be to let it sleep. If you fail to keep your Tamagotchi energised, it won't die, but it will fall asleep, preventing you from feeding or healing it until you wake it back up again.

### Disease

If you're very unlucky, your Tamagotchi may catch a disease! Diseases are dangerous and will kill your Tamagotchi if left unchecked. So keep an eye on your Tamagotchi, and heal it when necessary. But look out, because healing has a chance of not working!
