/* export const appState = $state({
    xm_ratio: 0.5,
    ym_ratio: 0.5,
}); */

function createAppState() {
    let dx_ratio = $state(0.5);
    let dy_ratio = $state(0);
    let xm_ratio = $state(0.5);
    let ym_ratio = $state(0.5);
    let hue = $state(0);

    return {
        dx_ratio,
        dy_ratio,
        xm_ratio,
        ym_ratio,
        hue
    };
}

export const appState = createAppState();
