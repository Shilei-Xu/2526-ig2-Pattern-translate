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

	/* function calculatePosition(xi, yi) {
		const step = squareSize + offset;

		const x = (xi - 1) * step - (yi % 2 === 1 ? step : 0);

		const y = (yi - 1) * step;

		return { x, y };
	}
 */
	//const getRotation = (xi, yi) => ((xi + yi) % 4) * 90; 

	const getRotation = (xi, yi) => {
	const baseRotation = ((xi + yi) % 4) * 90;

	const isOddRowEvenCol = yi % 2 === 0 && xi % 2 === 1;

	return isOddRowEvenCol
		? baseRotation + 180
		: baseRotation;
};



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
		min={-squareSize}
		max={squareSize}
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
		translate(${calculatePosition(xi, yi).x}, ${calculatePosition(xi, yi).y} )
		rotate(${getRotation(xi, yi)}, ${squareSize / 2}, ${squareSize / 2})
	`}
				>
					<polygon points="0,0 {dy},{dx} {xm},{ym}" fill="#4281A4" />
					<polygon points="{dy},{dx}  {xm},{ym} 0,{squareSize}" fill="lightblue" />
					<polygon
						points="{xm},{ym} 0,{squareSize} {squareSize - dx},{dy + squareSize}"
						fill="tomato"
					/>
					<polygon
						points="{xm},{ym} {squareSize},{squareSize} {squareSize - dx},{dy + squareSize}"
						fill="lightgray"
					/>
					<polygon
						points="{xm},{ym} {squareSize},{squareSize} {squareSize - dy},{squareSize - dx}"
						fill="lightgray"
					/>
					<polygon
						points="{xm},{ym} {squareSize},0 {squareSize - dy},{squareSize - dx}"
						fill="lightgray"
					/>
					<polygon points="{xm},{ym} {squareSize},0 {dx},{-dy}" fill="lightgray" />
					<polygon points="{xm},{ym} 0,0 {dx},{-dy}" fill="tomato" />
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
