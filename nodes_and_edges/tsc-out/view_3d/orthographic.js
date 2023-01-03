// FOR 3D orthographic projection
export function setOrthographicProjection(p) {
    const width = p.width;
    const height = p.height;
    p.ortho(-width / 2, width / 2, height / 2, -height / 2, 0, 500);
}
