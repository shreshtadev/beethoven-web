<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { downloadOnClick } from '$lib';
	import ShAlert from '../../components/ShAlert.svelte';
	import type { ActionData, PageData } from './$types';

	let { data  }: { data: PageData } = $props();
	let receiptItems = $derived(data.receipts?.items || []);
	let currPage = $state(data.receipts?.page || 1);
	let totalPages = data.receipts?.totalPages || 0;
	let receiptsList = $derived(
		receiptItems.map((ri) => {
			return {
				id: ri.id,
				paymentId: ri.slNo,
				paymentDate: ri.paymentDate,
				from: ri.receivedFrom,
				type: ri.paymentType,
				to: ri.paidTo,
                amount: ri.amount
			};
		})
	);
	let isLoading = $state(false);
	let alertMessage: string | null = $state(null);
	let alertType: 'success' | 'error' | 'info' | 'warning' | null = $state(null);

	const generateDocumentToDownload = async (paymentType: string, paymentId: string) => {
		isLoading = true;
		alertMessage = null; // Clear any previous message
		alertType = null;
		try {
			const response = await fetch('payments/download/pdf', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ paymentType: paymentType.toLowerCase(), paymentId: paymentId })
			});
			if (!response.ok) {
				const error = await response.json();
				console.error('Failed to download data:', error);
				alert(error?.error || 'Failed to download data');
				alertMessage = error?.error || 'Download failed.';
				alertType = 'error';
				return;
			}
			const receiptBlob = await response.blob();
			const currDate = new Date();
			const year = currDate.getFullYear();
			const month = currDate.getUTCMonth();
			const day = currDate.getUTCDate();
            const fileName = `${year + '_' + month + '_' + day}_MD_${paymentId}.pdf`;
			// downloadOnClick(receiptBlob, fileName);
			alertMessage = 'Download completed successfully!';
			alertType = 'success';
			setTimeout(async () => {
				console.log('Downloaded file.');
			}, 3000);
		} catch (error: any) {
			console.error('Error initialing download', error);
			alertMessage = 'Failed to initiate download.';
			alertType = 'error';
		} finally {
			isLoading = false;
		}
	};

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
</script>

<section class="flex justify-between">
	<h1 class="text-primary mb-4 text-2xl font-bold">Payments</h1>
	<div class="dropdown">
		<div tabindex="0" role="button" class="btn btn-accent btn-outline m-1">Reports</div>
		<ul class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
			<li><a href="/payments/reports">Day Book</a></li>
		</ul>
	</div>
	<a href={`/payments/create`} class="btn btn-neutral btn-md">Add New</a>
</section>

<div class="overflow-x-auto">
	<table class="table-xs table">
		<thead>
			<tr>
				<th></th>
				<th>Payment ID</th>
				<th>Date</th>
				<th>From</th>
				<th>To</th>
				<th>Payment Type</th>
                <th>Amount</th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			{#each receiptsList as receipt, i}
				<tr>
					<th>{i + 1}</th>
					<td>{receipt.paymentId}</td>
					<td>{receipt.paymentDate.split(" ")[0]}</td>
					<td>{receipt.from || '-NA-'}</td>
					<td>{receipt.to || '-NA-'}</td>
					<td>{receipt.type}</td>
                    <td>{receipt.amount}</td>
					<th class="flex flex-row gap-2">
						<a href={`/payments/${receipt.id}/edit`} class="btn btn-info btn-xs">edit</a>
						<button
							onclick={async () => await generateDocumentToDownload(receipt.type, receipt.id)}
							class="btn btn-info btn-xs">download</button
						>
					</th>
				</tr>
			{/each}
		</tbody>
	</table>
	<div class="join flex justify-center">
		<button disabled={currPage == 1} onclick={gotoPrevious} class="join-item btn btn-outline"
			>Previous page</button
		>
		<button disabled={currPage == totalPages} onclick={gotoNext} class="join-item btn btn-outline"
			>Next</button
		>
	</div>
</div>
<section class="flex flex-col">
    <ShAlert type={alertType} message={alertMessage} loading={isLoading} />
</section>
