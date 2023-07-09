import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const baseUrl = "https://api.github.com/users/";

const reposBaseUrl = "repos?sort=updated&direction=desc";

function App() {
  const [user, setUser] = useState("");
  const [userData, setUserData] = useState([]);
  const [repos, setRepos] = useState([]);

  const [submitted, setSubmitted] = useState(false);

  const getData = async () => {
    if (user) {
      let res = await axios.get(`${baseUrl}${user}`);
      let reposres = await axios.get(`${baseUrl}${user}/${reposBaseUrl}`);
      setUserData(res.data);
      setRepos(reposres.data);
      console.log(repos);
      setUser("");
      setSubmitted(true); // Update the submitted state to true
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-white font-bold font-[Poppins] bg-orange-300 h-[100vh] ">
      <h1 className="mb-10 mt-10 text-orange-700">Find Profile</h1>
      <input
        type="text"
        placeholder="github username"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        className="text-orange-400 rounded-md mb-4 px-2 py-1 caret-orange-300 outline-none shadow-md placeholder:text-black-400"
      />
      <button
        className="bg-orange-500 rounded-md px-3 py-1 cursor-pointer hover:bg-orange-700"
        onClick={getData}
      >
        Get User
      </button>

      {submitted && userData && (
        <div className="data grid grid-cols-2 items-center gap-10 px-4 py-3 mt-10 ml-10 mb-20 mr-10 drop-shadow-lg bg-white text-orange-300 rounded-md h-[100vh] hide-scrollbar overflow-y-scroll">
          <h4>UserName: {userData?.name}</h4>
          <img
            src={userData?.avatar_url}
            className="w-20 h-20 object-fit rounded-lg"
          />
          <h4>Location: {userData?.location}</h4>
          <h4 className="w-fit md:w-60">Bio: {userData?.bio}</h4>
          <h4>Repos: {userData?.public_repos}</h4>
          <h4>Followers: {userData?.followers}</h4>
          <h4>Following: {userData?.following}</h4>
          <h2>Latest Repos: </h2>

          {repos &&
            repos.slice(0, 5).map((item) => {
              return (
                <div className="flex">
                  <h4 className=" text-sm">{item.name}</h4>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default App;
