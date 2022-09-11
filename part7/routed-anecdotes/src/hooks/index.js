import { useState } from "react";

export const useField = () => {
  const [value, setValue] = useState('')
  const onChange = (e) => setValue(e.target.value)
  const handlereset = () => setValue('')
  return {
   value, onChange, handlereset
  }
}