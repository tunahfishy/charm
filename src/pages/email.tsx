import "../App.css";
import AddPhoto from "../addPhoto";
import GenerateText from "../generateText";

export default function Email() {
  return (
    <div className="App">
      <div className="layout">
        <AddPhoto />
        <GenerateText />
      </div>
    </div>
  );
}
