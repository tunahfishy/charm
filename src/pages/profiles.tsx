import "../App.css";
import Profile from "../components/profile";

export default function Profiles() {
  const profiles = [{"name":"tinah"}, {"name":"caine"}, {"name":"boyd"}]

  return (
    <div className="App">
      <div className="layout">
        <div className="title">Network</div>
        {profiles.map((profile)=>{
            return <Profile profile={profile["name"]}></Profile>
        })} 
      </div>
    </div>
  );
}
