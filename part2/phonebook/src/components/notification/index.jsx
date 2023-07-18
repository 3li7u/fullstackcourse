import "./index.css";

export default function Notification({ notification }) {
  const { message, type } = notification;
  let style;
  if (type === "fail")
    style = {
      color: "darkred",
      backgroundColor: "salmon",
      border: "1px solid darkred",
    };
  else if (type === "success")
    style = {
      color: "darkgreen",
      backgroundColor: "limegreen",
      border: "1px solid darkgreen",
    };
  return (
    <span {...{ style }} className="notification">
      {message}
    </span>
  );
}
