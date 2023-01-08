import "../App.css";
import AddPhoto from "../addPhoto";
import GenerateText from "../generateText";
import "./profile.css"
import { Link } from "@nextui-org/react";

interface ProfileProps {
  profile: string;
}

export default function Profile(props: ProfileProps) {
  return (
    <div className="profile">
      <div className="layout">
        <p>{props.profile}</p>
        <Link href={`email/${props.profile}`}>
            Email
        </Link>
      </div>
    </div>
  );
}
