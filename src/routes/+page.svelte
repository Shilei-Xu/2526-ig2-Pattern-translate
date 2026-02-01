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
	//05-彩色方块
	import Pattern5 from '$lib/components/8_Dreieck_ui.svelte';
	//06-三角风车
	import Pattern6 from '$lib/components/7_Dreieck_ui6.svelte';
	//08-主色调三角形 有一些微小随机
	//import Pattern7 from '$lib/components/7_Dreieck_ui8_1.svelte';
	import Pattern8 from '$lib/components/7_Dreieck_ui8_2.svelte';

	//import Pattern7 from '$lib/components/7_Dreieck_ui8.svelte';
	//07-同色系
	import Pattern7 from '$lib/components/7_Dreieck_ui9.svelte';

	let patterns = [
		{
			name: '01 - Ribbon Triangles (Center Motion)',
			component: Pattern1,
			description: 'Four triangles form a ribbon-like pattern, animated by moving their center points.'
		},
		{
			name: '02 - Ribbon Triangles (Mirrored)',
			component: Pattern2,
			description: 'A ribbon-style triangle pattern with mirrored symmetry.'
		},
		{
			name: '03 - Ribbon Triangles (Mirror + Color Shift)',
			component: Pattern3,
			description: 'A mirrored ribbon triangle pattern with dynamic color variations.'
		},
		{
			name: '04 - Solid Border Triangles (Random Colors)',
			component: Pattern4,
			description: 'A border-style triangle layout using solid fills with randomized color schemes.'
		},
		{
			name: '05 - Colorful Squares',
			component: Pattern5,
			description: 'Squares filled with vibrant colors, forming a lively mosaic pattern.'
		},
		{
			name: '06 - Triangle Windmill',
			component: Pattern6,
			description: 'Triangles arranged like a spinning windmill, creating a dynamic rotational effect.'
		},
		{
			name: '07 - Primary Hue Triangles (with Randomness)',
			component: Pattern7,
			description: 'Triangles based on a primary color hue, with slight randomness to add organic variation.'
		},
		{
			name: '08 - Monochrome Triangles',
			component: Pattern8,
			description: 'Triangles using a single color palette with subtle variations for a harmonious look.'
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
