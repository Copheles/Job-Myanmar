import { useState, useCallback } from "react";
import { useDispatch } from 'react-redux';


export function useThunk(thunk) {
  const [ isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const runThunk = useCallback((args) => {
    setIsLoading(true);
    dispatch(thunk(args))
      .unwrap()
      .then()
      .catch()
      .finally(() => {
        setIsLoading(false)
      })
  }, [dispatch, thunk])

  return [ runThunk, isLoading]
}