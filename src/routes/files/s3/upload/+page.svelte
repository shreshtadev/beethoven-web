<script lang="ts">
	import { enhance } from '$app/forms';
	import { FolderSync } from '@lucide/svelte';
	import ShAlert from '../../../../components/ShAlert.svelte';
	import type { ActionData, PageData, PageProps } from './$types';
	const { data, form }: {data: PageData, form: any} = $props();
	let isLoading = $derived(data.loading || form !== null);
	let alertMessage: string | null = $derived(data.alert?.message || form?.message || null);
	let alertType: 'success' | 'error' | 'info' | null = $derived(
		data.alert?.type || form?.type || null
	);
</script>

<div class="flex h-full w-full flex-col items-center pt-12">
	<div class="text-primary h-24 w-24">
		<FolderSync />
	</div>
	<h2 class="text-base-content mt-2 text-center text-3xl font-bold tracking-tight">
		Upload file to S3
	</h2>
	<ShAlert loading={isLoading} type={alertType} message={alertMessage} />
	<div class=" mt-6 w-full max-w-sm rounded-lg py-6 shadow-md">
		<form
			use:enhance
			enctype="multipart/form-data"
			method="POST"
			action="?/s3upload"
			class="flex w-full flex-col items-center space-y-2"
		>
			<div class="form-control w-full max-w-xs">
				<label for="slug" class="label pb-1 font-medium">
					<span class="label-text">Search By</span>
				</label>
				<input required type="text" name="slug" class="input input-neutral" />
				<label for="files" class="label pb-1 font-medium">
					<span class="label-text">File To Upload</span>
				</label>
				<input type="file" name="files" class="file-input file-input-primary" />
				{#if form?.message && form?.type}
					<div class={`alert ${form.type}`}>{form.message}</div>
				{/if}
			</div>
			<div class="w-full max-w-xs pt-3">
				<button class="btn btn-primary w-full max-w-xs">Upload File</button>
			</div>
		</form>
	</div>
</div>
