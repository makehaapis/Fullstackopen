const Courses = ({courses}) => {
    return (
      <div>
        {courses.map(course =>
        <div key={course.id}>
          <Header name={course.name}/>
          <Content parts={course.parts}/>
          <Total parts={course.parts}/>
        </div>
        )}
      </div>
    )
  }
  
  const Header = (props) => {
    return (
    <h1>{props.name}</h1>
    )
  }
  
  const Content = ({parts}) => {
    return(
      <div>
        {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}/>)}
      </div>
    )
  }
  
  const Part = (props) => {
    return(
      <div>
        <p>{props.name} {props.exercises}</p>
      </div>
    )
  }
  
  const Total = ({parts}) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
      <div>
        <h2>total of {total} exercises</h2>
      </div>
    )
}

export default Courses