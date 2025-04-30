<script lang="ts">
	import { fade } from 'svelte/transition';
	import { LucideCheck, LucideCircleAlert, LucideInfo, LucideOctagonX } from '@lucide/svelte';
	let timer: number | null = $state(null);

	let props = $props();
    let message = props.message;
    let type = props.type;
    let loading = props.loading;
	const timeout = $state(3000);
	$effect(() => {
		if ($message && timeout > 0) {
			if (timer) {
				clearTimeout(timer);
			}
			timer = setTimeout(async () => {
				message.set(null);
				type.set(null);
				timer = null;
			}, timeout);
		} else if (!$message && timer) {
			clearTimeout(timer);
			timer = null;
		}
		return () => {
			if (timer) {
				clearTimeout(timer);
			}
		};
	});
</script>

{#if loading}
	<div class="overlay" transition:fade>
		<div class="spinner"></div>
	</div>
{/if}

{#if message}
	<div role="alert" class={`alert alert-${type} alert-soft dropShadow m-4`} transition:fade>
		{#if type === 'info'}
			<LucideInfo class={`h-6 w-6 shrink-0 stroke-${type}`} viewBox="0 0 24 24" />
            <span class={`font-semibold text-lg text-blue-200`}>{message}</span>
		{/if}
		{#if type === 'success'}
			<LucideCheck class={`h-6 w-6 shrink-0 stroke-${type}`} viewBox="0 0 24 24" />
            <span class={`font-semibold text-lg text-primary`}>{message}</span>
		{/if}
		{#if type === 'warning'}
			<LucideCircleAlert class={`h-6 w-6 shrink-0 stroke-${type}`} viewBox="0 0 24 24" />
            <span class={`font-semibold text-lg text-amber-200`}>{message}</span>
		{/if}
		{#if type === 'error'}
			<LucideOctagonX class={`h-6 w-6 shrink-0 stroke-${type}`} viewBox="0 0 24 24" />
            <span class={`font-semibold text-lg text-red-400`}>{message}</span>
		{/if}
	</div>
{/if}
