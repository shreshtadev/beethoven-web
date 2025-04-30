<script lang="ts">
	import { enhance } from '$app/forms';
	import type { CreateUpdateFamilyRecord } from '$lib';
    let formState = $state<CreateUpdateFamilyRecord>({
        fullName: '',
        addressLine: '',
        veda: 'rigveda',
        category: '',
        subCategory: '',
        gothra: '',
        area: '',
        taluk: '',
        profession: '',
        emailAddress: '',
        phoneNumber: '',
    });
</script>
<div class="hero min-h-screen">
  <div class="hero-content text-center">
    <div class="max-w-lg mx-auto">
      <h1 class="text-5xl font-bold">Family Details Form</h1>
      <div class="py-6 w-full">
        This is a family survey. Please fill out the form below to help us understand your family better.
        <div class="divider"></div>
        <form action="?/createFamily" method="POST" use:enhance>
            <fieldset class="fieldset max-w-lg border border-base-300 p-4 rounded-box justify-between">
                <legend class="fieldset-legend">Family Details</legend>

                <label for="fullName" class="fieldset-label">Full Name</label>
                <input bind:value={formState.fullName} name="fullName" type="text" class="input w-full" placeholder="Full Name" />

                <label for="addressLine" class="fieldset-label">AddressLine</label>
                <textarea bind:value={formState.addressLine} name="addressLine" class="textarea h-24 w-full" placeholder="Address Line"></textarea>

                <label for="veda" class="fieldset-label">Veda</label>
                <select bind:value={formState.veda} name="veda" class="select w-full">
                    <option disabled selected>Pick one of the below</option>
                    <option value="rigveda">Rig Veda</option>
                    <option value="yajurveda">Yajur Veda</option>
                    <option value="samaveda">Sama Veda</option>
                  </select>

                <label for="category" class="fieldset-label">Category</label>
                <input bind:value={formState.category} name="category" type="text" class="input w-full" placeholder="Category" />

                <label for="subCategory" class="fieldset-label">Sub Category</label>
                <input bind:value={formState.subCategory} name="subCategory" type="text" class="input w-full" placeholder="Sub Category" />

                <label for="gothra" class="fieldset-label">Gothra</label>
                <input bind:value={formState.gothra} name="gothra" type="text" class="input w-full" placeholder="Gothra.." />

                <label for="area" class="fieldset-label">Area</label>
                <input bind:value={formState.area} name="area" type="text" class="input w-full" placeholder="Area.." />

                <label for="taluk" class="fieldset-label">Taluk</label>
                <input bind:value={formState.taluk} name="taluk" type="text" class="input w-full" placeholder="Taluk.." />

                <label for="profession" class="fieldset-label">Profession</label>
                <input bind:value={formState.profession} name="profession" type="text" class="input w-full" placeholder="Profession.." />

                <label for="emailAddress" class="fieldset-label">Email Address</label>
                <input bind:value={formState.emailAddress} name="emailAddress" type="email" class="input w-full" placeholder="Email Address.." />

                <label for="phoneNumber" class="fieldset-label">Contact Number</label>
                <input bind:value={formState.phoneNumber} name="phoneNumber" type="text" class="input w-full" placeholder="Contact Number.." />


                <button class="btn btn-neutral mt-4">Submit</button>
              </fieldset>
          </form>
      </div>
    </div>
  </div>
</div>
