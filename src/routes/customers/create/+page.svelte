<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { AddressLine, CreateUpdateCustomerRecord } from '$lib';
	import type { ActionData, PageData } from '../$types';
	import ShAlert from '../../../components/ShAlert.svelte';
    const {data, form }: {data: PageData, form: any} = $props();
    let isLoading = $derived(data.loading || form !== null);
	let alertMessage: string | null = $derived(data.alert?.message || form?.message || null);
	let alertType: 'success' | 'error' | 'info' | null = $derived(
		data.alert?.type || form?.type || null
	);
	const address: AddressLine = {
		addressLine1: '',
		area: '',
		taluk: '',
		pinCode: ''
	};
	const formState = $state<CreateUpdateCustomerRecord>({
		fullName: '',
		addressLine: address,
		phoneNumber: '',
		panNo: ''
	});

	const handleSubmit = async () => {
        const submittedForm = await fetch('/customers/create?/createCustomer', {
            method: 'POST',
            body: new FormData(form),
        });
        setTimeout(async () => {
		    await goto('/payments/create', { replaceState: true, invalidateAll: true });
        }, 3000);
	};
</script>

<div class="hero min-h-screen">
	<div class="hero-content text-center">
		<div class="mx-auto max-w-lg">
			<h1 class="text-5xl font-bold">Contact Details Form</h1>
			<div class="w-full py-6">
				Please fill out the contact form below.
				<div class="divider"></div>
                <ShAlert loading={isLoading} type={alertType} message={alertMessage} />
				<form>
					<fieldset
						class="fieldset border-base-300 rounded-box max-w-lg justify-between border p-4"
					>
						<legend class="fieldset-legend">Customer Details</legend>
						<label for="fullName" class="fieldset-label">Full Name</label>
						<input
							bind:value={formState.fullName}
							name="fullName"
							type="text"
                            required
							class="input w-full"
							placeholder="Full Name"
						/>

						<section>
							<address class="fieldset-label">Address</address>
							<label for="addressLine1" class="fieldset-label">Address Line 1</label>
							<input
								bind:value={address.addressLine1}
								name="addressLine1"
								type="text"
                                required
								class="input w-full"
								placeholder="Address Line 1"
							/>

							<label for="area" class="fieldset-label">Area</label>
							<input
								bind:value={address.area}
								name="area"
								type="text"
								class="input w-full"
								placeholder="Area"
							/>

							<label for="area" class="fieldset-label">Taluk</label>
							<input
								bind:value={address.taluk}
								name="taluk"
								type="text"
								class="input w-full"
								placeholder="Taluk"
							/>

							<label for="area" class="fieldset-label">Pin Code</label>
							<input
								bind:value={address.pinCode}
								name="pinCode"
								type="text"
                                required
								class="input w-full"
								placeholder="Pin Code"
							/>
						</section>
						<label for="phoneNumber" class="fieldset-label">Contact Number</label>
						<input
							bind:value={formState.phoneNumber}
							name="phoneNumber"
							type="text"
                            required
							class="input w-full"
							placeholder="Phone Number"
						/>

						<label for="panNo" class="fieldset-label">Pan No</label>
						<input
							bind:value={formState.panNo}
							name="panNo"
							type="text"
							class="input w-full"
							placeholder="Pan No"
						/>
						<button onclick={handleSubmit} type="submit" class="btn btn-neutral mt-4">Submit</button>
					</fieldset>
				</form>
			</div>
		</div>
	</div>
</div>
