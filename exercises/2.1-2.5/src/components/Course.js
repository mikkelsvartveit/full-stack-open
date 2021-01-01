import React from 'react';

const Header = (props) => {
    return (
        <div>
            <h2>{props.course}</h2>
        </div>
    )
}

const Part = (props) => (
    <p>
        {props.name} {props.exercises}
    </p>
)

const Content = ({ parts }) => (
    <div>
        {parts.map(part => (
            <Part key={part.id} name={part.name} exercises={part.exercises} />)
        )}
        <p>
            <b>
                total of {parts.reduce((sum, part) => (sum + part.exercises), 0)} exercises
      </b>
        </p>
    </div>
)

const Course = ({ course }) => (
    <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
    </div>
)

export default Course