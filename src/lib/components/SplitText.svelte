<script lang="ts">
	import createClasses from "$utils/createClasses";

  interface Props {
    text: string
  }

  const {
    text
  }: Props = $props()
</script>

{#each text as letter}
  <span class={createClasses({
    'letter': true,
    'letter--space': letter === ' '
  })}>
    {letter}
  </span>
{/each}

<style lang="scss">
  .letter {
    display: inline-block;

    &--space {
      width: 0.2em;
    }
  }
</style>