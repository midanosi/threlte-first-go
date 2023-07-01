<script lang="ts">
    import { gems } from './stores'
    import Gem from './Gem.svelte'
    console.log($gems)
</script>


{#each $gems as gem}
     {#if !gem.collected}
        <Gem {gem}
        />
     {/if}
{/each}