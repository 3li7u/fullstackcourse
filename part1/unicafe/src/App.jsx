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
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="All" value={all} />
          <StatisticLine text="Average" value={(good - bad) / all} />
          <StatisticLine text="Positive" value={`${(good / all) * 100}%`} />
        </tbody>
      </table>
    </>
  ) : (
    <p>No Feedback Given</p>
  );
}

function StatisticLine({ text, value }) {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
}
