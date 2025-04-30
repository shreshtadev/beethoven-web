<script lang="ts">
	import { enhance } from '$app/forms';
	import type { CreateUpdateMemberRecord, MemberRecord } from '$lib';
	import type { PageProps } from './$types';
    let {data}: PageProps = $props();
    let foundMember = data.foundMember as MemberRecord;
    let memberId = foundMember.id;

	let formState = $state<CreateUpdateMemberRecord>({
        id: memberId,
		fullName: foundMember.fullName,
		relatedAs: foundMember.relatedAs,
		age: foundMember.age,
		emailAddress: foundMember.emailAddress,
		phoneNumber: foundMember.phoneNumber,
		isMarried: foundMember.isMarried,
		educationProfession: foundMember.educationProfession,
        familyId: foundMember.familyId
	});
</script>

<div class="hero  min-h-screen">
	<div class="hero-content text-center">
		<div class="mx-auto max-w-lg">
			<h1 class="text-5xl font-bold">Member Details Form</h1>
			<div class="w-full py-6">
				This is a family survey. Please fill out the form below to help us understand your family
				better.
				<div class="divider"></div>
				<form action="?/updateMember" method="POST" use:enhance>
					<fieldset
						class="fieldset border-base-300 rounded-box max-w-lg gap-4 border p-4"
					>
						<legend class="fieldset-legend">Member Details</legend>

						<label for="fullName" class="fieldset-label">Full Name</label>
						<input
							bind:value={formState.fullName}
							name="fullName"
							type="text"
							class="input w-full"
							placeholder="Full Name"
						/>

						<label for="isMarried" class="fieldset-label">Is Married</label>
						<select bind:value={formState.isMarried} name="isMarried" class="select w-full">
							<option disabled selected>Pick one of the below</option>
							<option value="married">Married</option>
							<option value="unmarried">Unmarried</option>
						</select>

						<label for="relatedAs" class="fieldset-label">Category</label>
						<input
							bind:value={formState.relatedAs}
							name="relatedAs"
							type="text"
							class="input w-full"
							placeholder="Related As"
						/>

						<label for="age" class="fieldset-label">Age</label>
						<input
							type="number"
							class="input validator"
                            name="age"
							required
							placeholder="Type a number between 0 to 110"
							min="0"
							max="110"
                            bind:value={formState.age}
							title="Must be between be 0 to 110"
						/>
						<p class="validator-hint">Must be between be 0 to 110</p>

						<label for="educationProfession" class="fieldset-label">Education/Profession</label>
						<input
							bind:value={formState.educationProfession}
							name="educationProfession"
							type="text"
							class="input w-full"
							placeholder="Education/Profession.."
						/>

						<label for="emailAddress" class="fieldset-label">Email Address</label>
						<input
							bind:value={formState.emailAddress}
							name="emailAddress"
							type="email"
							class="input w-full"
							placeholder="Email Address.."
						/>

						<label for="phoneNumber" class="fieldset-label w-full">Contact Number</label>
                        <input
							bind:value={formState.phoneNumber}
							name="phoneNumber"
							class="input w-full tabular-nums validator"
							placeholder="Contact Number.."
                            type="tel" required pattern="[0-9]*" minlength="10" maxlength="10" title="Must be 10 digits"
						/>
                        <p class="validator-hint">Must be 10 digits</p>

						<button class="btn btn-neutral mt-4">Submit</button>
					</fieldset>
				</form>
			</div>
		</div>
	</div>
</div>
