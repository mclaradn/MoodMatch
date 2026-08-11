export const SPOTIFY_CLIENT_ID =
    process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;

export const SPOTIFY_REDIRECT_URI =
    "http://127.0.0.1:3000/callback";

const scope = 'user-read-private user-read-email';
const authUrl = new URL("https://accounts.spotify.com/authorize")
const tokenUrl = new URL("https://accounts.spotify.com/api/token");

// code verifier
const generateRandomString = (length: number) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}

// hashing code verifier
const sha256 = async (plain: string) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)
    return window.crypto.subtle.digest('SHA-256', data)
}

const base64encode = (input: any) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}

// login
export const spotifyAuth = async () => {
    const codeVerifier  = generateRandomString(64);
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);

    window.localStorage.setItem('code_verifier', codeVerifier);

    const params =  {
        response_type: 'code',
        client_id: SPOTIFY_CLIENT_ID,
        scope,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri: SPOTIFY_REDIRECT_URI,
    }

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
}

// getting token from authorization code
export const getToken = async (code: string) => {
    const codeVerifier = localStorage.getItem('code_verifier');

    if (!codeVerifier) {
        throw new Error("No code verifier found");
    }

    const payload = {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded',},
        body: new URLSearchParams({
            client_id: SPOTIFY_CLIENT_ID,
            grant_type: 'authorization_code',
            code,
            redirect_uri: SPOTIFY_REDIRECT_URI,
            code_verifier: codeVerifier,
        }),
    }

    const body = await fetch(tokenUrl, payload);
    const response = await body.json();

    localStorage.setItem("access_token",response.access_token);

    return response;
}