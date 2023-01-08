import "../App.css";
import AddPhoto from "../addPhoto";
import GenerateText from "../generateText";
import Profile from "../components/profile";

export default function Profiles() {
  // get profiles
  const profiles = [{"name":"tinah"}, {"name":"caine"}, {"name":"boyd"}]
  return (
    <div className="App">
      <div className="layout">
        {profiles.map((profile)=>{
            return <Profile profile={profile["name"]}></Profile>
        })} 
      </div>
    </div>
  );
}
