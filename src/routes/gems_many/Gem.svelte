<script lang="ts">
    import type { RigidBody as RigidBodyType } from "@dimforge/rapier3d-compat"
	import { T, useFrame } from "@threlte/core";
	import { AutoColliders, RigidBody } from "@threlte/rapier";
	import { Vector3 } from "three";
    import type { Mesh } from 'three'
    import { treasureCount, playerPositionInStore, gems } from './stores'
    import type { Gem } from './stores'

    export let gem: Gem

	let gemUpStrength = 0.2;

    let gemCollected= false
    let gemIsHomingIn = false

    let gemMesh: Mesh
    let gemRigidBody: RigidBodyType

    const valueToColor = {
        1: 'firebrick',
        2: 'forestgreen',
        5: 'midnightblue',
        10: 'gold',
        25: 'darkmagenta'
    }

    function homeGemToPlayer() {
		if (!gemRigidBody) return;

		const towardsPlayerVector = new Vector3();
		towardsPlayerVector
			.subVectors(
				$playerPositionInStore,
				gemMesh.getWorldPosition(new Vector3())
			)
			.normalize()
			.divideScalar(200);

		gemRigidBody.applyImpulse(towardsPlayerVector, true);
	}

	useFrame(() => {
		if (gemIsHomingIn) {
			homeGemToPlayer();
		}
		const gemInRange = $playerPositionInStore.distanceTo(gem.position) < 4;

		if (gemInRange && !gemIsHomingIn && !gemCollected) {
			gemIsHomingIn = true;
			if (!gemRigidBody || !gemUpStrength) return;
			gemRigidBody.applyImpulse(
				{ x: 0, y: gemUpStrength, z: 0 },
				true
			);
			gemRigidBody.setGravityScale(0.4, true);
		}
	});
</script>


<RigidBody bind:rigidBody={gemRigidBody} type={'dynamic'}>
    <AutoColliders on:contact={(contactEvent) => {
        if (contactEvent.targetRigidBody !== null) {
            console.log('CONTACT with a rigidbody!', contactEvent)
            // gemCollected = true
            gemIsHomingIn = false
            treasureCount.update((n) => n + gem.value);
            gems.update((oldGems) => {
                oldGems[gem.key].collected = true
                return oldGems
            })
        }
        }}>
        <T.Mesh bind:ref={gemMesh} position={gem.position.toArray()}>
            <T.MeshStandardMaterial
                color={valueToColor[gem.value]}
            />
            <T.BoxGeometry args={[0.5, 0.25, 0.5]}/>
        </T.Mesh>
    </AutoColliders>
</RigidBody>