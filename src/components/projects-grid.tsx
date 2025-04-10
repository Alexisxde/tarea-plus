"use client"
import SheetProject from "@/components/sheet-project"
import { useProjectStore } from "@/store/useProjectStore"
import { ChevronRightIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { useEffect } from "react"

export default function ProjectsGrid() {
	const getProjects = useProjectStore(state => state.getProjects)
	const loading = useProjectStore(state => state.loading)
	const projects = useProjectStore(state => state.projects)

	useEffect(() => {
		getProjects()
	}, [getProjects])

  if (!projects) return

	return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
      {loading && (
        Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="aspect-video rounded-lg border border-neutral-200 dark:border-neutral-800 dark:bg-neutral-900 bg-neutral-100 p-5">
          <div className="flex w-full flex-col gap-2 animate-pulse">
            <div className="w-1/2 h-5 bg-neutral-600 dark:bg-neutral-400 rounded"></div>
            <div className="w-full h-2 bg-neutral-600 dark:bg-neutral-400 rounded"></div>
            <div className="w-full h-2 bg-neutral-600 dark:bg-neutral-400 rounded"></div>
            <div className="w-full h-2 bg-neutral-600 dark:bg-neutral-400 rounded"></div>
            <div className="w-full h-2 bg-neutral-600 dark:bg-neutral-400 rounded"></div>
            <div className="w-full h-2 bg-neutral-600 dark:bg-neutral-400 rounded"></div>
          </div>    
        </div>
      )))}
			{projects?.map(({ id, name, description }, i: number) => (
				<Link
					key={id}
					className="animate-fade-in group relative flex flex-col gap-2 aspect-video rounded-lg p-5 border transition-colors duration-150 ease-in-out bg-neutral-100 border-neutral-200 hover:border-neutral-300 hover:bg-neutral-200 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700 dark:hover:bg-neutral-800"
					href={`/dashboard/project/${id}`}
					style={{ animationDelay: `calc(0.1s * ${i + 1}` }}>
          <div className="flex w-full flex-col">
            <h3 className="mb-1 flex-shrink pr-4 text-sm">{name}</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">{description}</p>
          </div>
          <div className="absolute opacity-50 group-hover:opacity-100 top-4 right-4 text-neutral-900 transition-all duration-200 ease-in-out group-hover:right-3 dark:text-neutral-100">
            <ChevronRightIcon className="size-6" />
          </div>
				</Link>
			))}
      {!loading && <SheetProject delay={projects?.length + 1} />}
		</div>
	)
}
