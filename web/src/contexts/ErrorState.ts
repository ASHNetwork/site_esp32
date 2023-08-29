import { useState } from "react";

const ERROR_WAITING = 5000;

export function useErrorState(
  baseErr = "",
  wait: number = ERROR_WAITING
): [string, (val: string) => void] {
  const [error, setError] = useState<string>(baseErr);
  function realSetError(err: string) {
    setError(err);
    setTimeout(() => setError(""), wait);
  }
  return [error, realSetError];
}
