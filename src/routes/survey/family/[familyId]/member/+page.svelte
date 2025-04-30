<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
	let memberItems = $derived(data.members?.items || []);
	let currPage = $state(data.members?.page || 1);
	let totalPages = data.members?.totalPages || 0;
	let membersList = $derived(
		memberItems.map((member: any) => ({
			id: member.id,
			fullName: member.fullName,
			age: member.age,
			isMarried: member.isMarried === 'married' ? 'Yes' : 'No',
			relatedAs: member.relatedAs,
			familyId: member.familyId
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
</script>

<h1>Member List</h1>
<div class="overflow-x-auto">
	<table class="table-xs table">
		<thead>
			<tr>
				<th></th>
				<th>Full Name</th>
				<th>Age</th>
				<th>Is Married</th>
				<th>Related As</th>
                <th></th>
			</tr>
		</thead>
		<tbody>
            {#if membersList.length == 0}
                <tr>
                    <td colspan="5" class="text-center text-xl">No members found</td>
                </tr>
            {:else}
            {#each membersList as member, i}
            <tr>
                <th>{i + 1}</th>
                <td>{member.fullName}</td>
                <td>{member.age}</td>
                <td>{member.isMarried}</td>
                <td>{member.relatedAs}</td>
                <td><a href={`/survey/family/${member.familyId}/members/${member.id}/edit`} class="btn btn-info btn-xs">edit</a></td>
            </tr>
        {/each}
            {/if}
		</tbody>
	</table>
	<div class="join mt-4 grid grid-cols-2 content-start justify-items-center">
		<button disabled={currPage == 1} onclick={gotoPrevious} class="join-item btn btn-outline"
			>Previous page</button
		>
		<button disabled={currPage == totalPages} onclick={gotoNext} class="join-item btn btn-outline"
			>Next</button
		>
	</div>
</div>
