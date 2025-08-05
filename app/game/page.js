"use client";
import Settings from "../components/settings";
import Styles from "./page.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const api_url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.NEXT_PUBLIC_API_KEY}`;

  const [players, setPlayers] = useState([]);
  const [player, setPlayer] = useState({});
  const [response, setResponse] = useState("");
  const [type, setType] = useState("Friends");

  useEffect(() => {
    const storedPlayers = JSON.parse(localStorage.getItem("players")) || [];
    setPlayers(storedPlayers);
  }, []);

  const savePlayers = (updatedPlayers) => {
    setPlayers(updatedPlayers);
    localStorage.setItem("players", JSON.stringify(updatedPlayers));
  };

  const setRandomPlayer = (playersList) => {
    if (playersList.length === 0) {
      setPlayer({});
      setResponse("No players available. Add players in settings.");
      return;
    }
    const randomIndex = Math.floor(Math.random() * playersList.length);
    setPlayer(playersList[randomIndex]);
    setResponse("");
  };

  const fetchResponse = async (method) => {
    if (!player.name) {
      setResponse("Please select a player first.");
      return;
    }

    const prompt = `
You are creating a ${method} challenge for a Truth or Dare game.

Game Info:
- Selected player: ${player.name} (${player.gender})
- Total players: ${players.length}
- Player list:
${players.map((p) => `• ${p.name} (${p.gender})`).join("\n")}
- Category: ${type}

Rules:
1. Output exactly ONE single, complete sentence.
2. Make it fun and engaging for the "${type}" category.
3. Do NOT directly mention ${player.name}.
4. Do NOT include quotes, extra text, or explanations.
5. Keep it clean and safe for the chosen category.
6. Avoid repetitive or generic phrases.
7. Ensure it sounds like a challenge or question suitable for ${method}.
8. No greetings, no filler words, no disclaimers.

Now provide the ${method} in exactly one sentence.
`;

    const requestBody = {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    };

    try {
      const res = await fetch(api_url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await res.json();
      console.log("API Response:", data);

      setResponse(
        data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
          "Sorry, I couldn't generate a response."
      );
    } catch (error) {
      console.error("Error fetching response:", error);
      setResponse("An error occurred while generating the response.");
    }
  };

  return (
    <div className={Styles.wrapper}>
      {/* Game Type Selection */}
      <div className={Styles.type}>
        <select
          name="type"
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="Friends">Friends</option>
          <option value="Family">Family</option>
          <option value="Couples">Couples</option>
          <option value="Kids">Kids</option>
          <option value="Adults">Adults</option>
          <option value="Spicy (18+)">Spicy (18+)</option>
          <option value="Random">Random</option>
        </select>
      </div>

      {/* Settings Component */}
      <Settings players={players} savePlayers={savePlayers} />

      {/* Main Game Container */}
      <div className={Styles.container}>
        <div className={Styles.msg}>
          <h2>{player.name || "No player selected"}</h2>
          <p>{response || "Press Truth or Dare to start!"}</p>
        </div>

        <div className={Styles.btns}>
          <button
            className={Styles.btnPrimary}
            onClick={() => setRandomPlayer(players)}
          >
            🎲 New Player
          </button>
          <button
            className={Styles.btnTruth}
            onClick={() => fetchResponse("Truth")}
          >
            Truth
          </button>
          <button
            className={Styles.btnDare}
            onClick={() => fetchResponse("Dare")}
          >
            Dare
          </button>
        </div>
      </div>
    </div>
  );
}
