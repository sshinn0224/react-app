import { useEffect } from 'react'

export default function useOnclickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      // 모달안을 클릭 했는지
      if (!ref.current || ref.current.contains(event.target)) {
        return
      }

      handler()
    }
    document.addEventListener('mousedown', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
    }
  }, [ref, handler])
}
