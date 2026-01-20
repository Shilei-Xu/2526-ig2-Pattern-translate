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
	//基础版本
	//import Pattern from '$lib/components/6_Dreieck.svelte';
	//import Pattern from '$lib/components/6_Dreieck2.svelte';
	//四角中间，四角分开 - 灰色
	//import Pattern from '$lib/components/6_Dreieck3.svelte';

	/* 蓝色底，salmon色三角形,4格旋转，不同位置 */
	//import Pattern from '$lib/components/6_Dreieck_farbe.svelte';
	//import Pattern from '$lib/components/6_Dreieck_farbe2.svelte';
	//import Pattern from '$lib/components/6_Dreieck_farbe3.svelte';

	/* 0111 新增UI控制 */
	//老师例子
	//import Pattern from '$lib/components/1_ui_pattern.svelte';
	//四角中间，四角分开
	//import Pattern from '$lib/components/7_Dreieck_ui.svelte';
	//四角都中间
	//import Pattern from '$lib/components/7_Dreieck_ui2.svelte';
	//去掉随机颜色,hartmut中心点
	//import Pattern from '$lib/components/7_Dreieck_ui3.svelte';
	//0113 中心点优化
	//import Pattern from '$lib/components/7_Dreieck_ui4.svelte';
	//0113 range优化
	//import Pattern from '$lib/components/7_Dreieck_ui5.svelte';
	//0119 beni中心点优化
	//import Pattern from '$lib/components/7_Dreieck_ui6.svelte';

	/* 0119 整体逻辑 */

	//02-中心点移动
	//import Pattern from '$lib/components/3_Dreieck.svelte';
	//03-镜像
	//import Pattern from '$lib/components/5_Dreieck.svelte';
	//04-2色，1重点色
	//import Pattern from '$lib/components/7_Dreieck_ui5.svelte';
	//05-复杂
	//import Pattern from '$lib/components/7_Dreieck_ui7.svelte';
	//06
	//import Pattern from '$lib/components/7_Dreieck_ui8.svelte';
	//07
	import Pattern from '$lib/components/7_Dreieck_ui9.svelte';

	import chroma from 'chroma-js';
</script>

<div class="app-container">
	<Header />
	<main class="app-main">
		<Pattern />
	</main>
</div>
