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

  function gameStage() {
    setGame(stage[1].name);
  }

  function verifyLetter() {
    setGame(stage[2].name);
  }

  function retry() {
    setGame(stage[0].name);
  }
  return (
    <div>
      {game === "start" && <Starscreen startGame={gameStage} />}
      {game === "game" && <InGame verifyLetter={verifyLetter} />}
      {game === "end" && <GameOver retry={retry} />}
    </div>
  );
}
