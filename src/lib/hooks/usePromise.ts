import { useEffect, useState } from 'react';

const usePromise = <T>(promise: Promise<T>, deps: any[] = []): [T | null, boolean] => {
  const [state, setState] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    promise.then((data) => {
      setState(data);
      setLoading(false);
    });
  }, deps);

  return [state, loading];
};

export default usePromise;