export function getXTile(long: number) {
    const n = 2 ** 15;
    return Math.floor(n * ((long + 180) / 360));
}

export function getYTile(lat: number) {
    return Math.floor(
        ((1 -
            Math.log(Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)) /
                Math.PI) /
            2) *
            Math.pow(2, 15)
    );
}
