"use client";

import { useEffect, useRef, useState } from "react";
import { spotifyAuth } from "../lib/spotify";
import { getProfile, getAllPlaylistsInfo } from "../lib/spotify-api";

export default function Home() {
  const [profile, setProfile] = useState<any>(null);
  const hasRun = useRef(false);
  const [playlists, setPlaylists] = useState<any[]>([]);

  useEffect(() => {
    if (hasRun.current) return; // preventing useEffect from running multiple times
    hasRun.current = true;

    const loadData = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      try {
        const profileData = await getProfile();
        setProfile(profileData);

        const playlistsData = await getAllPlaylistsInfo();
        setPlaylists(playlistsData.items);

      } catch (error) {
        console.error(error);
      }
    };
    loadData();
  }, []);

  return (
    <main>
      <h1>Mood Match</h1>
      {!profile ? (
        <button onClick={spotifyAuth}>Connect Spotify</button>
      ) : (
        <div>
          {profile.images?.[0]?.url && (
            <img
              src={profile.images[0].url}
              alt="Profile"
              width={100}
              height={100}
            />
          )}
          <h2>Hey {profile.display_name}!</h2>
          <h4>Your Playlists:</h4>
          <ul>
            {playlists.map((playlist) => (
              <li key={playlist.id}>
                {playlist.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  )
}