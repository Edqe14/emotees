import { useCallback, useEffect, useMemo, useState } from 'react';
import chunkedGenerator from '../helpers/chunkedGenerator';

const useChunked = <T>(data: T[], chunkSize: number) => {
  const generator = useMemo(() => chunkedGenerator(data, chunkSize), [data, chunkSize]);
  const [all, setAll] = useState<T[]>([]);
  const [hasNext, setHasNext] = useState(true);

  useEffect(() => {
    const result = generator.next();

    if (result.done) {
      setAll([]);
      setHasNext(false);

      return;
    }

    setAll(result.value);
    setHasNext(true);
  }, [generator]);

  const next = useCallback(() => {
    const result = generator.next();

    if (result.done) {
      setHasNext(false);

      return result;
    }

    setAll((prev) => [...prev, ...result.value]);
    return result;
  }, [generator]);

  return [all, hasNext, next] as const;
};

export default useChunked;