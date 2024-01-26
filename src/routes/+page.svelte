<script lang="ts">
	export let data
</script>

<h1>Sample Landing Page</h1>
{#if data.username}
	<a href='/vault/home'>Sign in as{data.username}?</a>
{:else}
	<a href={data.signInUrl}>Sign in</a>
{/if}
