import { useRef, useState } from "react";
import "./styled.css";
export function InGame({
  verifyLetter,
  pickedWord,
  pickedCategory,
  letters,
  guessletter,
  wrongLetter,
  guesses,
  points,
}) {
  const [letter, setLetter] = useState("");
  const InputRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    verifyLetter(letter);

    setLetter("");

    InputRef.current.focus();
  }
  return (
    <div className="gamescreen">
      <p className="points">
        <span>points:{points}</span>
      </p>
      <h1>guess the word</h1>
      <h3 className="tip">
        Dica sobre a palavra: <span>{pickedCategory}</span>
      </h3>

      <div className="wordContainer">
        {letters.map((letter, i) =>
          guessletter.includes(letter) ? (
            <span key={i} className="letter">
              {letter}
            </span>
          ) : (
            <span key={i} className="blanksquare"></span>
          )
        )}
      </div>
      <div className="letterContainer">
        <p>try guess word</p>
        <form className="insert" onSubmit={handleSubmit}>
          <input
            type="text"
            name="letter"
            maxLength="1"
            required
            onChange={(e) => setLetter(e.target.value)}
            value={letter}
            ref={InputRef}
          />
          <button className="startButton">play</button>
        </form>
        <div className="points">
          <span>chances: {guesses}</span>
        </div>
        <div className="wrongLettersContainer">
          <p>Letras usadas:</p>
          {wrongLetter.map((letter, i) => (
            <span key={i}>{letter}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
