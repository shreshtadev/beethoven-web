<script lang="ts">
	import { goto } from '$app/navigation';
	import { downloadOnClick, formattedDate } from '$lib';
	import ShAlert from '../../../../components/ShAlert.svelte';
	import type { PageProps } from './$types';
	const { data }: PageProps = $props();
	const reportType = data.reportType;
	let formState = $state({
		startRange: 15,
		endRange: 29,
		searchBy: ''
	});
	let isLoading = $state(false);
	let alertMessage: string | null = $state(null);
	let alertType: 'success' | 'error' | 'info' | 'warning'  |null = $state(null);

	const startRangeValidator = () => {
		if (formState.startRange < 0 || formState.startRange > 110) {
			console.error('Age start range should be greater than or is 0');
		}
	};
	const endRangeValidator = () => {
		if (formState.endRange > 110 || formState.endRange < formState.startRange) {
			console.error('Age end range should be greater than the start range');
		}
	};
	const triggerDownload = async (event: Event) => {
		isLoading = true;
		alertMessage = null; // Clear any previous message
		alertType = null;
		try {
			const formData = new FormData();
			if (reportType === 'age') {
				formData.append('startRange', formState.startRange.toString());
				formData.append('endRange', formState.endRange.toString());
				const downloadResp = await fetch('/survey/download/csv', {
					method: 'POST',
					body: formData
				});
				if (!downloadResp.ok) {
					const error = await downloadResp.json();
					console.error('Failed to download data:', error);
					alert(error?.error || 'Failed to download data');
					alertMessage = error?.error || 'Download failed.';
					alertType = 'error';
					return;
				}
				let addressesBlob = await downloadResp.blob();
				const fileName = `address_labels_${formattedDate(new Date())}.csv`;
				alertMessage = 'Download started successfully!';
				alertType = 'info';
				downloadOnClick(addressesBlob, fileName);
				alertMessage = 'Download completed successfully!';
				alertType = 'success';
                setTimeout(async () => {
                    await goto('/survey/family');
                }, 3000);
			}
		} catch (error: any) {
			console.error("Error initialing download", error);
			alertMessage = 'Failed to initiate download.';
			alertType = 'error';
		} finally {
			isLoading = false;
		}
	};
</script>

<div class="container mx-auto py-10">
	<div class=" rounded-lg p-8 shadow-md">
		<h1 class="text-primary mb-6 text-center text-2xl font-bold">Survey Search</h1>
		<ShAlert type={alertType} message={alertMessage} loading={isLoading} />
		{#if reportType === 'age'}
			<div class="space-y-4">
				<p class="text-primary mb-2 block text-sm font-bold">Age Range</p>
				<div class="flex gap-4">
					<div>
						<fieldset class="fieldset">
							<legend class="fieldset-legend">Start</legend>
							<input
								type="number"
								class="input validator"
								name="startRange"
								required
								readonly
								placeholder="Type a number between 0 to 110"
								min="0"
								max="110"
								bind:value={formState.startRange}
								title="Must be 0 or greater"
								onchange={startRangeValidator}
							/>
						</fieldset>
					</div>
					<div>
						<fieldset class="fieldset">
							<legend class="fieldset-legend">End</legend>
							<input
								type="number"
								class="input validator"
								name="endRange"
								required
								readonly
								placeholder="Type a number between 0 to 110"
								min="0"
								max="110"
								bind:value={formState.endRange}
								title="Must be more than startRange"
								onchange={endRangeValidator}
							/>
						</fieldset>
					</div>
				</div>
				<button onclick={triggerDownload} class="btn btn-primary btn-outline">Search</button>
			</div>
		{:else if reportType === 'taluk'}
			<div class="space-y-4">
				<p class="text-primary mb-2 block text-sm font-bold">
					SearchBy - <span class="text-2xl">T</span>aluk
				</p>
				<div class="flex gap-4">
					<div>
						<fieldset class="fieldset">
							<legend class="fieldset-legend">Start</legend>
							<input
								type="text"
								class="input validator"
								name="searchBy"
								required
								placeholder="Search By Taluk..."
								bind:value={formState.searchBy}
							/>
						</fieldset>
					</div>
				</div>
				<button disabled={!isLoading}  onclick={triggerDownload} class="btn btn-primary btn-outline">Search</button>
			</div>
		{:else}
			<p class="text-xl font-light text-orange-300">Report Type is not supported yet</p>
		{/if}
		<div id="searchResults" class="mt-8"></div>
	</div>
</div>
