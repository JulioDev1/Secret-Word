import "./styled.css";
export function GameOver({ retry, score }) {
  return (
    <div className="retrygame">
      <h1>Game Over</h1>
      <h2>points:{score}</h2>
      <button onClick={retry}>Retry Game</button>
    </div>
  );
}
