<script>
	let offset = $state(0);
	let xCount = $state(20);
	let yCount = $state(40);
	let xSize = $derived(1000 / xCount);
	let ySize = $derived(1000 / yCount);
	let xm = $state(40);
	let ym = $state(12);

	function calculatePosition(xi, yi) {
		const x = xi * (xSize + offset);
		const y = yi * (ySize + offset);
		return { x: x, y: y };
	}
</script>

<div id="control">
	<span>Offset: {offset}</span>
	<input type="range" min="0" max="200" bind:value={offset} />

	<span>Count X: {xCount}</span>
	<input type="range" min="5" max="50" bind:value={xCount} />

	<span>Count Y: {yCount}</span>
	<input type="range" min="10" max="70" bind:value={yCount} />

	<span>Center X: {xm}</span>
	<input
		type="range"
		min={0}
		max={xSize}
		bind:value={xm}
		on:input={() => (xm = parseInt(xm))}
	/>

	<span>Center Y: {ym}</span>
	<input
		type="range"
		min={0}
		max={ySize}
		bind:value={ym}
		on:input={() => (ym = parseInt(ym))}
	/>


</div>

<div class="svg-container">
	<svg viewBox="0 0 1000 1000" class="svg-canvas">
		{#each Array.from({ length: yCount }) as _, yi}
			{#each Array.from({ length: xCount }) as _, xi}
				<g
					transform="
        translate({calculatePosition(xi, yi).x}, {calculatePosition(xi, yi).y})
        {yi % 2 === 1 ? ` translate(${xSize}, ${ySize}) rotate(180)` : ''}
    "
				>
					<polygon points="0,0 0,{ySize} {xm},{ym}" fill="white" />
					<polygon points="{xSize},0 {xSize},{ySize} {xm},{ym}" fill="lightgrey" />
					<polygon points="0,0 {xSize},0 {xm},{ym}" fill="tomato" />
					<polygon points="0,{ySize} {xSize},{ySize} {xm},{ym}" fill="lightcoral" />
				</g>
			{/each}
		{/each}
	</svg>
</div>

<style>
	#control {
		display: flex;
		flex-direction: column;
		width: 300px;
		justify-content: left;
		align-items: flex-start;
		margin-top: 100px;
		margin-left: 50px;
		gap: 10px;
		font-weight: bold;
		color: rgb(248, 246, 246);
	}

	input[type='range'] {
		-webkit-appearance: none;
		width: 60%;
		height: 8px;
		background: #ccc; /* 滑轨颜色 */
		border-radius: 4px;
	}

	/* Chrome / Edge / Safari 滑块按钮 */
	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: 20px;
		height: 20px;
		background: tomato; /* ← 按钮颜色 */
		border-radius: 50%;
		cursor: pointer;
	}
</style>
