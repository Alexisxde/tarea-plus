import { useState } from 'react'

/** @icons */
import { FireIcon, TrashIcon } from '@heroicons/react/24/solid'

/** @types */
import type { Card } from '@types'
import type { Dispatch, DragEvent, SetStateAction } from 'react'

interface Props {
  setCards: Dispatch<SetStateAction<Card[]>>
}

export default function DeleteCard({ setCards }: Props) {
  const [active, setActive] = useState(false)

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setActive(true)
  }

  const handleDragLeave = () => {
    setActive(false)
  }

  const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
    const cardId = e.dataTransfer.getData('cardId')
    setCards(pv => pv.filter(c => c.id !== cardId))
    setActive(false)
  }

  return (
    <div
      onDrop={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`grid size-56 shrink-0 place-content-center rounded border text-3xl ${
        active
          ? 'border-red-800 bg-red-800/20 text-red-500'
          : 'border-neutral-500 bg-neutral-500/20 text-neutral-500'
      }`}>
      {active ? (
        <FireIcon className="size-11 animate-bounce" />
      ) : (
        <TrashIcon className="size-11" />
      )}
    </div>
  )
}
