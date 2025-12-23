<script>
	const xCount = 20;
	const xSize = 1000 / xCount;
	const yCount = 30;
	const ySize = 1000 / yCount;
	const x1 = 20;
	const x2 = 15;
	const xm1 = 5;
	const xm2 = 25;
	const ym1 = 15;
	const d = 10;

	function calculatePosition(xi, yi) {
		const x = xi * xSize;
		const y = yi * ySize;
		return { x: x, y: y };
	}
</script>


<div class="svg-container">
	<svg viewBox="0 0 1000 1000" class="svg-canvas">
		{#each Array.from({ length: yCount }) as _, yi}
			{#each Array.from({ length: xCount }) as _, xi}
				<g
					transform="translate({calculatePosition(xi, yi).x}, {calculatePosition(xi, yi).y})
        {yi % 2 === 1 ? `translate(0, ${ySize}) scale(1, -1)` : ''}  ">
				
					<polygon points="0,0 {x1},0 {xm1},{ym1}" fill="lightgrey" />

					<polygon points="{x1},0 {xSize},0 {xm2},{ym1}" fill="lightgrey" />

					<polygon points="{-d},{ySize} {x2},{ySize} {xm1},{ym1}" fill="tomato" />

					<polygon points="{x2},{ySize} {xSize - d},{ySize} {xm2},{ym1}" fill="tomato" />
					
					{#if xi === xCount - 1}
						<polygon
							points="{-d + xSize},{ySize} {x2 + xSize},{ySize} {xm1 + xSize},{ym1}"
							fill="tomato"
						/>
					{/if}
				</g>
			{/each}
		{/each}
	</svg>
</div>
