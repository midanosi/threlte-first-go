<script lang="ts">
    import type { RigidBody as RigidBodyType } from "@dimforge/rapier3d-compat"
	import { T } from "@threlte/core";
	import { AutoColliders, RigidBody } from "@threlte/rapier";
	import type { Mesh } from "three";
    import { gemCount } from './stores'

    // your script goes here
    export let gemMesh: Mesh
    export let gemRigidBody: RigidBodyType
    export let color: string

    export let gemCollected: boolean
    export let gemIsHomingIn: boolean
</script>


<RigidBody bind:rigidBody={gemRigidBody} type={'dynamic'}>
    <AutoColliders on:contact={(contactEvent) => {
        if (contactEvent.targetRigidBody !== null) {
            console.log('CONTACT with a rigidbody!', contactEvent)
            gemCollected = true
            gemIsHomingIn = false
            gemCount.update((n) => n + 1);

        }}}>
        <T.Mesh bind:ref={gemMesh} position={[0, 0, 1]}>
            <T.MeshStandardMaterial
                color={color}
            />
            <T.BoxGeometry args={[0.5, 0.25, 0.5]}/>
        </T.Mesh>
    </AutoColliders>
</RigidBody>