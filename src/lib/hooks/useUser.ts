import { onAuthStateChanged, User } from 'firebase/auth';
import create from 'zustand';
import { combine } from 'zustand/middleware';
import auth from '../helpers/firebase/auth';

const useUser = create(
  combine({} as Partial<User>, (set) => ({
    loading: true,
    setUser: (user: User) => set(user),
  }))
);

onAuthStateChanged(auth, (user) => {
  useUser.setState({ loading: true });

  if (user) {
    useUser.setState({ ...user, loading: false });
  } else {
    useUser.setState(({ setUser }) => ({ setUser, loading: false }), true);
  }
});

export default useUser;