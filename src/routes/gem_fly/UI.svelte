<script lang="ts">
    import { gemCount } from './stores'
</script>

<div>
    Gems: {$gemCount}
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