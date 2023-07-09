import Content from "../content";
import Footer from "../footer";
import Header from "../header";

export default function Course({ course }) {
  const { exercises } = course.parts.reduce((prev, curr) => ({
    name: curr.name,
    exercises: curr.exercises + prev.exercises,
  }));
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Footer total={exercises} />
    </>
  );
}
