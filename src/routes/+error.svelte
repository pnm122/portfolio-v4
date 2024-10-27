<script lang="ts">
	import Button from "$components/Button.svelte"
  import { page } from "$app/stores";

</script>
<main class="error">
  {#if $page.status === 404}
    <h1 class="error__message">This page doesn't exist</h1>
    {:else}
    <h1 class="error__message">Something went wrong...</h1>
    <h2 class="error__subheading">{$page.status}</h2>
  {/if}
  <Button
    type="link"
    href="/"
    class="error__button"
  >
    Take me back home
  </Button>
</main>

<style lang="scss">
  @import '$scss/variables';
  @import '$scss/mixins';

  .error {
    height: 100vh;
    max-height: -webkit-fill-available;
    width: 100%;
    align-items: center;
    justify-content: center;
    text-align: center;
    text-transform: lowercase;
    @include container;
    @include v-gap(8px);

    &__message {
      font-size: $font-size-24;

      @media screen and (min-width: $screen-md) {
        font-size: $font-size-40;
      }
    }

    &__subheading {
      font-size: $font-size-12;
      font-family: $font-body;
    }

    :global(.error__button) {
      margin-top: 16px;
    }
  }
</style>