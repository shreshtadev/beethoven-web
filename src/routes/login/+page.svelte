<script lang="ts">
	import { goto } from '$app/navigation';
	import { FolderSync } from '@lucide/svelte';
	let loginForm = $state({
		email: '',
		password: ''
	});
	const handleLogin = async (e: Event) => {
		const loginFormData = new FormData();
		loginFormData.append('email', loginForm.email);
		loginFormData.append('password', loginForm.password);
		try {
			const loginResponse = await fetch('/login', {
				method: 'POST',
				body: loginFormData,
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                credentials: 'include'
			});
            if (!loginResponse.ok) {
                throw new Error('Login failed');
            }
			setTimeout(async () => {
				await goto('/');
			}, 3000);
		} catch (error) {
			console.error('Login failed:', error);
            await goto('/', { replaceState: true, invalidateAll: true });
		}
	};
</script>

<div class="flex h-full w-full flex-col items-center pt-12">
	<div class="text-primary h-24 w-24">
		<FolderSync />
	</div>
	<h2 class="text-base-content mt-2 text-center text-3xl font-bold tracking-tight">
		Sign in to your account
	</h2>
	<div class="mt-6 w-full max-w-sm rounded-lg py-6 shadow-md">
		<form class="flex w-full flex-col items-center space-y-2">
			<div class="form-control w-full max-w-xs">
				<label for="email" class="label pb-1 font-medium">
					<span class="label-text">Email</span>
				</label>
				<input
					bind:value={loginForm.email}
					type="email"
					name="email"
					class="input input-bordered w-full max-w-xs"
				/>
			</div>
			<div class="form-control w-full max-w-xs">
				<label for="password" class="label pb-1 font-medium">
					<span class="label-text">Password</span>
				</label>
				<input
					bind:value={loginForm.password}
					type="password"
					name="password"
					class="input input-bordered w-full max-w-xs"
				/>
			</div>
			<div class="w-full max-w-xs pt-3">
				<button onclick={handleLogin} class="btn btn-primary w-full max-w-xs">Login</button>
			</div>
		</form>
	</div>
</div>
