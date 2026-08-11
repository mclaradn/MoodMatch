export const SPOTIFY_CLIENT_ID =
  process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;

export const SPOTIFY_REDIRECT_URI =
  "http://127.0.0.1:3000/callback";

export const SPOTIFY_SCOPES = [
  "user-read-private",
  "user-read-email",
].join(" ");

