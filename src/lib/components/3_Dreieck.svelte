<script>
	let offset = $state(0);
	let squareCount = $state(20);
	let squareSize = $derived(1000 / squareCount);
	let halfSize = $derived(squareSize / 2);
	let Distance_X = $state(0);
	let Distance_Y = $state(0);
	let hue = $state(0);

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
	<input type="range" min="5" max="50" bind:value={squareCount} />

	<span>Center X: {Distance_X}</span>
	<input
		type="range"
		min={-halfSize}
		max={halfSize}
		bind:value={Distance_X}
		on:input={() => (Distance_X = parseInt(Distance_X))}
	/>

	<span>Center Y: {Distance_Y}</span>
	<input
		type="range"
		min={-halfSize}
		max={halfSize}
		bind:value={Distance_Y}
		on:input={() => (Distance_Y = parseInt(Distance_Y))}
	/>

	<span>hue: {hue}</span>
	<input
		type="range"
		min="0"
		max="360"
		step="1"
		bind:value={hue}
		on:input={() => (hue = parseInt(hue))}
	/>
</div>

<div class="svg-container">
	<svg viewBox="0 0 1000 1000" class="svg-canvas">
		{#each Array.from({ length: squareCount }) as _, yi}
			{#each Array.from({ length: squareCount }) as _, xi}
				<g transform="translate({calculatePosition(xi, yi).x}, {calculatePosition(xi, yi).y})">
					<!-- <g transform="translate({squareSize},0) rotate(90)">
						<rect width={squareSize} height={squareSize / 2} fill="tomato" />
						<rect
							transform="translate(0, {squareSize / 2})"
							width={squareSize}
							height={squareSize / 2}
							fill="lightgrey"
						/>
					</g> -->
					<polygon
						points="0,0 0,{squareSize} {halfSize - Distance_X},{halfSize - Distance_Y}"
						fill={`hsl(${hue}, 50%, 50%)`}
					/>
					<polygon
						points="{squareSize},0 {squareSize},{squareSize} {halfSize - Distance_X},{halfSize -
							Distance_Y}"
						fill={`hsl(${hue}, 50%, 80%)`}
					/>
					<polygon
						points="0,0 {squareSize},0 {halfSize - Distance_X},{halfSize - Distance_Y}"
						fill={`hsl(${hue}, 30%, 80%)`}
					/>
					<polygon
						points="0,{squareSize} {squareSize},{squareSize} {halfSize - Distance_X},{halfSize -
							Distance_Y}"
						fill={`hsl(${hue}, 30%, 50%)`}
					/>
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
