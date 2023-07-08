export default function App() {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];
  const { exercises } = parts.reduce((prev, curr) => ({
    name: curr.name,
    exercises: curr.exercises + prev.exercises,
  }));
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Footer total={exercises} />
    </div>
  );
}

function Header({ course }) {
  return <h1>{course}</h1>;
}

function Content({ parts }) {
  return parts.map(({ name, exercises }, index) => (
    <Part key={index} name={name} exercises={exercises} />
  ));
}

function Footer({ total }) {
  return <p>Number of exercises {total}</p>;
}

function Part({ name, exercises }) {
  return (
    <p>
      {name} {exercises}
    </p>
  );
}
