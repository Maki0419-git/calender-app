import { Calender } from "./components/calender";

function App() {
  return (
    <div>
      <h1>Calender App</h1>
      <Calender />
      <Calender options={{ enableCrossMonth: true }} />
    </div>
  );
}

export default App;
