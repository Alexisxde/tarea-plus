import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

/** @icons */
import { ExclamationCircleIcon, PlusIcon } from '@heroicons/react/24/solid'

/** @types */
import type { Card, CardColumn } from '@types'
import type { ChangeEvent, Dispatch, SetStateAction } from 'react'

interface Props {
  column: CardColumn
  setCards: Dispatch<SetStateAction<Card[]>>
}

export default function AddCard({ column, setCards }: Props) {
  const [text, setText] = useState('')
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState(false)

  const handlerSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!text.trim().length) {
      setError(true)
      setInterval(() => {
        setError(false)
      }, 4000)
      return
    }
    const newCard = {
      column,
      title: text.trim(),
      id: Math.random().toString()
    }
    setCards(pv => [...pv, newCard])
    setAdding(false)
  }

  return (
    <>
      {adding ? (
        <>
          <motion.form layout onSubmit={handlerSubmit}>
            <textarea
              onChange={e => setText(e.target.value)}
              autoFocus
              placeholder="Añadir nueva tarea"
              className={`h-20 w-full resize-none rounded border p-3 text-sm text-neutral-50 transition-colors focus:outline-0 ${error ? 'border-red-400 bg-red-400/20 placeholder-red-300' : 'border-blue-400 bg-blue-400/20 placeholder-blue-300'}`}
            />
            <AnimatePresence>
              {error && (
                <motion.div
                  className="inline-flex items-center gap-1 text-red-400"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}>
                  <ExclamationCircleIcon className="size-4" />
                  <span className="text-xs">
                    Este campo no puede ser vacio.
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="mt-1.5 flex items-center justify-end gap-1.5">
              <button
                onClick={() => setAdding(false)}
                className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50">
                <span>Cerrar</span>
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300">
                <span>Añadir</span>
                <PlusIcon className="size-3" />
              </button>
            </div>
          </motion.form>
        </>
      ) : (
        <>
          <motion.button
            layout
            onClick={() => setAdding(true)}
            className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50">
            <span>Añadir tarea</span>
            <PlusIcon className="size-3" />
          </motion.button>
        </>
      )}
    </>
  )
}