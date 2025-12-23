<script>
	let offset = $state(0);
	let squareCount = $state(10);
	let squareSize = $derived(1000 / squareCount);
	let xm = $state(50);
	let ym = $state(50);
	let dx = $state(50);
	let dy = $state(0);

	function calculatePosition(xi, yi) {
		const x = (xi - 1) * (squareSize + offset);
		const y = (yi - 1) * (squareSize + offset);
		return { x: x, y: y };
	}

	const baseColors = [
		'#4281A4', // 0
		'lightblue', // 1
		'tomato', // 2	
		'lightyellow', // 3
		'tomato', // 4
		'salmon', // 5
		'tomato', // 6
		'lightyellow', // 7
		
	];

	const colorOrders = [
		[0, 1, 2, 3, 4, 5, 6, 7], // 1.
		[0, 1, 2, 3, 4, 5, 6, 7], // 2.
		[4, 5, 6, 7, 0, 1, 2, 3], // 3.
		[0, 1, 2, 3, 4, 5, 6, 7] // 4.
	];

	function getFacetColor(xi, yi, faceIndex) {
		const orderIndex = (xi + yi) % 4; 
		const order = colorOrders[orderIndex]; 
		return baseColors[order[faceIndex]]; 
	}
</script>

<div id="control">
	<span>Offset: {offset}</span>
	<input type="range" min="0" max="200" bind:value={offset} />

	<span>Square Count: {squareCount}</span>
	<input type="range" min="3" max="70" bind:value={squareCount} />

	<span>Center X: {xm}</span>
	<input
		type="range"
		min={dy}
		max={squareSize - dy}
		bind:value={xm}
		on:input={() => (xm = parseInt(xm))}
	/>

	<span>Center Y: {ym}</span>
	<input
		type="range"
		min={-dy}
		max={squareSize + dy}
		bind:value={ym}
		on:input={() => (ym = parseInt(ym))}
	/>

	<span>Distance X: {dx}</span>
	<input
		type="range"
		min={0}
		max={squareSize}
		bind:value={dx}
		on:input={() => (dx = parseInt(dx))}
	/>

	<span>Distance Y: {dy}</span>
	<input
		type="range"
		min={-squareSize / 2}
		max={squareSize / 2}
		bind:value={dy}
		on:input={() => (dy = parseInt(dy))}
	/>
</div>

<div class="svg-container">
	<svg viewBox="0 0 1000 1000" class="svg-canvas">
		{#each Array.from({ length: squareCount + 3 }) as _, yi}
			{#each Array.from({ length: squareCount + 3 }) as _, xi}
				<g
					transform={`
		translate(${calculatePosition(xi, yi).x}, ${calculatePosition(xi, yi).y})
		${yi % 2 === 1 ? ` translate(-${squareSize},0)` : ''}
		 ${xi % 2 === 1 ? ` translate(${squareSize},0) rotate(90)` : ''}
		`}
				>
					<polygon points="0,0 {dy},{dx} {xm},{ym}" fill="{getFacetColor(xi, yi, 0)}" />
					<polygon points="{dy},{dx}  {xm},{ym} 0,{squareSize}" fill="{getFacetColor(xi, yi, 1)}" />
					<polygon
						points="{xm},{ym} 0,{squareSize} {squareSize - dx},{dy + squareSize}"
						fill="{getFacetColor(xi, yi, 2)}"
					/>
					<polygon
						points="{xm},{ym} {squareSize},{squareSize} {squareSize - dx},{dy + squareSize}"
						fill="{getFacetColor(xi, yi, 3)}"
					/>
					<polygon
						points="{xm},{ym} {squareSize},{squareSize} {squareSize - dy},{squareSize - dx}"
						fill="{getFacetColor(xi, yi, 4)}"
					/>
					<polygon
						points="{xm},{ym} {squareSize},0 {squareSize - dy},{squareSize - dx}"
						fill="{getFacetColor(xi, yi, 5)}"
					/>
					<polygon points="{xm},{ym} {squareSize},0 {dx},{-dy}" fill="{getFacetColor(xi, yi, 6)}" />
					<polygon points="{xm},{ym} 0,0 {dx},{-dy}" fill="{getFacetColor(xi, yi, 7)}" />
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
		background: #ccc;
		border-radius: 4px;
	}

	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: 20px;
		height: 20px;
		background: lightblue;
		border-radius: 50%;
		cursor: pointer;
	}
</style>
