<script>
	const squareCount = 20;
	const squareSize = 1000 / squareCount;

    function calculatePosition(xi, yi) {
		const x = xi * squareSize;
		const y = yi * squareSize;
		return { x: 2 * x, y:  y };
    }
</script>

<div class="svg-container">
	<svg viewBox="0 0 1000 1000" class="svg-canvas">
        {#each Array.from({ length: squareCount }) as _, yi}
            {#each Array.from({ length: squareCount }) as _, xi}
             <g transform={`translate(${calculatePosition(xi, yi).x - (yi % 2 === 0 ? squareSize : 0)}, ${calculatePosition(xi, yi).y})`}>


        <rect width={squareSize} height={squareSize / 2} fill="tomato" />
        <rect
            transform={`translate(0, ${squareSize / 2})`}
            width={squareSize}
            height={squareSize / 2}
            fill="lightgrey"
        />
        <rect
            transform={`translate(${squareSize}, 0)`}
            width={squareSize / 2}
            height={squareSize}
            fill="tomato"
        />
        <rect
            transform={`translate(${squareSize + squareSize / 2}, 0)`}
            width={squareSize / 2}
            height={squareSize}
            fill="lightgrey"
        />
        </g>
            {/each}
        {/each}
	</svg>
</div>
