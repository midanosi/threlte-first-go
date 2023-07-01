<script>
	import { Canvas, T } from '@threlte/core';
	import Scene from './Scene.svelte';
	import UI from './UI.svelte';
	import { World } from '@threlte/rapier';
	import { HTML } from '@threlte/extras';
</script>

<Canvas>
	<World>
		<Scene />

		<HTML slot="fallback" transform>
			<p>
				It seems your browser<br />
				doesn't support WASM.<br />
				I'm sorry.
			</p>
		</HTML>
	</World>
	<T.AxesHelper args={[3]} />
</Canvas>

<UI/>