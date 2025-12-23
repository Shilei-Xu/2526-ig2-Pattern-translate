<script>
	import chroma from 'chroma-js';

	let offset = $state(0);
	let squareCountX = $state(5);
	let squareSize = $derived(1000 / squareCountX);
	let x = $derived(squareSize / 2);
	let deg = $derived(30);
	let rad = $derived((Math.PI * deg) / 180);
	let y = $derived(Math.tan(rad) * x);
	let z = $derived(Math.sqrt(x * x + y * y));
	let YSize = $derived(y + z);
	let squareCountY = $derived(Math.ceil(1000 / YSize));

	let hue = $state(120);
	let color1 = $derived(chroma.oklch(0.5, 0.2, hue));
	let color2 = $derived(chroma.oklch(0.6, 0.2, hue + 40));
    let color3 = $derived(chroma.oklch(0.7, 0.2, hue));
	let color4 = $derived(chroma.oklch(0.7, 0.2, hue + 40));


	function calculatePosition(xi, yi) {
		const x = xi * (squareSize + offset);
		const y = yi * (YSize + offset);

		return { x: x, y: y };
	}

	function getColor(xi, yi) {
		if ((xi + yi) % 4 === 0) {
			return color1.hex();
		} else if ((xi + yi) % 4 === 1) {
			return color2.hex();
		} else if ((xi + yi) % 4 === 2) {
			return color3.hex();
		} else {
			return color4.hex();
		}
	}	

</script>

<div id="control">
	<span>Offset: {offset}</span>
	<input type="range" min="0" max="200" bind:value={offset} />

	<span>Square Count: {squareCountX}</span>
	<input type="range" min="5" max="50" bind:value={squareCountX} />

	<span>Hue: {hue}</span>
	<input type="range" min="0" max="360" bind:value={hue} />
</div>

<div class="svg-container">
	<svg viewBox="0 0 1000 1000" class="svg-canvas">
		{#each Array.from({ length: squareCountY + 1 }) as _, yi}
			{#each Array.from({ length: squareCountX + 1 }) as _, xi}
				<g
					transform={`
    				translate(${calculatePosition(xi, yi).x}, ${calculatePosition(xi, yi).y})
					${yi % 2 === 1 ? `translate( ${-squareSize / 2},0)` : ''}`}
				>
					<polygon points="0,0 {x}, {y} {x * 2},0 {x},{-y}" fill="{getColor(xi, yi)}" />
					<polygon
						transform="rotate(120 {x} {y} ) "
						points="0,0 {x}, {y} {x * 2},0 {x},{-y}"
						fill="lightblue"
					/>
					<polygon
						transform="rotate(240 {x} {y})"
						points="0,0 {x}, {y} {x * 2},0 {x},{-y}"
						fill="khaki"
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
		background: yellow; /* ← 按钮颜色 */
		border-radius: 50%;
		cursor: pointer;
	}
</style>
