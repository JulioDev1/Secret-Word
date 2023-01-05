import "./styled.css";

export function Starscreen({ startGame }) {
  return (
    <div className="start">
      <h1>Secret Word</h1>
      <p>click in button</p>
      <button onClick={startGame}>click to start</button>
    </div>
  );
}
