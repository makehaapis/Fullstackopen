import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const StatisticLine = (props) => {
  return(
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.allReviews.length === 0) {
    return (
      <tbody>
        <tr>
          <td>No feedback given</td>
        </tr>
      </tbody>
    )
  }
  return (
  <tbody>
      <StatisticLine text="good" value={props.good}/>
      <StatisticLine text="neutral" value={props.neutral}/>
      <StatisticLine text="bad" value={props.bad}/>
      <StatisticLine text="average" value={props.average}/>
      <StatisticLine text="positives" value={props.positives}/>
  </tbody>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allReviews, setAllReviews] = useState([])

  const avg = () => {
    let sum = 0
    let average = 0
    allReviews.forEach(element => {
      sum += element
    })
    average = sum / allReviews.length
    return (
      average
    )
  }

  const positives = () => ((good / allReviews.length)*100)

  const handleGoodClick = () => {
    setGood(good + 1)
    setAllReviews(allReviews.concat(1))
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAllReviews(allReviews.concat(0))
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAllReviews(allReviews.concat(-1))
  }


  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text="good"/>
      <Button handleClick={handleNeutralClick} text="neutral"/>
      <Button handleClick={handleBadClick} text="bad"/>
      <h1>statistics</h1>
      <table>
      <Statistics allReviews={allReviews} good={good} neutral={neutral} bad={bad} average={avg()} positives={positives()}/>
      </table>
    </>
  )
}

export default App