import { Calendar } from "./components/calendar";
import "./app.css";

function App() {
  return (
    <div className="container">
      <h1>Calender App</h1>
      <h2>Task1</h2>
      <Calendar />
      <h2>Task2</h2>
      <Calendar options={{ enableCrossMonth: true }} />
    </div>
  );
}

export default App;
