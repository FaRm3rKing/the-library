<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { AppShell } from '@skeletonlabs/skeleton';
	import { initializeStores } from '@skeletonlabs/skeleton';
	import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	import type { DrawerSettings } from '@skeletonlabs/skeleton';
	import { links } from '$lib/sidebar'

	initializeStores();
	const drawerStore = getDrawerStore();
	const drawerSettings: DrawerSettings = {
		id: 'example-2',
		meta: {links: links},
		bgBackdrop: 'bg-gradient-to-tr from-indigo-500/50 via-purple-500/50 to-pink-500/50',
		width: 'w-[280px] md:w-[480px]',
		padding: 'p-4',
		rounded: 'rounded-xl',
	}

</script>

<Drawer position='right'>
	<nav class="list-nav">
		<ul>
			{#each $drawerStore.meta.links as {name, href}, i }
			<li id={`drawer-link-${i}`} >
				<a href={`/vault/${href}`}>
					<span class="badge bg-primary-500">(icon)</span>
					<span class="flex-auto">{name}</span>
				</a>
			</li>
			{/each}
		</ul>


		<!--Sign out-->
		<hr>
		<a href="/signout">
			<span class="badge bg-primary-500">(icon)</span>
			<span class="flex-auto">Logout</span>
		</a>
	</nav>
</Drawer>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
			<svelte:fragment slot="lead">(icon)</svelte:fragment>
			(title)
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
