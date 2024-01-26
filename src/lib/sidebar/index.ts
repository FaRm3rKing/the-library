import type { SidebarLink } from "./types"

const baseURL = '/vault'
export const links: SidebarLink[] = [
	{name: 'Home', href: `${baseURL}/home`},
	{name: 'Bookmarks', href: `${baseURL}/bookmarks`},
	// add more as you want
]

