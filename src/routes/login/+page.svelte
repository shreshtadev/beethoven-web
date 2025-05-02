<script lang="ts">
	import { goto } from '$app/navigation';
	import {FolderSync} from '@lucide/svelte';
    const {form} = $props();
    const handleLogin = async (e: SubmitEvent) => {
        const submittedForm = await fetch('/login?/login', {
            method: 'POST',
            body: new FormData(e.target as HTMLFormElement),
        });
        setTimeout(async () => {
            await goto('/dashboard', { replaceState: true, invalidateAll: true });
        }, 3000);
    }
</script>

<div class="flex flex-col items-center h-full w-full pt-12">
	<div class="h-24 w-24 text-primary">
		<FolderSync />
	</div>
	<h2 class="mt-2 text-center text-3xl font-bold tracking-tight text-base-content">
		Sign in to your account
	</h2>
	<div class=" py-6 shadow-md rounded-lg w-full max-w-sm mt-6">
		<form method="POST" class="flex flex-col items-center space-y-2 w-full">
			<div class="form-control w-full max-w-xs">
				<label for="email" class="label font-medium pb-1">
					<span class="label-text">Email</span>
				</label>
				<input type="email" name="email" class="input input-bordered w-full max-w-xs" />
			</div>
			<div class="form-control w-full max-w-xs">
				<label for="password" class="label font-medium pb-1">
					<span class="label-text">Password</span>
				</label>
				<input type="password" name="password" class="input input-bordered w-full max-w-xs" />
			</div>
			<div class="w-full max-w-xs pt-3">
				<button class="btn btn-primary w-full max-w-xs">Login</button>
			</div>
		</form>
	</div>
</div>
