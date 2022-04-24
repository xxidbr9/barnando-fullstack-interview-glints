
import React from 'react'
import useLatest from './useLatest'


export const useDebounceCallback = <CallbackArgs extends any[]>(
  callback: (...args: CallbackArgs) => void,
  wait = 100,
  leading = false
): ((...args: CallbackArgs) => void) => {
  const storedCallback = useLatest(callback)
  const timeout = React.useRef<ReturnType<typeof setTimeout>>()
  const deps = [wait, leading, storedCallback]
  React.useEffect(
    () => () => {
      timeout.current && clearTimeout(timeout.current)
      timeout.current = void 0
    },
    deps
  )

  return React.useCallback(function () {
    const args = arguments
    const { current } = timeout
    if (current === void 0 && leading) {
      timeout.current = setTimeout(() => {
        timeout.current = void 0
      }, wait)
      return storedCallback.current.apply(null, args as any)
    }
    current && clearTimeout(current)
    timeout.current = setTimeout(() => {
      timeout.current = void 0
      storedCallback.current.apply(null, args as any)
    }, wait)
  }, deps)
}

export const useDebounce = <State extends any>(
  initialState: State | (() => State),
  wait?: number,
  leading?: boolean
): [
    State,
    React.Dispatch<React.SetStateAction<State>>,
    React.Dispatch<React.SetStateAction<State>>
  ] => {
  const state = React.useState(initialState)
  return [state[0], useDebounceCallback(state[1], wait, leading), state[1]]
}