<script lang="ts">
	import { T } from "@threlte/core";
	import { BasicPlayerController } from "@threlte/rapier";
	import { CapsuleGeometry, Mesh, MeshStandardMaterial, Vector3 } from "three";

    export let position: Parameters<Vector3['set']> | undefined =
		undefined;

	export let playerMesh: Mesh;

	let isRunning = false

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.shiftKey) {
			if (!isRunning) {
				isRunning = true
			}
		}
		// switch (e.key) {
		// 	case 'shift':
		// 		break
		// 	default:
		// 		break;
		// }
	};

	const onKeyUp = (e: KeyboardEvent) => {
		if (!e.shiftKey) {
			if (isRunning === true) {
				isRunning = false
			}
		}
		// switch (e.key) {
		// 	case 'shift':
		// 		break
		// 	default:
		// 		break;
		// }
	};

	$: speed = isRunning ? 5 : 3
</script>

<svelte:window on:keydown={onKeyDown} on:keyup={onKeyUp}/>

<BasicPlayerController
	{position}
	speed={speed}
	radius={0.3}
	height={1.8}
	jumpStrength={2}
	groundCollisionGroups={[15]}
	playerCollisionGroups={[0]}
>
	<T.Mesh
		bind:ref={playerMesh}
		position.y={0.9}
		receiveShadow
		castShadow
		geometry={new CapsuleGeometry(0.3, 1.8 - 0.3 * 2)}
		material={new MeshStandardMaterial({color: 'rebeccapurple'})}
	/>
</BasicPlayerController>