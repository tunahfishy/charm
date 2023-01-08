import "../App.css";
import AddPhoto from "../addPhoto";
import GenerateText from "../generateText";

interface ProfileProps {
  profile: string;
}

export default function Profile(props: ProfileProps) {
  return (
    <div className="App">
      <div className="layout">
        <p>{props.profile}</p>
      </div>
    </div>
  );
}
