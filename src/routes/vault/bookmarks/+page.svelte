<script lang='ts'>
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
				
	const modalStore = getModalStore();
	const modal: ModalSettings = {
		type: 'component',
		title: 'Edit Bookmark',
		component: 'modalBookmarksForm'
	};
			
	export let data
</script>
<div class="flex flex-wrap gap-4 justify-center p-4">
{#each data.bookmarks as bookmark, i }
	<div class="card card-hover w-80 relative group">
		<header class="card-header">
			<a id='title-{i}' href={bookmark.url} target='_blank'>{bookmark.title}</a>
			<button 
				type="button" 
				class="btn-icon btn-icon-sm variant-filled absolute top-0 right-0 hidden group-hover:flex"
				on:click={(event) => {
					event.preventDefault()
					modal.meta = {
						title: bookmark.title,
						// relatedNotes:
						url: bookmark.url,
						type: bookmark.type,
						tags: bookmark.tags,
						tagOptions: [],
						// expired: 
					}
					modalStore.trigger(modal)

				}}
			>
				<svg class="w-6 h-6 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
					<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.3 4.8 2.9 2.9M7 7H4a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h11c.6 0 1-.4 1-1v-4.5m2.4-10a2 2 0 0 1 0 3l-6.8 6.8L8 14l.7-3.6 6.9-6.8a2 2 0 0 1 2.8 0Z"/>
				</svg>
			</button>
		</header>
		<section class="p-4">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus libero ab dolore sequi fuga doloribus tempore quo fugiat, officiis excepturi error numquam eveniet. Non hic dolorem quod? Doloremque, sint voluptas!
		</section>
		<footer class="card-footer">
			{#if bookmark.tags}
				{#each bookmark.tags as tag }
					<span class="chip variant-filled">{tag}</span>
				{/each}
			{/if}
			<div class="flex flex-row justify-between">
			<p>{bookmark.created_at}</p>
			<p>{bookmark.updated_at}</p>
			</div>
		</footer>
	</div>
{/each}
</div>

<style>
</style>
