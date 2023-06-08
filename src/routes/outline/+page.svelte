<script lang="ts">
	import { T, Canvas } from '@threlte/core';
	import {
		OrbitControls,
		Grid,
		ContactShadows,
		Float
	} from '@threlte/extras';
	import RendererWithOutlines from './RendererWithOutlines.svelte';

	let outlinedCube;
</script>

<svelte:head>
	<title>Outline Example</title>
</svelte:head>

<div class="canvas">
	<Canvas>
		<!-- cube (TODO change to walking human) -->
		<T.Mesh position.x={3} position.y={1} bind:ref={outlinedCube}>
			<T.MeshToonMaterial color="gold" />
			<T.BoxGeometry />
		</T.Mesh>

		<T.PerspectiveCamera
			makeDefault
			position={[-10, 10, 10]}
			fov={15}
		>
			<OrbitControls
				enableZoom={false}
				enableDamping
				target.y={1.5}
			/>
		</T.PerspectiveCamera>

		<T.DirectionalLight
			intensity={0.8}
			position.x={5}
			position.y={10}
		/>
		<T.AmbientLight intensity={0.2} />

		<Grid
			position.y={-0.001}
			cellColor="#ffffff"
			sectionColor="#ffffff"
			sectionThickness={0}
			fadeDistance={25}
			cellSize={2}
		/>

		<ContactShadows scale={10} blur={2} far={2.5} opacity={0.5} />

		<Float floatIntensity={1} floatingRange={[0, 1]}>
			<T.Mesh position.y={1.2} position.z={-0.75}>
				<T.BoxGeometry />
				<T.MeshToonMaterial color="#0059BA" />
			</T.Mesh>
		</Float>

		<Float floatIntensity={1} floatingRange={[0, 1]}>
			<T.Mesh
				position={[1.2, 1.5, 0.75]}
				rotation.x={5}
				rotation.y={71}
			>
				<T.TorusKnotGeometry args={[0.5, 0.15, 100, 12, 2, 3]} />
				<T.MeshToonMaterial color="#F85122" />
			</T.Mesh>
		</Float>

		<Float floatIntensity={1} floatingRange={[0, 1]}>
			<T.Mesh position={[-1.4, 1.5, 0.75]} rotation={[-5, 128, 10]}>
				<T.IcosahedronGeometry />
				<T.MeshToonMaterial color="#F8EBCE" />
			</T.Mesh>
		</Float>

		<!-- custom renderer, has to sit inside Canvas -->
		<RendererWithOutlines selectedMesh={outlinedCube} />
	</Canvas>
</div>

<style>
	.canvas {
		background-color: rgb(50 52 60);
		width: 100%;
		height: 100%;
	}
</style>
