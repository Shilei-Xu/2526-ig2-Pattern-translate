<script>
	import chroma from 'chroma-js';
	import Slider from '$lib/ui/Slider.svelte';
	import RangeSlider from '$lib/ui/RangeSlider.svelte';
	import Toggle from '$lib/ui/Toggle.svelte';
	import ColorPickerHSV from '$lib/ui/ColorPicker/ColorPickerHSV.svelte';
	import EditableColorPalette from '$lib/ui/EditableColorPalette.svelte';

	let offset = $state(0);
	let squareCount = $state(12);
	let squareSize = $derived(1000 / squareCount);
	let halfSize = $derived(squareSize / 2);
	let Distance_X = $state(0);
	let Distance_Y = $state(0);
	let hue = $state(0);

	
	function shiftHue(h, s, l) {
		return `hsl(${(h + hue) % 360}, ${s}%, ${l}%)`;
	}

	function calculatePosition(xi, yi) {
		const x = xi * (squareSize + offset);
		const y = yi * (squareSize + offset);

		return { x: x, y: y };
	}
</script>

<div class="svg-container">
	<svg viewBox="0 0 1000 1000" class="svg-canvas">
		{#each Array.from({ length: squareCount }) as _, yi}
			{#each Array.from({ length: squareCount }) as _, xi}
				<g transform="translate({calculatePosition(xi, yi).x}, {calculatePosition(xi, yi).y})">
			
					<polygon
						points="0,0 0,{squareSize} {halfSize - Distance_X},{halfSize - Distance_Y}"
						fill={shiftHue(202, 50, 35)}
					/>
					<polygon
						points="{squareSize},0 {squareSize},{squareSize} {halfSize - Distance_X},{halfSize -
							Distance_Y}"
						fill={shiftHue(60, 100, 94)}
					/>
					<polygon
						points="0,0 {squareSize},0 {halfSize - Distance_X},{halfSize - Distance_Y}"
						fill="tomato"
					/>
					<polygon
						points="0,{squareSize} {squareSize},{squareSize} {halfSize - Distance_X},{halfSize -
							Distance_Y}"
						fill="tomato"
					/>
				</g>
			{/each}
		{/each}
	</svg>
</div>

<div class="sidebar-right">
	<h3 style="margin: 0 0 10px 0; font-size: 1rem; font-weight: 500;">Pattern Controls</h3>


	<Slider min={0} max={200} bind:value={offset} label="Offset" />

	<Slider min={5} max={50} bind:value={squareCount} label="Square Count" />

	<Slider
		min={-halfSize}
		max={halfSize}
		bind:value={Distance_X}
		label="Center X"
	/>

	<Slider
		min={-halfSize}
		max={halfSize}
		bind:value={Distance_Y}
		label="Center Y"
	/>

	<Slider
		min={0}
		max={360}
		step={1}
		bind:value={hue}
		label="Hue"
	/>
</div>
