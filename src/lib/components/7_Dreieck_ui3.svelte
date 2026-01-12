<script>
	//UI
	import chroma from 'chroma-js';
	import Slider from '$lib/ui/Slider.svelte';
	import RangeSlider from '$lib/ui/RangeSlider.svelte';
	import Toggle from '$lib/ui/Toggle.svelte';
	import ColorPickerHSV from '$lib/ui/ColorPicker/ColorPickerHSV.svelte';
	import EditableColorPalette from '$lib/ui/EditableColorPalette.svelte';

	let offset = $state(0);
	let squareCount = $state(10);
	let squareSize = $derived(1000 / squareCount);
	let xm = $state(50);
	let ym = $state(50);
	let dx = $state(50);
	let dy = $state(0);

	function getStep() {
		return squareSize + offset;
	}

	function calculatePosition(xi, yi) {
		const cx = squareCount;
		const cy = squareCount;
		const step = getStep();

		let x = (xi - cx) * step;
		let y = (yi - cy) * step;
		//console.log(xi, x);

		// odd rows shift right
		if (yi % 2 === 1) {
			x += step;
		}

		return { x, y };
	}

	const getRotation = (xi, yi) => {
		const posX = xi % 2; // tile in 2×2 cell column (0 or 1)
		const posY = yi % 2; // tile in 2×2 cell row (0 or 1)

		if (posY === 0 && posX === 0) return 0; // original
		if (posY === 0 && posX === 1) return 90; // top right + 90°
		if (posY === 1 && posX === 0) return 180; // bottom left + 180°
		if (posY === 1 && posX === 1) return 270; // bottom right + 270°
	};
</script>

<div class="sidebar">
	<h3 style="margin: 0 0 10px 0; font-size: 1rem; font-weight: 500;">Pattern Controls</h3>

	<Slider min={0} max={250} bind:value={offset} label="Square Offset" />
	<Slider min={3} max={50} bind:value={squareCount} label="Square Count" />

	<Slider min={dy} max={squareSize - dy} step={1} bind:value={xm} label="Center X" />
	<Slider min={-dy} max={squareSize + dy} step={1} bind:value={ym} label="Center Y" />

	<Slider min={0} max={squareSize} step={1} bind:value={dx} label="Distance X" />
	<Slider min={-squareSize} max={squareSize} step={1} bind:value={dy} label="Distance Y" />
</div>

<div class="svg-container">
	<svg viewBox="-500 -500 1000 1000" class="svg-canvas">
		{#each Array.from({ length: squareCount * 2 +1 }) as _, yi}
			{#each Array.from({ length: squareCount * 2 +1 }) as _, xi}
				<g
					transform={`
		translate(${calculatePosition(xi, yi).x}, ${calculatePosition(xi, yi).y} )
		rotate(${getRotation(xi, yi)}, ${squareSize / 2}, ${squareSize / 2})
	`}
				>
					<polygon points="0,0 {dy},{dx} {xm},{ym}" fill="#4281A4" />
					<polygon points="{dy},{dx}  {xm},{ym} 0,{squareSize}" fill="#4281A4" />
					<polygon
						points="{xm},{ym} 0,{squareSize} {squareSize - dx},{dy + squareSize}"
						fill="lightblue"
					/>
					<polygon
						points="{xm},{ym} {squareSize},{squareSize} {squareSize - dx},{dy + squareSize}"
						fill="#4281A4"
					/>
					<polygon
						points="{xm},{ym} {squareSize},{squareSize} {squareSize - dy},{squareSize - dx}"
						fill="#4281A4"
					/>
					<polygon
						points="{xm},{ym} {squareSize},0 {squareSize - dy},{squareSize - dx}"
						fill="#4281A4"
					/>
					<polygon points="{xm},{ym} {squareSize},0 {dx},{-dy}" fill="lightblue" />
					<polygon points="{xm},{ym} 0,0 {dx},{-dy}" fill="salmon" />
				</g>
			{/each}
		{/each}
	</svg>
</div>

<style>
	div.sidebar {
		display: flex;
		flex-direction: column;
		list-style: none;
		padding: 20px;
		margin: 0 0 1rem 0;
		gap: 20px;
		justify-content: flex-start;
		overflow-y: auto;
		min-width: 350px;
	}
</style>
