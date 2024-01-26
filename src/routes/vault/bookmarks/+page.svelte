<script lang='ts'>
	export let data
</script>

<div class="flex flex-wrap">
{#each data.bookmarks as bookmark }
	<div class="card card-hover">
		<header class="card-header">
			<a href={bookmark.url}>{bookmark.title}</a>
		</header>
		<section class="p-4">
			Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas ad, voluptatem, tenetur numquam dolores eum beatae minus quisquam quaerat tempora officiis quibusdam, molestias at laudantium dolorum unde magni necessitatibus non?
		</section>
		<footer class="card-footer">
			{#if bookmark.tags}
				{#each bookmark.tags as tag }
					<a href="#" class="card"> {tag} </a>
				{/each}
			{/if}
		</footer>
	</div>
{/each}
</div>
