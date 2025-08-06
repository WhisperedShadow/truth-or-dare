"use client";
import Styles from "./settings.module.css";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Settings = ({ players, savePlayers }) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [newPlayer, setNewPlayer] = useState({ name: "", gender: "" });

  const pathname = usePathname(); // Get current route

  const handleAddPlayer = () => {
    if (!newPlayer.name.trim() || !newPlayer.gender) return;
    savePlayers([...players, newPlayer]);
    setNewPlayer({ name: "", gender: "" });
  };

  const handleDeletePlayer = (index) => {
    savePlayers(players.filter((_, i) => i !== index));
  };

  const handleEditPlayer = (index) => {
    const current = players[index];
    const updatedName = prompt("Edit player name:", current.name);
    if (!updatedName?.trim()) return;

    const updatedGender = prompt("Edit gender (male/female):", current.gender);
    if (!["male", "female"].includes(updatedGender?.toLowerCase())) return;

    const updatedPlayers = [...players];
    updatedPlayers[index] = {
      name: updatedName.trim(),
      gender: updatedGender.toLowerCase(),
    };
    savePlayers(updatedPlayers);
  };

  return (
    <div className={Styles.wrapper}>
      <button
        className={Styles.settingsButton}
        onClick={() => setSettingsOpen(!settingsOpen)}
      >
        <i className="fa-solid fa-sliders fa-2x"></i>
      </button>

      {settingsOpen && (
        <div className={Styles.settingsContainer}>
          <h2 className={Styles.title}>Game Settings</h2>

          {/* Players List */}
          <div className={Styles.playersList}>
            {players.map((player, index) => (
              <div key={index} className={Styles.player}>
                <span className={Styles.playerName}>{player.name}</span>
                <span className={Styles.playerGender}>({player.gender})</span>
                <button onClick={() => handleEditPlayer(index)}>
                  <i className="fa-solid fa-pen"></i>
                </button>
                <button onClick={() => handleDeletePlayer(index)}>
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            ))}
          </div>

          {/* Add Player */}
          <div className={Styles.addPlayer}>
            <input
              type="text"
              placeholder="Enter player name"
              value={newPlayer.name}
              onChange={(e) =>
                setNewPlayer({ ...newPlayer, name: e.target.value })
              }
            />
            <select
              value={newPlayer.gender}
              onChange={(e) =>
                setNewPlayer({ ...newPlayer, gender: e.target.value })
              }
            >
              <option value="">--Select Gender--</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <button onClick={handleAddPlayer} className={Styles.addBtn}>
              Add Player
            </button>

            {/* Navigation Buttons */}
            <div className={Styles.toggleBtns}>
              <Link
                className={Styles.toggleButton}
                href={pathname === "/random" ? "/game" : "/random"}
              >
                {pathname === "/random" ? "Switch to Game" : "Switch to Picker"}
              </Link>
              <Link className={Styles.exitButton} href="/">
                Exit
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
