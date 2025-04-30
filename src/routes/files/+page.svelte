<script lang="ts">
	import { goto } from '$app/navigation';
	import { redirect } from '@sveltejs/kit';
	import type { PageProps } from './$types';
	import { enhance } from '$app/forms';

	let { data }: PageProps = $props();
	let fileItems = $derived(data.allFiles?.items || []);
	let currPage = $state(data.allFiles?.page || 1);
	let totalPages = data.allFiles?.totalPages || 0;
	let filesList = $derived(
		fileItems.map((file) => ({
			fileId: file.id,
			fileKey: file.fileKey,
			originalFileName: file.originalFileName,
			fileSize: file.fileSize,
			searchBy: file.slug
		}))
	);

	let gotoPrevious = async () => {
		if (currPage > 1) {
			currPage -= 1;
			await goto(`?page=${currPage}`, { noScroll: true, invalidateAll: true, replaceState: true });
		}
	};

	let gotoNext = async () => {
		if (currPage < totalPages) {
			currPage += 1;
			await goto(`?page=${currPage}`, { noScroll: true, invalidateAll: true, replaceState: true });
		}
	};

	const triggerDownload = async (fileId: string, fileName: string) => {
		const formData = new FormData();
		formData.append('documentID', fileId);
		const downloadResp = await fetch('?/downloadFile', {
			method: 'POST',
			body: formData
		});
		const downloadedResp = await downloadResp.blob();
		const link = document.createElement('a');
		link.href = URL.createObjectURL(downloadedResp);
		link.download = fileName;

		// Programmatically click the link to trigger the download
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);

		// Revoke the object URL to free up resources
		URL.revokeObjectURL(link.href);
	};
</script>

<section class="flex justify-between">
	<h1 class="text-primary mb-4 text-2xl font-bold">Files List</h1>
	<!-- <a href={`/`} class="btn btn-accent btn-outline btn-md">Approvals</a> -->
	<a href={`/files/s3/upload`} class="btn btn-neutral btn-md">Upload File</a>
</section>
<div class="overflow-x-auto">
	<table class="table-xs table">
		<thead>
			<tr>
				<th></th>
				<th>File Name</th>
				<th>File Key</th>
				<th>Size</th>
				<th>Search By</th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			{#each filesList as file, i}
				<tr>
					<th>{i + 1}</th>
					<td>{file.originalFileName}</td>
					<td>{file.fileKey}</td>
					<td>{file.fileSize}</td>
					<td>{file.searchBy}</td>
					<th>
						<button
							onclick={() => triggerDownload(file.fileId, file.originalFileName)}
							class="btn btn-accent btn-xs mt-2 md:mt-0">Download File</button
						>
					</th>
				</tr>
			{/each}
		</tbody>
	</table>
	<div class="join m-2 flex justify-center">
		<button disabled={currPage == 1} onclick={gotoPrevious} class="join-item btn btn-outline"
			>Previous page</button
		>
		<button disabled={currPage == totalPages} onclick={gotoNext} class="join-item btn btn-outline"
			>Next</button
		>
	</div>
</div>
