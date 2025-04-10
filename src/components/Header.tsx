import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"
import Werty from "@/components/icons/werty.svg"
import type { User } from "@/types"

interface Props {
	className?: string
	user: User | null
}

export default async function Header({ className, user }: Props) {
	return (
		<header
			className={cn(
				"sticky top-0 z-40 flex h-12 max-h-12 min-h-12 items-center justify-between border-b-[0.25px] border-neutral-200 bg-neutral-100 px-6 dark:border-neutral-800 dark:bg-neutral-900",
				className
			)}>
      <span className="text-xs text-neutral-500 dark:text-neutral-400">
        {user?.preferred_username}'s Org
      </span>
		</header>
	)
}
