<script>
	import Button from "$components/Button.svelte";

</script>
<div class='hero container'>
  <h1 class='hero__heading'>pierce martin</h1>
  <p class='hero__description'>I am a software developer and designer passionate about <i>human-centered</i>, <b>intuitive</b> design and <u>modern</u> web development.</p>
  <Button
    size='large'
    type='link'
    class='hero__cta'>
    Contact Me
  </Button>
</div>

<style lang="scss">
  @import '$scss/variables';

  .hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    max-width: min-content;
    margin: auto;
    padding-block: 80px;

    &__heading {
      font-size: $font-size-32;
      white-space: nowrap;

      @media screen and (min-width: $screen-xs) {
        font-size: $font-size-40;
      }

      @media screen and (min-width: $screen-sm) {
        font-size: $font-size-60;
      }
    }

    :global(.hero__cta) {
      margin-top: 24px;
    }
  }
</style>