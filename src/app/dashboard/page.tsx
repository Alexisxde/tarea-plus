import Header from "@/components/Header"
import Button from "@/components/ui/Button"
import { createClientForServer } from "@/supabase/server"
import {
  ChevronRightIcon,
  MagnifyingGlassIcon
} from "@heroicons/react/24/solid"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
	const supabase = await createClientForServer()
	const {
		data: { user }
	} = await supabase.auth.getUser()

	if (!user) redirect("/sign-in")

	const { data: projects } = await supabase
		.from("projects")
		.select()
		.eq("user_id", user?.id)

	return (
		<section className="flex flex-1 flex-col">
			<Header page="Projects" />
			<main className="p-5">
				<div className="flex justify-center md:justify-end gap-3 mb-2">
					<Button>New project</Button>
					<label className="group flex cursor-not-allowed items-center justify-between rounded-lg border border-neutral-800 bg-neutral-900 px-2.5 py-1 pr-8 text-xs focus-within:border-neutral-700 hover:border-neutral-700">
						<span className="mr-2">
							<MagnifyingGlassIcon
								className="text-neutral-300"
								width={16}
								height={16}
							/>
						</span>
						<input
							className="cursor-not-allowed placeholder:text-neutral-400 focus:outline-none"
							placeholder="Search for a project"
							type="text"
							disabled
						/>
					</label>
				</div>
				<h2 className="mb-2">{user?.user_metadata.preferred_username}'s Org</h2>
				{!projects ? (
					<div className="flex w-full flex-col items-center justify-center gap-2 p-10">
						<p>Cree su primer proyecto de tareas.</p>
					</div>
				) : (
					<div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
						{projects?.map(({ id, name }, i) => (
							<a
								key={id}
								className="group animate-fade-in relative flex h-44 min-h-32 cursor-pointer rounded-md border border-neutral-800 bg-neutral-900 p-5 transition-colors duration-150 ease-in-out hover:border-neutral-700 hover:bg-neutral-800 md:min-h-44"
								href={`/dashboard/project?id=${id}`}
								style={{ animationDelay: `calc(0.1s * ${i + 1}` }}>
								<div className="flex h-full w-full flex-col">
									<div className="w-full justify-between">
										<p className="flex-shrink truncate pr-4 text-sm">{name}</p>
										<span className="text-xs text-neutral-400 lowercase">
											Lorem ipsum dolor sit, amet consectetur adipisicing elit.
											Provident harum, debitis id quis dicta at?
										</span>
										<div className="flex items-center gap-x-1.5"></div>
									</div>
									<div className="mt-auto w-full"></div>
								</div>
								<div className="absolute top-4 right-4 text-neutral-100 transition-all duration-200 group-hover:right-3">
									<ChevronRightIcon width={24} height={24} />
								</div>
							</a>
            
						))}
					</div>
				)}
			</main>
		</section>
	)
}
