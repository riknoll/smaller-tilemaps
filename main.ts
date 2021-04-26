 //% block="Smaller Tilemaps"
namespace micromaps {
    export enum TileSize {
        //% block="two"
        Two = 1,
        //% block="four"
        Four = 2,
        //% block="one (at your own risk)"
        One = 0
    }

    //% block="create tilemap $tileSize width $width height $height"
    export function createTilemap(tileSize: TileSize, width: number, height: number) {
        const buf = control.createBuffer(width * height);
        const t = tiles.createTilemap(buf, image.create(width, height), [
            image.create(1 << tileSize, 1 << tileSize)
        ], tileSize as number)
        tiles.setTilemap(t);
    }


    /**
     * Run code when a certain kind of sprite overlaps a tile
     * @param kind
     * @param tile
     * @param handler
     */
    //% group="Tiles"
    //% weight=100 draggableParameters="reporter" blockGap=8
    //% block="on $sprite of kind $kind=spritekind overlaps $tileSize transparency at $location"
    //% help=tiles/on-overlap-tile
    export function onOverlapTile(kind: number, tileSize: TileSize, handler: (sprite: Sprite, location: tiles.Location) => void) {
        scene.onOverlapTile(kind, image.create(1 << tileSize, 1 << tileSize), handler);
    }
}