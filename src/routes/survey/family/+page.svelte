<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
    let familyItems = $derived(data.families?.items || []);
    let currPage = $state(data.families?.page || 1);
    let totalPages = data.families?.totalPages || 0;
    let familiesList = $derived(familyItems.map((family)=> ({
        id: family.id,
        fullName: family.fullName,
        addressLine: family.addressLine,
        veda: family.veda,
        taluk: family.taluk,
        phoneNumber: family.phoneNumber
    })));
    let gotoPrevious = async () => {
        if(currPage > 1) {
            currPage -= 1;
            await goto(`?page=${currPage}`, {noScroll: true, invalidateAll: true, replaceState: true});
        }
    };

    let gotoNext = async () => {
        if(currPage < totalPages) {
            currPage += 1;
            await goto(`?page=${currPage}`, {noScroll: true, invalidateAll: true, replaceState: true});
        }
    };
</script>

<section class="flex justify-between">
    <h1 class="text-2xl font-bold text-primary mb-4">Family List</h1>
    <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-accent btn-outline m-1">Reports</div>
        <ul class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
          <li><a href="/survey/report/age">By Age</a></li>
        </ul>
      </div>
    <a href={`/survey/family/create`} class="btn btn-neutral btn-md">Add New</a>
</section>
<div class="overflow-x-auto">
	<table class="table-xs table">
		<thead>
			<tr>
				<th></th>
				<th>Full Name</th>
				<th>Address</th>
				<th>Veda</th>
				<th>Taluk</th>
				<th>Phone Number</th>
				<th></th>
			</tr>
		</thead>
		<tbody>
            {#each familiesList as family, i}
            <tr>
				<th>{i+1}</th>
				<td>{family.fullName}</td>
				<td>{family.addressLine}</td>
				<td>{family.veda}</td>
				<td>{family.taluk}</td>
				<td>{family.phoneNumber}</td>
				<th>
                    <a href={`/survey/family/${family.id}/edit`} class="btn btn-info btn-xs">edit</a>
                    <a href={`/survey/family/${family.id}/members`} class="btn btn-accent btn-xs md:mt-0 mt-2">members</a>
                </th>
			</tr>
            {/each}

		</tbody>
	</table>
    <div class="join flex justify-center">
        <button disabled={currPage == 1} onclick={gotoPrevious} class="join-item btn btn-outline">Previous page</button>
        <button disabled={currPage == totalPages} onclick={gotoNext} class="join-item btn btn-outline">Next</button>
    </div>
</div>
