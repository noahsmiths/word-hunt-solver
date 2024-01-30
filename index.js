const twoLetterWords = require('./words/two-letter-words.json');
const threeLetterWords = require('./words/three-letter-words.json');
const fourLetterWords = require('./words/four-letter-words.json');
const fiveLetterWords = require('./words/five-letter-words.json');
const sixLetterWords = require('./words/six-letter-words.json');

const fullWordList = [twoLetterWords, threeLetterWords, fourLetterWords, fiveLetterWords, sixLetterWords];

const Trie = require('./Trie');

const trie = new Trie();
for (let wordList of fullWordList) {
    for (let word of wordList) {
        trie.insert(word);
    }
}

const usedWords = new Set();
const seenCoords = new Set();

const puzzle = [
    ["O", "S", "N", "T"],
    ["A", "R", "J", "E"],
    ["E", "O", "C", "H"],
    ["C", "S", "N", "I"],
];

function isInBounds(x, y) {
    return 0 <= x && x < puzzle.length && 0 <= y && y < puzzle[0].length;
}

function findWords(x, y, word = "") {
    if (word.length > 6) {
        return;
    }

    const key = `${x}-${y}`;
    if (seenCoords.has(key)) return;
    seenCoords.add(key);

    const currentWord = word + puzzle[x][y];
    if (trie.contains(currentWord) && !usedWords.has(usedWords)) {
        console.log(currentWord);
        usedWords.add(currentWord);
    }

    const xMinus1 = x - 1;
    const yMinus1 = y - 1;
    const xPlus1 = x + 1;
    const yPlus1 = y + 1;

    if (isInBounds(xMinus1, y)) {
        findWords(xMinus1, y, currentWord);
    }
    if (isInBounds(xMinus1, yPlus1)) {
        findWords(xMinus1, yPlus1, currentWord);
    }
    if (isInBounds(x, yPlus1)) {
        findWords(x, yPlus1, currentWord);
    }
    if (isInBounds(xPlus1, yPlus1)) {
        findWords(xPlus1, yPlus1, currentWord);
    }
    if (isInBounds(xPlus1, y)) {
        findWords(xPlus1, y, currentWord);
    }
    if (isInBounds(xPlus1, yMinus1)) {
        findWords(xPlus1, yMinus1, currentWord);
    }
    if (isInBounds(x, yMinus1)) {
        findWords(x, yMinus1, currentWord);
    }
    if (isInBounds(xMinus1, yMinus1)) {
        findWords(xMinus1, yMinus1, currentWord);
    }

    seenCoords.delete(key);
}

for (let i = 0; i < puzzle.length; i++) {
    for (let j = 0; j < puzzle[0].length; j++) {
        findWords(i, j);
    }
}