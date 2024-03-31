import { useCallback, useEffect, useMemo, useState } from 'react';
import chunkedGenerator from '../helpers/chunkedGenerator';

const useChunked = <T>(data: T[], chunkSize: number) => {
  const generator = useMemo(() => chunkedGenerator(data, chunkSize), [data, chunkSize]);
  const [all, setAll] = useState<T[]>([]);
  const [hasNext, setHasNext] = useState(true);

  useEffect(() => {
    const result = generator.next();

    setAll(result.value ?? []);
    setHasNext(!result.done);
  }, [generator]);

  const next = useCallback(() => {
    const result = generator.next();

    setAll((prev) => [...prev, ...result.value ?? []]);
    setHasNext(!result.done);

    return result;
  }, [generator]);

  return [all, hasNext, next] as const;
};

export default useChunked;