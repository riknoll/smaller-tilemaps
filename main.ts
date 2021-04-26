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

    let transparencies: Image[] = [];
    let others: Image[] = [];

    //% block="create tilemap $tileSize width $width height $height"
    export function createTilemap(tileSize: TileSize, width: number, height: number) {
        if (!transparencies[tileSize]) {
            transparencies[tileSize] = image.create(1 << tileSize, 1 << tileSize)
            others[tileSize] = image.create(1 << tileSize, 1 << tileSize);
            others[tileSize].fill(15);
        }

        const buf = control.createBuffer(width * height + 2);
        buf.fill(1);
        buf.setNumber(NumberFormat.UInt32LE, 0, width);
        buf.setNumber(NumberFormat.UInt32LE, 2, height);
        const t = tiles.createTilemap(buf, image.create(width, height), [
            transparencies[tileSize], others[tileSize]
        ], tileSize as number)
        
        tiles.setTilemap(t);
    }


    /**
     * Run code when a certain kind of sprite overlaps a tile
     * @param kind
     * @param tile
     * @param handler
     */
    //% weight=100 draggableParameters="reporter" blockGap=8
    //% block="on $sprite of kind $kind=spritekind overlaps $tileSize transparency at $location"
    export function onOverlapTile(kind: number, tileSize: TileSize, handler: (sprite: Sprite, location: tiles.Location) => void) {
        if (!transparencies[tileSize]) {
            transparencies[tileSize] = image.create(1 << tileSize, 1 << tileSize)
            others[tileSize] = image.create(1 << tileSize, 1 << tileSize);
            others[tileSize].fill(15);
        }
        
        scene.onOverlapTile(kind, others[tileSize], handler);
    }
}