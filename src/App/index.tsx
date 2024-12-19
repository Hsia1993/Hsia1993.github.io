import "./App.css";
import useApp from "./useApp";

function App() {
  const { IconGroups, ActiveApps } = useApp();
  return (
    <>
      {ActiveApps}
      <div className="desktop">{IconGroups}</div>
    </>
  );
}

export default App;
