export const getProfile = async () => {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
        throw new Error("No Spotify access token found");
    }

    const response = await fetch("https://api.spotify.com/v1/me",
    {
        headers: {
        Authorization: `Bearer ${accessToken}`,
        },
    }
    );

    if (!response.ok) {
        throw new Error("Failed to get Spotify profile");
    }

    return response.json();
};

export const getAllPlaylistsInfo = async () => {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
        throw new Error("No Spotify access token found");
    }

    const response = await fetch("https://api.spotify.com/v1/me/playlists",
    {
        headers: {
        Authorization: `Bearer ${accessToken}`,
        },
    }
    );

    if (!response.ok) {
        throw new Error("Failed to get Spotify playlists");
    }

    return response.json();
};

export const getPlaylistSong = async (id: string) => {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
        throw new Error("No Spotify access token found");
    }

    const response = await fetch(`https://api.spotify.com/v1/me/playlists/${id}/items`,
    {
        headers: {
        Authorization: `Bearer ${accessToken}`,
        },
    }
    );

    if (!response.ok) {
        throw new Error("Failed to get Spotify playlists");
    }

    return response.json();
}

export const getAllSongs = async (id: string) => {
    
}