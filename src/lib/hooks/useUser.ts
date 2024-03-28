import { logEvent, setUserId } from 'firebase/analytics';
import { onAuthStateChanged, User } from 'firebase/auth';
import create from 'zustand';
import { combine } from 'zustand/middleware';
import analytics from '../helpers/firebase/analytics';
import auth from '../helpers/firebase/auth';

const useUser = create(
  combine({} as Partial<User>, (set) => ({
    loading: true,
    discordToken: null as string | null,
    setUser: (user: User) => set(user),
  }))
);

onAuthStateChanged(auth, (user) => {
  useUser.setState({ loading: true });

  if (user) {
    setUserId(analytics, user.uid);
    useUser.setState({ ...user, loading: false });

    logEvent(analytics, 'login', {
      method: user.providerData[0].providerId,
    });
  } else {
    setUserId(analytics, null);
    useUser.setState(({ setUser }) => ({ setUser, loading: false }), true);
  }
});

export default useUser;