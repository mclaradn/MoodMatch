"use client";

import { useEffect, useRef, useState } from "react";
import { getToken } from "../../lib/spotify";

export default function Callback() {
    const [message, setMessage] = useState("Connecting to Spotify...");
    const hasRun = useRef(false);

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;
        
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (!code) {
            setMessage("No authorization code found.");
            return;
        }

        getToken(code).then(() => {
            setMessage("Spotify connected successfully!");
        }).catch((error) => {
            console.error(error);
            setMessage(
            "Something went wrong connecting to Spotify."
            );
        });
    }, []);

    return (
        <main>
        <h1>MoodMatch</h1>
        <p>{message}</p>
        </main>
    );
}