"use client";

export default function Home() {
  const logHello = () => {
    console.log("hello")
  };

  return (
    <main>
      <h1>Mood Match</h1>
      <button onClick={logHello}>Connect Spotify</button>
    </main>
  )
}