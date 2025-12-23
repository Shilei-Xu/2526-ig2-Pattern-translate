<script>
	let offset = $state(0);
	let squareCount = $state(15);
	let squareSize = $derived(1000 / squareCount);

	function calculatePosition(xi, yi) {
		const x = xi * (squareSize + offset);
		const y = yi * (squareSize + offset);

		return { x: x, y: y };
	}
</script>

<div id="control">
	<span>Offset: {offset}</span>
	<input type="range" min="0" max="200" bind:value={offset} />

	<span>Square Count: {squareCount}</span>
	<input type="range" min="15" max="50" bind:value={squareCount} />
</div>

<div class="svg-container">
	<svg viewBox="0 0 1000 1000" class="svg-canvas">
		{#each Array.from({ length: squareCount }) as _, yi}
			{#each Array.from({ length: squareCount }) as _, xi}
				<g
					transform={`
    translate(${calculatePosition(xi, yi).x}, ${calculatePosition(xi, yi).y})
    ${xi % 2 === 1 ? `rotate(90 ${squareSize / 2} ${squareSize / 2})` : ''}
  `}
				>
					<polygon points="0,0 0,{squareSize} {squareSize},{squareSize}" fill="lightgrey" />
					<polygon points="0,0 {squareSize},0 {squareSize},{squareSize}" fill="tomato" />
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
