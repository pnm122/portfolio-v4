<script lang="ts">
  interface Props {
    text: string
    noOverflow?: boolean
  }

  const {
    text,
    noOverflow
  }: Props = $props()
</script>

{#each text.split(' ') as word}
  {#if noOverflow}
    <div class='word-wrapper'>
      <div class='word'>
        {#each word as letter}
          <div class='letter'>{letter}</div>
        {/each}
      </div>
    </div>
  {:else}
    <div class='word'>
      {#each word as letter}
        <div class='letter'>{letter}</div>
      {/each}
    </div>
  {/if}
  {' '}
{/each}

<style lang="scss">
  .word {
    position: relative;
    display: inline-block;
  }

  .word-wrapper {
    display: inline-block;
    overflow: hidden;
    vertical-align: top;
  }
  
  .letter {
    position: relative;
    display: inline-block;
  }
</style>