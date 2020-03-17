import React, { useRef } from 'react'
import FlashCard from './FlashCard'

export default function TestComponent () {
  const flashCardRef = useRef()
  return (
    <div>
      <FlashCard ref={flashCardRef} />
      <button onClick={() => flashCardRef.current.getAlert()}></button>
    </div>
  )
}