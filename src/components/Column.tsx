"use client"
import Card from "@/components/Card"
import DropIndicator from "@/components/DropIndicator"
import { useTaskStore } from "@/store/useTaskStore"
import { Task } from "@/types"
import { JSX, useState } from "react"
import { PlusIcon, PencilSquareIcon, ArrowPathIcon, CheckCircleIcon, ClipboardDocumentListIcon } from "@heroicons/react/24/outline"

interface Props {
	title: string
	column: string
	textColor: string
	bgColor: string
}

const COLUMNSICONS: Record<string, JSX.Element> = {
  new: <ClipboardDocumentListIcon width="14px" height="14px" />,
  todo: <PencilSquareIcon width="14px" height="14px" />,
  process: <ArrowPathIcon width="14px" height="14px" />,
  completed: <CheckCircleIcon width="14px" height="14px" />
} as const

export default function Column({ title, column, textColor, bgColor }: Props) {
	const tasks = useTaskStore(state => state.tasks)
	const updateTasks = useTaskStore(state => state.updateTasks)
	const cardFilter = tasks?.filter(c => c.column === column)
	const [active, setActive] = useState(false)

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleDragStart = (e: any, card: Task) => {
		e.dataTransfer.setData("cardId", card.id)
	}

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		highlightIndicator(e)
		setActive(true)
	}

	const highlightIndicator = (e: React.DragEvent<HTMLDivElement>) => {
		const indicators = getIndicator()
		clearHighlight(indicators)
		const el = getNearestIndicator(e, indicators)
		el.element.style.opacity = "1"
	}

	const clearHighlight = (els?: HTMLElement[]) => {
		const indicators = els || getIndicator()
		indicators.forEach(i => {
			i.style.opacity = "0"
		})
	}

	const getNearestIndicator = (
		e: React.DragEvent<HTMLDivElement>,
		indicators: HTMLElement[]
	): { offset: number; element: HTMLElement } => {
		const DISTANCE_OFFSET = 50
		const el = indicators.reduce(
			(closest, child) => {
				const box = child.getBoundingClientRect()
				const offset = e.clientY - (box.top + DISTANCE_OFFSET)
				if (offset < 0 && offset > closest.offset) {
					return { offset, element: child }
				}
				return closest
			},
			{
				offset: Number.NEGATIVE_INFINITY,
				element: indicators[indicators.length - 1]
			}
		)
		return el
	}

	const getIndicator = (): HTMLElement[] => {
		return Array.from(document.querySelectorAll(`[data-column="${column}"]`))
	}

	const handleDragLeave = () => {
		setActive(false)
		clearHighlight()
	}

	const handleDragEnd = async (e: React.DragEvent<HTMLDivElement>) => {
		setActive(false)
		clearHighlight()

		const cardId = e.dataTransfer.getData("cardId")
		const indicators = getIndicator()
		const { element } = getNearestIndicator(e, indicators)
		const before = element.dataset.before || "-1"

		if (before !== cardId) {
			updateTasks({ id: cardId, column })
		}
	}

	return (
		<section className="w-full min-w-56">
			<div className="mb-2 flex items-center justify-between rounded-md border border-neutral-800 bg-neutral-900 py-1 px-2 sticky top-13 z-50">
        <div className="inline-flex items-center gap-2 text-md">
				  <h3>{title}</h3>
        </div>
				<div className={`inline-flex items-center gap-1 rounded-lg text-xs py-0.5 px-1.5 ${textColor} ${bgColor}`}>
          {COLUMNSICONS[column]}
					{cardFilter?.length}
        </div>
			</div>
			<div
				onDrop={handleDragEnd}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				className={`h-full w-full transition-colors ${active ? "bg-neutral-800/50" : "bg-slate-800/0"}`}>
				{cardFilter?.map(c => (
					<Card key={c.id} task={c} handleDragStart={handleDragStart} />
				))}
				<DropIndicator beforeId="-1" column={column} />
			</div>
		</section>
	)
}
