"use client";

import { useState, useEffect } from "react";
import Settings from "../components/settings";
import Styles from "./page.module.css";

export default function RandomPage() {
    const [players, setPlayers] = useState([]);
    const [player1, setPlayer1] = useState({});
    const [player2, setPlayer2] = useState({});

    const savePlayers = (updatedPlayers) => {
        setPlayers(updatedPlayers);
        localStorage.setItem("players", JSON.stringify(updatedPlayers));
    };

    useEffect(() => {
        const storedPlayers = JSON.parse(localStorage.getItem("players")) || [];
        setPlayers(storedPlayers);
    }, []);

    const setRandomPlayer = (playersList) => {
        if (playersList.length < 2) {
            setPlayer1({});
            setPlayer2({});
            return;
        }
        const randomIndex1 = Math.floor(Math.random() * playersList.length);
        let randomIndex2 = Math.floor(Math.random() * playersList.length);
        while (randomIndex2 === randomIndex1) {
            randomIndex2 = Math.floor(Math.random() * playersList.length);
        }
        setPlayer1(playersList[randomIndex1]);
        setPlayer2(playersList[randomIndex2]);
    };

    return (
        <div className={Styles.container}>
            <h1 className={Styles.title}>Random Selector</h1>

            <Settings players={players} savePlayers={savePlayers} />

            <div className={Styles.playersContainer}>
                <div className={Styles.playerCard}>
                    <h3>Asker</h3>
                    <p>{player1.name || "No player selected"}</p>
                </div>
                <div className={Styles.playerCard}>
                    <h3>Answerer</h3>
                    <p>{player2.name || "No player selected"}</p>
                </div>
            </div>

            <button 
                className={Styles.randomButton} 
                onClick={() => setRandomPlayer(players)}
            >
                Select Random Player
            </button>
        </div>
    );
}
