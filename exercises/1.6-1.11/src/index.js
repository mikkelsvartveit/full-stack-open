import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return (
      <div>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <Statistic text="good" value={good}></Statistic>
          <Statistic text="neutral" value={neutral}></Statistic>
          <Statistic text="bad" value={bad}></Statistic>
          <Statistic text="all" value={good + neutral + bad}></Statistic>
          <Statistic text="average" value={(good - bad) / (good + neutral + bad)}></Statistic>
          <Statistic text="positive" value={good / (good + neutral + bad) * 100 + "%"}></Statistic>
        </tbody>
      </table>
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.onClick}>{props.text}</button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <div>
        <h2>Give feedback</h2>

        <Button onClick={() => setGood(good + 1)} text="good"></Button>
        <Button onClick={() => setNeutral(neutral + 1)} text="neutral"></Button>
        <Button onClick={() => setBad(bad + 1)} text="bad"></Button>
      </div>

      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)