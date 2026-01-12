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

	/* function calculatePosition(xi, yi) {
		const x = (xi - 1) * (squareSize + offset);
		const y = (yi - 1) * (squareSize + offset);
		return { x: x, y: y };
	} */

	/* let step = $derived(squareSize + offset);

	function calculatePosition(xi, yi) {
	const cx = squareCount / 2;
	const cy = squareCount / 2;

	const x = (xi - cx -1) * step;
	const y = (yi - cy -1) * step;

	return { x, y };
} */

	function getStep() {
		return squareSize + offset;
	}

	function calculatePosition(xi, yi) {
		const cx = squareCount / 2;
		const cy = squareCount / 2;
		const step = getStep();

		let x = (xi - cx - 2) * step;
		let y = (yi - cy - 2) * step;

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

	const baseColors = ['#2C2F4A', '#4A6FA5', '#A7C6DA', '#EAEAEA'];

	function pseudoRandom(seed) {
		return (Math.sin(seed * 12.9898) * 43758.5453) % 1;
	}

	function jitter(hex, amount, seed) {
		const r = parseInt(hex.slice(1, 3), 16);
		const g = parseInt(hex.slice(3, 5), 16);
		const b = parseInt(hex.slice(5, 7), 16);

		const d = (pseudoRandom(seed) * 2 - 1) * amount;
		const clamp = (v) => Math.max(0, Math.min(255, v));

		return `rgb(${clamp(r + d)}, ${clamp(g + d)}, ${clamp(b + d)})`;
	}

	function getColor(xi, yi, k) {
		const base = baseColors[(xi * yi + k) % baseColors.length];
		const seed = xi * 100 + yi * 10 + k;
		return jitter(base, 6, seed);
	}
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
		{#each Array.from({ length: squareCount + 3 }) as _, yi}
			{#each Array.from({ length: squareCount + 3 }) as _, xi}
				<g
					transform={`
		translate(${calculatePosition(xi, yi).x}, ${calculatePosition(xi, yi).y} )
		rotate(${getRotation(xi, yi)}, ${squareSize / 2}, ${squareSize / 2})
	`}
				>
					<polygon points="0,0 {dy},{dx} {xm},{ym}" fill={getColor(xi, yi, 0)} />
					<polygon points="{dy},{dx}  {xm},{ym} 0,{squareSize}" fill={getColor(xi, yi, 0)} />
					<polygon
						points="{xm},{ym} 0,{squareSize} {squareSize - dx},{dy + squareSize}"
						fill={getColor(xi, yi, 0)}
					/>
					<polygon
						points="{xm},{ym} {squareSize},{squareSize} {squareSize - dx},{dy + squareSize}"
						fill={getColor(xi, yi, 0)}
					/>
					<polygon
						points="{xm},{ym} {squareSize},{squareSize} {squareSize - dy},{squareSize - dx}"
						fill={getColor(xi, yi, 1)}
					/>
					<polygon
						points="{xm},{ym} {squareSize},0 {squareSize - dy},{squareSize - dx}"
						fill={getColor(xi, yi, 1)}
					/>
					<polygon points="{xm},{ym} {squareSize},0 {dx},{-dy}" fill={getColor(xi, yi, 1)} />
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
