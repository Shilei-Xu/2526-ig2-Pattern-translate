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


	let combinedOffset = $derived(offset + squareSize);

	let xm_ratio = $state(0.5); // 0~1
	let ym_ratio = $state(0.5); // 0~1
	let dx_ratio = $state(0.5); // 0~1
	let dy_ratio = $state(0); // -1~1

	let tileCount = 50;

	let xm = $derived(xm_ratio * squareSize);
	let ym = $derived(ym_ratio * squareSize);
	let dx = $derived(dx_ratio * squareSize);
	let dy = $derived(dy_ratio * squareSize);

	function getStep() {
		return squareSize + offset;
	}

	function calculatePosition(index, squareCount) {
		const basePosition = (index - squareCount / 2) * squareSize;
		const offsetPosition = (index - squareCount / 2 + 0.5) * offset;
		return basePosition + offsetPosition;
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



<div class="svg-container">
	<svg viewBox="-500 -500 1000 1000" class="svg-canvas">
		{#each Array.from({ length: tileCount }) as _, yi}
			{#each Array.from({ length: tileCount }) as _, xi}
				<g
					transform={`
		translate(${calculatePosition(xi, tileCount)}, ${calculatePosition(yi, tileCount)})
		rotate(${getRotation(xi, yi)}, ${squareSize / 2}, ${squareSize / 2})
	`}
				>
					<polygon points="0,0 {dy},{dx} {xm},{ym}" fill="lightblue" />
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
						fill="lightblue"
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


<div class="sidebar-right">
	
	<Slider min={0} max={250} bind:value={offset} label="Square Offset" />
	<Slider min={3} max={50} bind:value={squareCount} label="Square Count" />

	<!-- <Slider min={dy} max={squareSize - dy} step={1} bind:value={xm} label="Center X" />
	<Slider min={-dy} max={squareSize + dy} step={1} bind:value={ym} label="Center Y" />

	<Slider min={0} max={squareSize} step={1} bind:value={dx} label="Distance X" />
	<Slider min={-squareSize} max={squareSize} step={1} bind:value={dy} label="Distance Y" /> -->

	<Slider min={0} max={1} step={0.01} bind:value={xm_ratio} label="Center X" />
	<Slider min={0} max={1} step={0.01} bind:value={ym_ratio} label="Center Y" />
	<Slider min={0} max={1} step={0.01} bind:value={dx_ratio} label="Distance X" />
	<Slider min={-0.5} max={0.5} step={0.01} bind:value={dy_ratio} label="Distance Y" />
</div>