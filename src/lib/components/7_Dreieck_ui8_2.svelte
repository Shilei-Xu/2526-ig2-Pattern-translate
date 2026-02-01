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

	let xm_ratio = $state(0.5); // 0~1
	let ym_ratio = $state(0.5); // 0~1
	let dx_ratio = $state(0.5); // 0~1
	let dy_ratio = $state(0); // -1~1

	let tileCount = 50;

	let xm =$derived(xm_ratio * squareSize);
	let ym = $derived(ym_ratio * squareSize);
	let dx = $derived(dx_ratio * squareSize);
	let dy = $derived(dy_ratio * squareSize);

	let hueMin = $state(206); // 最浅颜色的Hue
	let hueMax = $state(222); // 最深颜色的Hue

	// 初始颜色的HSL值
	const initialColors = [
		{ h: 222, s: 33, l: 27 }, // '#2C2F4A'
		{ h: 222, s: 46, l: 33 }, // '#2C3E91'
		{ h: 217, s: 50, l: 39 }, // '#3E5C9A'
		{ h: 212, s: 48, l: 42 }, // '#4A6FA5'
		{ h: 211, s: 42, l: 54 }, // '#6C8DC7'
		{ h: 209, s: 39, l: 62 }, // '#88A4D0'
		{ h: 204, s: 47, l: 71 }, // '#A7C6DA'
		{ h: 206, s: 53, l: 85 }  // '#DCE3F2'
	];

	function getStep() {
		return squareSize + offset;
	}

	function calculatePosition(xi, yi) {
		const step = getStep();
		const cx = (tileCount - 1) / 2;
		const cy = (tileCount - 1) / 2;

		let x = (xi - cx) * step;
		let y = (yi - cy) * step;

		if (yi % 2 === 1) {
			x += step;
		}
		x -= step / 2;

		return { x, y };
	}

	const getRotation = (xi, yi) => {
		const posX = xi % 2;
		const posY = yi % 2;

		if (posY === 0 && posX === 0) return 0;
		if (posY === 0 && posX === 1) return 90;
		if (posY === 1 && posX === 0) return 180;
		if (posY === 1 && posX === 1) return 270;
	};

	const baseColors = $derived.by(() => {
		return initialColors.map((color, index) => {
			// 根据颜色的亮度位置在hueMin和hueMax之间插值（浅→深）
			const t = index / (initialColors.length - 1);
			const newHue = hueMin + t * (hueMax - hueMin);
			return chroma(`hsl(${newHue}, ${color.s}%, ${color.l}%)`).hex();
		});
	});

	function getColor(xi, yi, k) {

		const index = (xi + yi * 4 + k) % baseColors.length;
		return baseColors[index];
	}

	function getPoints(type) {
		const sq = squareSize;
		const points = {
			0: `0,0 ${dy},${dx} ${xm},${ym}`,
			1: `${dy},${dx} ${xm},${ym} 0,${sq}`,
			2: `${xm},${ym} 0,${sq} ${sq - dx},${dy + sq}`,
			3: `${xm},${ym} ${sq},${sq} ${sq - dx},${dy + sq}`,
			4: `${xm},${ym} ${sq},${sq} ${sq - dy},${sq - dx}`,
			5: `${xm},${ym} ${sq},0 ${sq - dy},${sq - dx}`,
			6: `${xm},${ym} ${sq},0 ${dx},${-dy}`,
			7: `${xm},${ym} 0,0 ${dx},${-dy}`
		};
		return points[type];
	}

</script>

<div class="svg-container">
	<svg viewBox="-500 -500 1000 1000" class="svg-canvas">
		{#each Array.from({ length: tileCount }) as _, yi}
			{#each Array.from({ length: tileCount }) as _, xi}
				<g
					transform={`
		translate(${calculatePosition(xi, yi).x}, ${calculatePosition(xi, yi).y} )
		rotate(${getRotation(xi, yi)}, ${squareSize / 2}, ${squareSize / 2})
	`}
				>
					<polygon points={getPoints(0)} fill={getColor(xi, yi, 0)} />
					<polygon points={getPoints(1)} fill={getColor(xi, yi, 1)} />
					<polygon points={getPoints(2)} fill={getColor(xi, yi, 2)} />
					<polygon points={getPoints(3)} fill={getColor(xi, yi, 3)} />
					<polygon points={getPoints(4)} fill={getColor(xi, yi, 4)} />
					<polygon points={getPoints(5)} fill={getColor(xi, yi, 5)} />
					<polygon points={getPoints(6)} fill={getColor(xi, yi, 6)} />
					<polygon points={getPoints(7)} fill={getColor(xi, yi, 7)} />
				</g>
			{/each}
		{/each}
	</svg>
</div>


<div class="sidebar-right">
	<h3 style="margin: 0 0 10px 0; font-size: 1rem; font-weight: 500;">Pattern Controls</h3>

	<Slider min={0} max={250} bind:value={offset} label="Square Offset" />
	<Slider min={3} max={50} bind:value={squareCount} label="Square Count" />

	<Slider min={0} max={1} step={0.01} bind:value={xm_ratio} label="Center X" />
	<Slider min={0} max={1} step={0.01} bind:value={ym_ratio} label="Center Y" />
	<Slider min={0} max={1} step={0.01} bind:value={dx_ratio} label="Distance X" />
	<Slider min={-0.5} max={0.5} step={0.01} bind:value={dy_ratio} label="Distance Y" />

	<RangeSlider
		min={0}
		max={360}
		step={1}
		bind:value1={hueMin}
		bind:value2={hueMax}
		label="Hue Range (Light → Deep)"
	/>
</div>
