import { writable } from 'svelte/store';
import type { Collider as ColliderType } from '@dimforge/rapier3d-compat';
import { Vector3 } from 'three'

export const treasureCount = writable(0);
export const dragonCount = writable(0);

export const playerPositionInStore = writable<Vector3>()


const gemValues = [1,2,5,10,25] as const

export type Gem = {
    key: number
    value: typeof gemValues[number]
    collider: ColliderType | undefined,
    position: Vector3
    collected: boolean
}
const gemsInit = new Array(20).fill(1).map((_, index) => {
    const x = (Math.random() - 0.5) * 15
    const z = (Math.random() - 0.5) * 15
    const position = new Vector3(x,0,z)
    const value = gemValues[Math.floor(Math.random() * gemValues.length)]

    return {
        key: index,
        value,
        position,
        collider: undefined,
        collected: false
    }
})
export const gems = writable<Gem[]>(gemsInit)