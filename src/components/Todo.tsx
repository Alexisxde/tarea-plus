import Column from '@components/Column.tsx'
import DeleteCard from '@components/DeleteCard.tsx'
import { useEffect, useState } from 'react'

/** @types */
import { type Card } from '@types'

export default function Todos() {
  const [cards, setCards] = useState<Card[]>([])
  const [hasChecked, setHasChecked] = useState(false)

  useEffect(() => {
    hasChecked && localStorage.setItem('cards', JSON.stringify(cards))
  }, [cards])

  useEffect(() => {
    const cardsData = localStorage.getItem('cards')
    setCards(cardsData ? JSON.parse(cardsData) : [])
    setHasChecked(true)
  }, [])

  return (
    <section className="mx-auto flex h-full w-full max-w-[1366px] gap-6 p-10">
      <Column
        title="Nuevas"
        column="new"
        headingColor="text-neutral-400"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="TODO"
        column="todo"
        headingColor="text-yellow-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="En proceso"
        column="process"
        headingColor="text-blue-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Completadas"
        column="completed"
        headingColor="text-emerald-200"
        cards={cards}
        setCards={setCards}
      />
      <DeleteCard setCards={setCards} />
    </section>
  )
}
