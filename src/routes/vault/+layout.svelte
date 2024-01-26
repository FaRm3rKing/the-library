<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { AppShell } from '@skeletonlabs/skeleton';
	import { initializeStores } from '@skeletonlabs/skeleton';
	import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	import type { DrawerSettings } from '@skeletonlabs/skeleton';
	import { links } from '$lib/sidebar'
	import { page } from '$app/stores'

	// right sidebar / drawer
	initializeStores();
	const drawerStore = getDrawerStore();
	const drawerSettings: DrawerSettings = {
		id: 'example-2',
		meta: {links: links},
		width: 'w-[280px] md:w-[480px]',
		padding: 'p-4',
		rounded: 'rounded-xl',
	}

	// highlight active link
	$: classesActive = (href: string) => (href === $page.url.pathname ? '!bg-primary-500' : '');

	// topbar
	function deriveTitle(urlPathname:string) {
		for (const link of links){
			if (link.href === urlPathname){
				return link.name
			}
		}
	}
	$:  title = deriveTitle($page.url.pathname)

</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<Drawer position='right' regionDrawer='p-10 flex flex-col'>
		<div>
			<nav class="list-nav">
				<ul>
					{#each $drawerStore.meta.links as {name, href}, i}
					<li id={`drawer-link-${i}`} >
						<a 
						href={href} 
						on:click={()=>drawerStore.close()}
						class="{classesActive(href)}">
							<span class="badge bg-primary-500">(icon)</span>
							<span class="flex-auto">{name}</span>
						</a>
					</li>
					{/each}
				</ul>
			</nav>
		</div>
		<div class="mt-auto">
			<hr>
			<nav class="list-nav">
				<ul>
					<li>
						<a href='/signout'>
							<span class="badge bg-primary-500">(icon)</span>
							<span class="flex-auto">Sign Out</span>
						</a>
					</li>
				</ul>
			</nav>
		</div>
		<!--Sign out-->
</Drawer>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
			<svelte:fragment slot="lead">(icon)</svelte:fragment>
			{title}
			<svelte:fragment slot="trail">
				<Avatar
					border="border-4 border-surface-300-600-token hover:!border-primary-500"
					cursor="cursor-pointer"
					fontSize={250}
					width="w-10"
					on:click={()=>drawerStore.open(drawerSettings)}
				/>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- END OF HEADER-->

	<svelte:fragment slot="sidebarLeft">
	</svelte:fragment>
	<!-- END OF SIDEBARLEFT-->

	<slot />
</AppShell>
