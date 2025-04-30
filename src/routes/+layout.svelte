<script lang="ts">
	import '../app.css';
	import type { Snippet } from 'svelte';

	import type { LayoutData } from './$types';
	import { isDMSFeatureEnabled, isPaymentFeatureEnabled, isSurveyFeatureEnabled } from '$lib';
	let { data, children }: { data: LayoutData; children: Snippet } = $props();
	let profile = data.profile;
	let isSurveyEnabled = isSurveyFeatureEnabled(profile?.features);
	let isDMSEnabled = isDMSFeatureEnabled(profile?.features);
    let isPaymentEnabled = isPaymentFeatureEnabled(profile?.features);
</script>

<div class=" flex min-h-screen flex-col">
	<div class="bg-base-100 border-b-2">
		<div class="navbar bg-base-100 mx-auto px-4 xl:container">
			<div class="navbar-start">
				<div class="dropdown">
					<button class="btn btn-ghost md:hidden" aria-label="company-logo">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h8m-8 6h16"
							/></svg
						>
					</button>
					<ul
						class="menu menu-compact dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
					>
						<li>
							<a href="/">Home</a>
						</li>
						{#if profile?.id}
							{#if isDMSEnabled}
								<li>
									<a href="/files">Files</a>
								</li>
							{/if}
							{#if isSurveyEnabled}
								<li>
									<a href="/survey/family">Survey</a>
								</li>
							{/if}
                            {#if isPaymentEnabled}
                                <li>
                                    <a href="/payments">Payments</a>
                                </li>
                             {/if}
							<li>
								<form action="/logout" method="POST">
									<button>Logout</button>
								</form>
							</li>
						{:else}
							<li><a href="/login">Login</a></li>
						{/if}
					</ul>
				</div>
				<a href="/" class="btn btn-ghost rounded-md text-xl hover:cursor-pointer">
					Shreshta Systems
				</a>
			</div>
			<div class="navbar-end space-x-2">
				<a class="btn btn-accent" href="/">Home</a>
				{#if profile?.id}
					{#if isDMSEnabled}
						<a class="btn btn-primary btn-outline" href="/files">Files</a>{/if}
					{#if isSurveyEnabled}
						<a class="btn btn-primary btn-outline" href="/survey/family">Survey</a>
					{/if}
                    {#if isPaymentEnabled}
                        <a class="btn btn-primary btn-outline" href="/payments">Payments</a>
                    {/if}
					<form action="/logout" method="POST">
						<button class="btn btn-primary">Logout</button>
					</form>
				{:else}
					<a href="/login" class="btn btn-outline">Login</a>
					<!-- <a href="/register" class="btn btn-primary btn-outline">Register</a> -->
				{/if}
			</div>
		</div>
	</div>
	<div class="mx-auto mt-8 h-full w-full flex-grow px-4 xl:container">
		{@render children()}
	</div>
	<footer class="footer sm:footer-horizontal footer-center bg-base-300 text-primary p-4 text-lg">
		<aside>
			<p>Copyright © {new Date().getFullYear()} - All right reserved by ShreshtaSMG</p>
		</aside>
	</footer>
</div>
