import "./styled.css";
export function GameOver({ retry }) {
  return (
    <div className="retrygame">
      <h1>Game Over</h1>
      <button onClick={retry}>Retry Game</button>
    </div>
  );
}
