<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { InputChip } from '@skeletonlabs/skeleton';
	import { Autocomplete } from '@skeletonlabs/skeleton';
	import type { AutocompleteOption } from '@skeletonlabs/skeleton';

	// Stores
	import { getModalStore } from '@skeletonlabs/skeleton';

	// Props
	/** Exposes parent props to this component. */
	export let parent: SvelteComponent;


	const modalStore = getModalStore();

	// Form Data
	const formData = {
		name: 'Jane Doe',
		tel: '214-555-1234',
		email: 'jdoe@email.com'
	};

	// We've created a custom submit function to pass the response and close the modal.
	function onFormSubmit(): void {
		if ($modalStore[0].response) $modalStore[0].response(formData);
		modalStore.close();
	}

	// for the tag form
	let inputChip = '';
	let inputChipList: string[]
	const tagOptions: AutocompleteOption<string>[] = $modalStore[0].meta.tagOptions

	function onInputChipSelect(event){
		inputChipList = [...inputChipList, event.detail.value]
	}

	// Base Classes
	// const cForm = '';
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
	<div class="{cBase}">
		<header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>
		<!-- Enable for debugging: -->
		<form class="modal-form {cForm}">
			<label class="label">
				<span>Title</span>
				<input class="input" title="Title" type="text" placeholder="" bind:value={$modalStore[0].meta.title} />
			</label>
			<label class="label">
				<span>URL</span>
				<input class="input" type="text" bind:value={$modalStore[0].meta.url} placeholder="Enter name..." />
			</label>
			<label class="flex items-center space-x-2">
				<input class="checkbox" type="checkbox" />
				<p>Expired</p>
			</label>
			<label class="label">
				<span>Related Notes</span>
				<input class="input" type="text"  placeholder="" disabled/>
			</label>
			<label class="label">
				<span>Tags</span>
				<InputChip bind:input={inputChip} bind:value={inputChipList} maxlength={64} name="chips"/>
				<div class="card w-full max-h-48 p-4 overflow-y-auto" tabindex="-1">
					<Autocomplete
						bind:input={inputChip}
						options={tagOptions}
						denylist={inputChipList}
						on:selection={onInputChipSelect}
					/>
				</div>
			</label>

		</form>
		<!-- prettier-ignore -->
		<footer class="modal-footer {parent.regionFooter}">
			<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
			<button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>Submit Form</button>
		</footer>
	</div>
{/if}
