<script>
	import Header from '$lib/components/Header.svelte';

	import { slide } from 'svelte/transition';

	//01-中心点移动
	import Pattern1 from '$lib/components/3_Dreieck2.svelte';
	//02-镜像
	import Pattern2 from '$lib/components/5_Dreieck2.svelte';
	//03-镜像2
	import Pattern3 from '$lib/components/5_Dreieck3.svelte';
	//04-边框（纯色，随机版本）
	import Pattern4 from '$lib/components/8_Dreieck_ui2.svelte';
	//05-优化风车
	import Pattern5 from '$lib/components/8_Dreieck_ui.svelte';
	//06-双风车
	import Pattern6 from '$lib/components/7_Dreieck_ui5.svelte';
	//07-随机蓝色
	import Pattern7 from '$lib/components/7_Dreieck_ui8_1.svelte';
	//import Pattern7 from '$lib/components/7_Dreieck_ui8.svelte';
	//08-随机4色
	import Pattern8 from '$lib/components/7_Dreieck_ui9.svelte';

	let patterns = [
		{
			name: '01 - Squares in the Grid (offset)',
			component: Pattern1,
			description: 'A grid of squares divided into two triangles that can get an offset.'
		},
		{
			name: '02 - Squares in the Grid (offset and size)',
			component: Pattern2,
			description: 'A grid of squares divided into two triangles that can get an offset and size.'
		},
		{
			name: '03 - Squares in the Grid (offset and size)',
			component: Pattern3,
			description: 'A grid of squares divided into two triangles that can get an offset and size.'
		},
		{
			name: '04 - Triangle Pattern with Mirroring',
			component: Pattern4,
			description: 'A triangle pattern that incorporates mirroring effects.'
		},
		{
			name: '05 - Two Colors with Accent',
			component: Pattern5,
			description: 'A triangle pattern using two main colors and one accent color.'
		},
		{
			name: '06 - Complex Triangle Pattern',
			component: Pattern6,
			description: 'A more complex triangle pattern with additional controls.'
		},
		{
			name: '07 - Advanced Triangle Pattern',
			component: Pattern7,
			description: 'An advanced triangle pattern with enhanced features.'
		},
		{
			name: '08 - Dynamic Triangle Pattern',
			component: Pattern8,
			description: 'A dynamic triangle pattern with multiple adjustable parameters.'
		}
	];

	let selectedPattern = $state(0);
	let SelectedPattern = $derived(patterns[selectedPattern].component);
</script>

<div class="app-container">
	<Header />
	<main class="app-main">
		<div class="sidebar-left">
			{#each patterns as pattern, index}
				<button
					class="sidebar-left-item"
					class:selected={selectedPattern === index}
					onclick={() => (selectedPattern = index)}
					>{pattern.name}
					{#if selectedPattern === index}
						<div transition:slide class="sidebar-left-description">{pattern.description}</div>
					{/if}
				</button>
			{/each}
		</div>

		<SelectedPattern />
	</main>
</div>
