<script lang="ts">
	// import type { RigidBody as RigidBodyType } from '@dimforge/rapier3d-compat';
	import { T, useFrame, useThrelte } from '@threlte/core';
	import { Vector3, type Mesh } from 'three';
	import Ground from './Ground.svelte';
	import Gems from './Gems.svelte';
	import { playerPositionInStore } from './stores'

	import PlayerController from './PlayerController.svelte';
	import { spring } from 'svelte/motion';
	import { Debug } from '@threlte/rapier';

	let playerMesh: Mesh;
	let positionHasBeenSet = false;

	const playerPosition = new Vector3();

	const smoothPlayerPosX = spring(0);
	const smoothPlayerPosZ = spring(0);

	useFrame(() => {
		if (!playerMesh) return;
		playerMesh.getWorldPosition(playerPosition);
		smoothPlayerPosX.set(playerPosition.x, {
			hard: !positionHasBeenSet
		});
		smoothPlayerPosZ.set(playerPosition.z, {
			hard: !positionHasBeenSet
		});
		playerPositionInStore.set(playerPosition)
		if (!positionHasBeenSet) positionHasBeenSet = true;
	});

	const { size } = useThrelte();
	$: zoom = $size.width / 16;
</script>

<PlayerController bind:playerMesh position={[0, 2, -3]} />

<!-- GEMS -->
<Gems />

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

<!-- <Debug depthTest={false} depthWrite={false} /> -->
