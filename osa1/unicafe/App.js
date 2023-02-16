import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = ({good, neutral, bad, all, average, positive}) => {

  if (all > 0) {
    return (
      <table>
        <StatisticLine text="good" value={good} /> 
        <StatisticLine text="neutral" value={neutral} /> 
        <StatisticLine text="bad" value={bad} /> 
        <StatisticLine text="all" value={all} /> 
        <StatisticLine text="average" value={average} /> 
        <StatisticLine text="positive" value={positive} /> 
      </table>
    )
  }
  else {
    return (
      <div>
        <p>
          No feedback given
        </p>
      </div>
    )
  }
  
}

const StatisticLine = (props) => {
  return (
    <tbody>
      <tr>
        <td>{props.text}</td><td>{props.value}</td>
      </tr> 
    </tbody>
  )
}

const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  const All = (good + neutral + bad)
  const Average = (good * 1 + neutral * 0 + bad * -1) / (All)
  const Positive = (good / (All)) * 100 + "%"

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => handleGoodClick()} text="good" />
      <Button handleClick={() => handleNeutralClick()} text="neutral" />
      <Button handleClick={() => handleBadClick()} text="bad" />
      <h2>Statistics</h2>          
      <Statistics good={good} neutral={neutral} bad={bad} all={All} average={Average} positive={Positive} />           
    </div>
  )

}

export default App
