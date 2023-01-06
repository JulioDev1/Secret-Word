import { Starscreen } from "../Starscreen";

import { useCallback, useState, useEffect } from "react";

import { RandomWord } from "../../data/words";
import { InGame } from "../InGame";
import { GameOver } from "../GameOver";

const stage = [
  {
    id: 1,
    name: "start",
  },
  {
    id: 2,
    name: "game",
  },
  {
    id: 3,
    name: "end",
  },
];
export function Game() {
  const [game, setGame] = useState(stage[0].name);
  const [words] = useState(RandomWord);

  const [pickedWord, setPickedword] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessletter, setGuessletter] = useState([]);
  const [wrongLetter, setWrongletter] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [points, setPoints] = useState(0);

  const pickWordandCategory = useCallback(() => {
    //pick a random category

    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    return { category, word };
  }, [words]);

  const gameStage = useCallback(() => {
    clearStage();
    const { category, word } = pickWordandCategory();

    let wordletter = word.split("");
    wordletter = wordletter.map((l) => l.toLowerCase());
    setPickedword(word);
    setLetters(wordletter);
    setPickedCategory(category);
    setGame(stage[1].name);
  }, [pickWordandCategory]);

  function verifyLetter(letter) {
    const normalizedLetter = letter.toLowerCase();

    if (
      guessletter.includes(normalizedLetter) ||
      wrongLetter.includes(normalizedLetter)
    ) {
      return;
    }
    if (letters.includes(normalizedLetter)) {
      setGuessletter((actualGuessLetters) => [
        ...actualGuessLetters,
        normalizedLetter,
      ]);
    } else {
      setWrongletter((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);
      setGuesses((actualGuess) => actualGuess - 1);
    }
  }

  function clearStage() {
    setGuessletter([]);
    setWrongletter([]);
  }

  useEffect(() => {
    if (guesses <= 0) {
      //reset all stage

      clearStage();

      setGame(stage[2].name);
    }
  }, [guesses]);

  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];

    if (uniqueLetters.length === guessletter.length) {
      setPoints((actualPoints) => (actualPoints += 100));
      gameStage();
    }
  }, [guessletter, letters, gameStage]);

  function retry() {
    setGame(stage[0].name);
    setPoints(0);
    setGuesses(3);
  }
  return (
    <div>
      {game === "start" && <Starscreen startGame={gameStage} />}
      {game === "game" && (
        <InGame
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessletter={guessletter}
          wrongLetter={wrongLetter}
          guesses={guesses}
          points={points}
        />
      )}
      {game === "end" && <GameOver retry={retry} score={points} />}
    </div>
  );
}
