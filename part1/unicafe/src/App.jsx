import { useState } from "react";

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  return (
    <>
      <h1>Give Feedback</h1>
      <Button text="Good" handleClick={() => setGood((prev) => ++prev)} />
      <Button text="Neutral" handleClick={() => setNeutral((prev) => ++prev)} />
      <Button text="Bad" handleClick={() => setBad((prev) => ++prev)} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
}
function Button({ text, handleClick }) {
  return <button onClick={handleClick}>{text}</button>;
}

function Statistics({ good, neutral, bad }) {
  const all = good + neutral + bad;
  return all > 0 ? (
    <>
      <h1>Statistics</h1>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {all}</p>
      <p>Average: {(good - bad) / all}</p>
      <p>Positive: {(good / all) * 100}</p>
    </>
  ) : (
    <p>No Feedback Given</p>
  );
}
