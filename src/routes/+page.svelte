<script>
	import Header from '$lib/components/Header.svelte';
	/* 课堂学习 */
	//import Pattern from '$lib/components/1_PatternRect.svelte';	
	//import Pattern from '$lib/components/2_PatternRectStruct.svelte';	
	//import Pattern from '$lib/components/2_Dreieck.svelte';	
	//import Pattern from '$lib/components/2_Cube.svelte';	
	//import Pattern from '$lib/components/2_Cube2.svelte';

	/* 初期尝试 */
	//import Pattern from '$lib/components/3_Dreieck.svelte';
	//import Pattern from '$lib/components/4_Dreieck.svelte';	
	//import Pattern from '$lib/components/5_Dreieck.svelte';

	/* 2格旋转- 4格旋转 */
	//import Pattern from '$lib/components/6_Dreieck.svelte';	
	//import Pattern from '$lib/components/6_Dreieck2.svelte';	
	//import Pattern from '$lib/components/6_Dreieck3.svelte';

	/* 蓝色底，salmon色三角形,4格旋转，不同位置 */
	//import Pattern from '$lib/components/6_Dreieck_farbe.svelte';	
	//import Pattern from '$lib/components/6_Dreieck_farbe2.svelte';
	import Pattern from '$lib/components/6_Dreieck_farbe3.svelte';
	
	import chroma from 'chroma-js';
</script>

<div class="app-container">
	<Header />
	<main class="app-main">
		<Pattern />
	</main>
</div>
