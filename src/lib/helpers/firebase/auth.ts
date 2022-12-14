import { browserLocalPersistence, getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, TwitterAuthProvider } from 'firebase/auth';
import app from '.';

const auth = getAuth(app);

export const AUTH_PERSISTED = auth.setPersistence(browserLocalPersistence);
export default auth;

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const twitterProvider = new TwitterAuthProvider();

export const AUTH_PROVIDERS = {
  google: googleProvider,
  github: githubProvider,
  twitter: twitterProvider
};

export const login = async (provider: keyof typeof AUTH_PROVIDERS) => {
  const result = await signInWithPopup(auth, AUTH_PROVIDERS[provider]);

  return result.user;
};