<script lang="ts">
    import { treasureCount } from './stores'
</script>

<div>
    Gems: {$treasureCount}
</div>

<style>
    div {
        position: fixed;
        top: 60px;
        right: 10px;
        border: 2px solid gold;
        padding: 8px;
        background: green;
        opacity: 0.5;
        color: white;
    }
</style>