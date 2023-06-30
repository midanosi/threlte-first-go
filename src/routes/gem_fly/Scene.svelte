<script lang="ts">
	import type { RigidBody as RigidBodyType } from '@dimforge/rapier3d-compat';
	import { T, useFrame, useThrelte } from '@threlte/core';
	import { Vector3, type Mesh } from 'three';
	import Ground from './Ground.svelte';
	import Gem from './Gem.svelte';

	import PlayerController from './PlayerController.svelte';
	import { spring } from 'svelte/motion';
	import { Debug } from '@threlte/rapier';

	let playerMesh: Mesh;
	let gemMesh: Mesh;
	let positionHasBeenSet = false;
	let gemRigidBody: RigidBodyType;

	const playerPosition = new Vector3();
	const gemPosition = new Vector3();

	const smoothPlayerPosX = spring(0);
	const smoothPlayerPosZ = spring(0);
	let gemCollected = false;

	useFrame(() => {
		if (!playerMesh) return;
		playerMesh.getWorldPosition(playerPosition);
		gemMesh.getWorldPosition(gemPosition);
		smoothPlayerPosX.set(playerPosition.x, {
			hard: !positionHasBeenSet
		});
		smoothPlayerPosZ.set(playerPosition.z, {
			hard: !positionHasBeenSet
		});
		if (!positionHasBeenSet) positionHasBeenSet = true;

		const gemInRange = playerPosition.distanceTo(gemPosition) < 4;
		gemColor = gemInRange ? 'hotpink' : 'red';

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

	const { size } = useThrelte();
	$: zoom = $size.width / 16;

	$: gemColor = 'red';

	let gemUpStrength = 0.2;
	let gemIsHomingIn = false;

	function homeGemToPlayer() {
		if (!gemRigidBody) return;

		const towardsPlayerVector = new Vector3();
		towardsPlayerVector
			.subVectors(
				playerMesh.getWorldPosition(new Vector3()),
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
	});

	const onKeyDown = (e: KeyboardEvent) => {
		switch (e.key) {
			case 'p':
				if (gemIsHomingIn === false) {
					gemIsHomingIn = true;
				}
				if (!gemRigidBody || !gemUpStrength) break;
				gemRigidBody.applyImpulse(
					{ x: 0, y: gemUpStrength, z: 0 },
					true
				);
				gemRigidBody.setGravityScale(0.4, true);
				break;
			case 'u':
				if (!gemRigidBody || !gemUpStrength) break;
				gemRigidBody.applyImpulse(
					{ x: 0, y: gemUpStrength, z: 0 },
					true
				);
				break;
			default:
				break;
		}
	};
</script>

<svelte:window on:keydown|preventDefault={onKeyDown} />

<PlayerController bind:playerMesh position={[0, 2, -3]} />

<!-- GEM -->
{#if !gemCollected}
	<Gem
		bind:gemMesh
		bind:gemRigidBody
		color={gemColor}
		bind:gemIsHomingIn
		bind:gemCollected
	/>
{/if}

<Ground />

<T.Group
	position.x={$smoothPlayerPosX}
	position.z={$smoothPlayerPosZ}
>
	<T.Group position.y={0.9} let:ref={target}>
		<T.OrthographicCamera
			makeDefault
			{zoom}
			position={[50, 50, 30]}
			on:create={({ ref }) => {
				ref.lookAt(target.getWorldPosition(new Vector3()));
			}}
		/>
	</T.Group>
</T.Group>

<T.DirectionalLight castShadow position={[8, 20, -3]} />

<T.GridHelper
	args={[50, 10, 'silver']}
	position.y={0.01}
	colorCenterLine="red"
/>

<Debug depthTest={false} depthWrite={false} />
