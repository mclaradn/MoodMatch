"use client";

import { spotifyAuth } from "../lib/spotify";

export default function Home() {

  return (
    <main>
      <h1>Mood Match</h1>
      <button onClick={spotifyAuth}>Connect Spotify</button>
    </main>
  )
}