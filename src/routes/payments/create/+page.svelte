<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { CreateUpdatePaymentRecord } from '$lib';
	import { LucidePlusCircle } from '@lucide/svelte';
	let { data, form } = $props();
	let profile = data.profile;
	const customers = data.customers;
	const currentDate = () => {
		const currDate = new Date().toISOString();
		return currDate;
	};
	let formState = $state<CreateUpdatePaymentRecord>({
		slNo: '',
		paymentDate: currentDate(),
		receivedFrom: '',
		receivedBy: profile?.email || '',
		amount: 0,
		paymentType: 'Receipt',
		paidOn: 'UPI',
		paymentRef: '',
		paidTo: '',
		paymentRefFile: undefined
	});
	async function handleUpdate(e: SubmitEvent) {
        const submittedForm = await fetch('/payments/create?/createPayment', {
            method: 'POST',
            body: new FormData(e.target as HTMLFormElement),
        });
		setTimeout(async () => {
            await goto('/payments', { replaceState: true, invalidateAll: true });
        }, 3000);
	}

	let filteredCustomers = $state(customers);

	function filterCustomers(searchTerm: string) {
		filteredCustomers = customers.filter((customer) =>
			customer.fullName.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}
</script>

<div class="hero min-h-screen">
	<div class="hero-content text-center">
		<div class="mx-auto max-w-lg">
			<h1 class="text-5xl font-bold">New Payment Form</h1>
			<div class="w-full py-6">
				Please fill in the payment information.
				<div class="divider"></div>
				<form
					onsubmit={handleUpdate}
					enctype="multipart/form-data"
					method="POST"
					use:enhance
				>
					<fieldset
						class="fieldset border-base-300 rounded-box max-w-lg justify-between border p-4"
					>
						<legend class="fieldset-legend">{formState.paymentType}</legend>
						<div class="flex flex-row">
							<a href="/customers/create" class="btn">
								<LucidePlusCircle />
								Customer
                            </a>
						</div>
						<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
							<div>
								<label for="slNo" class="fieldset-label">PaymentID</label>
								<input
									bind:value={formState.slNo}
									name="slNo"
									type="text"
									class="input w-full"
									placeholder="Payment Reference No.."
								/>
							</div>
							{#if formState.paymentType === 'Receipt'}
								<div>
									<label for="receivedFrom" class="fieldset-label">Received From</label>
									<input
										type="text"
										bind:value={formState.receivedFrom}
										name="receivedFrom"
										class="input w-full"
										placeholder="Search or type received from"
										list="customerList"
										oninput={(e: any) => filterCustomers(e.target?.value)}
										onblur={() => {
											// Ensure the value matches an option in the list
											if (
												!filteredCustomers.some(
													(customer) => customer.fullName === formState.receivedFrom
												)
											) {
												formState.receivedFrom = '';
											}
										}}
									/>
									<datalist id="customerList">
										{#each filteredCustomers as customer}
											<option value={customer.fullName}></option>
										{/each}
									</datalist>
								</div>
								<div>
									<label for="receivedBy" class="fieldset-label">Received By</label>
									<input
										type="text"
										bind:value={formState.receivedBy}
										name="receivedBy"
										readonly
										class="input w-full"
										placeholder="Received By"
									/>
								</div>
							{/if}

							{#if formState.paymentType === 'Voucher'}
								<div>
									<label for="paidTo" class="fieldset-label">Paid To</label>
									<input
										type="text"
										bind:value={formState.paidTo}
										name="paidTo"
										required={formState.paymentType === 'Voucher'}
										class="input w-full"
										placeholder="Paid To..."
									/>
								</div>
								<div>
									<label for="receivedBy" class="fieldset-label">Issued By</label>
									<input
										type="text"
										bind:value={formState.receivedBy}
										name="receivedBy"
										readonly
										class="input w-full"
										placeholder="Received By"
									/>
								</div>
							{/if}

							<div>
								<label for="paidOn" class="fieldset-label">Paid On</label>
								<select bind:value={formState.paidOn} name="paidOn" class="select w-full">
									<option disabled selected>Pick one of the below</option>
									<option value="Cash">Cash</option>
									<option value="Cheque">Cheque</option>
									<option value="DD">DD</option>
									<option value="UPI">UPI</option>
									<option value="NEFT">NEFT</option>
									<option value="RTGS">RTGS</option>
								</select>
							</div>

							<div>
								<label for="paymentType" class="fieldset-label">Payment Type</label>
								<select bind:value={formState.paymentType} name="paymentType" class="select w-full">
									<option disabled selected>Pick one of the below</option>
									<option value="Receipt">Receipt</option>
									<option value="Voucher">Voucher</option>
								</select>
							</div>

							<div>
								<label for="amount" class="fieldset-label">Amount</label>
								<input
									bind:value={formState.amount}
									name="amount"
									type="number"
									min="0"
									class="input w-full"
									placeholder="Amount..."
								/>
							</div>
							<div>
								<label for="paymentDate" class="fieldset-label">Payment Date</label>
								<input
									bind:value={formState.paymentDate}
									name="paymentDate"
									type="text"
									readonly
									class="input w-full"
									placeholder="Payment Date..."
								/>
							</div>

							<div>
								<label for="paymentRef" class="fieldset-label">Payment Reference</label>
								<input
									bind:value={formState.paymentRef}
									name="paymnetRef"
									type="text"
									class="input w-full"
									placeholder="PaymentRef..."
								/>
							</div>

							<!-- <div>
								<label for="paymentRefFile" class="fieldset-label">Payment Reference File</label>
								<input
									bind:value={formState.paymentRefFile}
									name="paymnetRefFile"
									type="file"
									class="input w-full"
									placeholder="PaymentRef..."
								/>
							</div> -->
						</div>
						<button class="btn btn-neutral mt-4">Submit</button>
					</fieldset>
				</form>
			</div>
		</div>
	</div>
</div>
