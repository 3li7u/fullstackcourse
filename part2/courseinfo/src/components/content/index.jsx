import Part from "./part";

export default function Content({ parts }) {
  return parts.map(({ name, exercises }, index) => (
    <Part key={index} name={name} exercises={exercises} />
  ));
}
