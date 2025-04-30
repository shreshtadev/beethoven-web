<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { get, writable } from 'svelte/store';

	let currentPage = writable(1);
	let itemsPerPage = 10;
	let paginatedData = writable([]);
	let totalPages = writable(0);

	let { data }: { data: PageData } = $props();
	let { open, close, dayBook } = data;

	onMount(() => {
		updatePagination();
	});

	function updatePagination() {
		const start = (get(currentPage) - 1) * itemsPerPage;
		const end = start + itemsPerPage;
		paginatedData.set(dayBook.slice(start, end));
		totalPages.set(Math.ceil(dayBook.length / itemsPerPage));
	}

	function goToPage(page: number) {
		currentPage.set(page);
		updatePagination();
	}
</script>

<div class="flex flex-col gap-4 md:flex-row">
	<!-- Open Card -->
	<div class="w-full rounded-lg bg-white p-4 shadow-md md:w-1/2">
		<h2 class="text-lg font-semibold text-gray-800">Open</h2>
		<p class="text-sm text-gray-600">Date: {open.forDate}</p>
		<div class="mt-2">
			<p class="text-sm text-gray-800">
				Amount Credited: <span class="font-medium">{open.amountCredited}</span>
			</p>
			<p class="text-sm text-gray-800">
				Amount Debited: <span class="font-medium">{open.amountDebited}</span>
			</p>
			<p class="text-sm text-gray-800">Balance: <span class="font-medium">{open.balance}</span></p>
		</div>
		{#if open.errors}
			<div class="mt-2 text-sm text-red-500">
				<p>Errors: {open.errors}</p>
			</div>
		{/if}
	</div>

	<!-- Close Card -->
	<div class="w-full rounded-lg bg-white p-4 shadow-md md:w-1/2">
		<h2 class="text-lg font-semibold text-gray-800">Close</h2>
		<p class="text-sm text-gray-600">Date: {close.forDate}</p>
		<div class="mt-2">
			<p class="text-sm text-gray-800">
				Amount Credited: <span class="font-medium">{close.amountCredited}</span>
			</p>
			<p class="text-sm text-gray-800">
				Amount Debited: <span class="font-medium">{close.amountDebited}</span>
			</p>
			<p class="text-sm text-gray-800">Balance: <span class="font-medium">{close.balance}</span></p>
		</div>
		{#if close.errors}
			<div class="mt-2 text-sm text-red-500">
				<p>Errors: {close.errors}</p>
			</div>
		{/if}
	</div>
</div>

<div class="mt-6">
	<h2 class="text-lg font-semibold text-primary">Day Book</h2>
	<table class="mt-4 w-full table-auto border-collapse border border-gray-300">
		<thead>
			<tr class="bg-gray-100">
                <th class="text-accent border border-gray-300 px-4 py-2">Sl No</th>
				<th class="text-accent border border-gray-300 px-4 py-2">Date</th>
				<th class="text-accent border border-gray-300 px-4 py-2">Description</th>
				<th class="text-accent border border-gray-300 px-4 py-2">Amount</th>

			</tr>
		</thead>
		<tbody>
			{#each dayBook as entry}
				<tr>
                    <td class="border border-gray-300 px-4 py-2">{entry.slNo}</td>
					<td class="border border-gray-300 px-4 py-2">{entry.paymentDate.split(" ")[0]}</td>
					<td class="border border-gray-300 px-4 py-2">{entry.narration}</td>
					<td class="border border-gray-300 px-4 py-2">{entry.amount}</td>

				</tr>
			{/each}
		</tbody>
	</table>
</div>
