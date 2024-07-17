import { Calender } from "./components/calender";
import "./app.css";

function App() {
  return (
    <div className="container">
      <h1>Calender App</h1>
      <h2>Task1</h2>
      <Calender />
      <h2>Task2</h2>
      <Calender options={{ enableCrossMonth: true }} />
    </div>
  );
}

export default App;
