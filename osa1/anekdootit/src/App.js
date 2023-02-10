import { useState } from 'react'

const Line = (props) => {
  return(
    <div>
      <p>{props.text}</p>
      <p>{props.value}</p>
    </div>
  )
}

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', 
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.',
  ]

  const [updatedVote, setVote] = useState(0)
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0,0,0,0,0,0,0,0])

  const getRandomInt = () => {
    let randInt = Math.floor(Math.random() * 8)
    return randInt
  }

  const handleVoteClick = () => {
    let copy = votes
    copy[selected] += 1
    setVotes(copy)
    setSelected(selected)
    console.log(votes)
    setVote(updatedVote + 1)
  }

  const handleNextClick = () => {
    while(true) {
      let randInt = getRandomInt()
      if (randInt === selected)
      {
        return true
      }
      setSelected(randInt)
    }
  }

  return (
    <div>
      <Line text={anecdotes[selected]} value={votes[selected]}/>
      <Button handleClick={handleVoteClick} text="vote"/>
      <Button handleClick={handleNextClick} text="next anecdote"/>
    </div>
  )
}

export default App