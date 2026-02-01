<script>
	import chroma from 'chroma-js';
	import Slider from '$lib/ui/Slider.svelte';
	import RangeSlider from '$lib/ui/RangeSlider.svelte';
	import Toggle from '$lib/ui/Toggle.svelte';
	import ColorPickerHSV from '$lib/ui/ColorPicker/ColorPickerHSV.svelte';
	import EditableColorPalette from '$lib/ui/EditableColorPalette.svelte';

	let offset = $state(0);
	let xCount = $state(12);
	let yCount = $state(24);
	let xSize = $derived(1000 / xCount);
	let ySize = $derived(1000 / yCount);
	let xm = $state(40);
	let ym = $state(12);

	let hue = $state(0);

	function shiftHue(h, s, l) {
		return `hsl(${(h + hue) % 360}, ${s}%, ${l}%)`;
	}

	function calculatePosition(xi, yi) {
		const x = xi * (xSize + offset);
		const y = yi * (ySize + offset);
		return { x: x, y: y };
	}
</script>



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
					<polygon points="0,0 0,{ySize} {xm},{ym}" fill="tomato" />
					<polygon points="{xSize},0 {xSize},{ySize} {xm},{ym}" fill={shiftHue(60, 100, 94)} />
					<polygon points="0,0 {xSize},0 {xm},{ym}" fill={shiftHue(202, 50, 35)} />
					<polygon points="0,{ySize} {xSize},{ySize} {xm},{ym}" fill="tomato" />
				</g>
			{/each}
		{/each}
	</svg>
</div>

<div class="sidebar-right">
	<h3 style="margin: 0 0 10px 0; font-size: 1rem; font-weight: 500;">Pattern Controls</h3>

	<Slider min={0} max={200} bind:value={offset} label="Offset" />

	<Slider min={5} max={50} bind:value={xCount} label="Count X" />

	<Slider min={10} max={70} bind:value={yCount} label="Count Y" />

	<Slider min={0} max={xSize} bind:value={xm} label="Center X" />

	<Slider min={0} max={ySize} bind:value={ym} label="Center Y" />

	<Slider
		min={0}
		max={360}
		step={1}
		bind:value={hue}
		label="Hue"
	/>
</div>
