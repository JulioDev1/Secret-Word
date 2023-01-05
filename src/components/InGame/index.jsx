import "./styled.css";
export function InGame({ verifyLetter }) {
  return (
    <div className="gamescreen">
      <h1>in Game</h1>
      <button onClick={verifyLetter}>Quit Game</button>
    </div>
  );
}
