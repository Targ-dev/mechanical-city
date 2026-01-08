import { useState } from 'react'
export default function useCart() {
  const [items, setItems] = useState([])
  return { items, setItems }
}
