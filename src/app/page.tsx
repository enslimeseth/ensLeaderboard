"use client"
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {

  type LeaderboardItem = {
    rank: string;
    eth_name: string;
    display: string;
    follower_count: string;
  }

  const [leaderboardData, setLeaderboardData] = useState<LeaderboardItem[] | null>(null);

  useEffect(() => {
   async function getData(){
    const data = await axios.get('https://api.farcasterkit.com/users/ensLeaderboard');
    if(data){
      const final = data.data.leaderboard as LeaderboardItem[];
      setLeaderboardData(final)
    }
   } 
   getData();
  })

  


  return (
    <div className="mt-10"> {/* Adjust the number for more or less space */}
      <h1 className="text-center text-xl text-black font-semibold"> <span style={{color: 'rgb(125 152 242)' }}> .eth </span> Leaderboard for <span style={{color: 'rgb(67 43 140)' }}> Farcaster</span>
      </h1>
      <h2 className="text-center">The most followed Farcaster accounts with .eth Farcaster names</h2>

      <hr />

      <div className="mt-10 flex justify-center">
        <table className="table-auto">
          <thead>
            <tr>
              <th>Rank</th>
              <th>ENS Name</th>
              <th>Display Name</th>
              <th>Followers</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData !== null && leaderboardData.map((item, index) => {
              return(
                <tr>
                  <td>{item.rank}</td>
                  <td>{item.eth_name}</td>
                  <td>{item.display}</td>
                  <td>{Number(item.follower_count).toLocaleString()}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
