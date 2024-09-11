<script lang="ts">
	import createClasses from "$utils/createClasses";

  let open = $state(false)
</script>

<div class='navigation'>
  <div class='navigation__content'>
    <nav class={createClasses({
      'nav': true,
      'nav--expanded': open
    })}>
      <ul class='nav__list'>
        <li class='list-item'>
          <a class='list-item__link' href="#" onclick={() => open = false}>
            <span>Projects</span>
          </a>
        </li>
        <li class='list-item'>
          <a class='list-item__link' href="#" onclick={() => open = false}>
            <span>Contact Me</span>
          </a>
        </li>
      </ul>
    </nav>
    <button
      class='toggle'
      role='switch'
      aria-checked={open}
      onclick={() => open = !open}>
      <div class='toggle__bar'></div>
      <div class='toggle__bar'></div>
      <div class='toggle__bar'></div>
    </button>
  </div>
</div>

<style lang="scss">
  @import '$scss/variables';
  @import '$scss/mixins';

  $nav-items: 2;
  $nav-item-delay: 0.1s;

  .navigation {
    position: fixed;
    inset: 24px;
    bottom: unset;
    height: 0;
    display: flex;
    justify-content: flex-end;

    &__content {
      width: 0;
      height: fit-content;
      border-radius: 8px;
      background-color: $primary;
      justify-content: flex-end;
      align-items: center;
      @include h-gap(16px);
      @include transition($transition-duration-4, width);

      &:has(.toggle[aria-checked=true]) {
        width: 100%;
      }

      &:has(.toggle[aria-checked=false]) {
        transition-delay: calc($nav-item-delay * $nav-items);
      }
    }
  }

  .toggle {
    padding: 8px;
    justify-content: center;
    align-items: center;
    @include force-size(56px, 56px);
    @include v-gap(4px);

    &[aria-checked=true] {
      .toggle__bar:first-of-type,
      .toggle__bar:last-of-type {
        width: 0;
      }

      .toggle__bar:nth-of-type(2) {
        width: 50%;
      }
    }

    &__bar {
      width: 100%;
      height: 2px;
      background-color: $black;
      @include transition($transition-duration-4, width);
    }
  }

  .nav {

    &__list {
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      gap: 16px;
      margin: 0;
      padding: 0;

      .list-item {
        display: block;
        text-transform: lowercase;
        visibility: hidden;
        opacity: 0;
        transform: translateY(16px);
        white-space: nowrap;
        @include transition($transition-duration-4, visibility, opacity, transform);

        &__link {
          height: 56px;
          @include centered;
        }
      }

      @for $i from 1 through $nav-items {
        .list-item:nth-of-type(#{$i}) {
          transition-delay: calc($nav-item-delay * (3 - $i));
        }
      }

      
    }

    &--expanded {
      .list-item {
        visibility: visible;
        opacity: 1;
        transform: none;
      }

      @for $i from 1 through $nav-items {
        .list-item:nth-of-type(#{$i}) {
          transition-delay: calc($nav-item-delay * $i);
        }
      }
    }
  }
</style>