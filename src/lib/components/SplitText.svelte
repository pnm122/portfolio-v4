<script lang="ts">
  interface Props {
    text: string
  }

  const {
    text
  }: Props = $props()
</script>

{#each text.split(' ') as word}
  <div class='word'>
    {#each word as letter}
      <div class='letter'>
        {letter}
      </div>
    {/each}
  </div>
  {' '}
{/each}

<style lang="scss">
  .word {
    position: relative;
    display: inline-block;
  }
  
  .letter {
    position: relative;
    display: inline-block;
  }
</style>