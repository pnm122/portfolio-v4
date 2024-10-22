<script lang="ts">
  import Button from "./Button.svelte"

  interface Props {
    title: string
    description: string
    source?: string
    liveSite?: string
  }

  const {
    title,
    description,
    source,
    liveSite
  }: Props = $props()

</script>
<section class="intro">
  <div>
    <a class="intro__case-studies" href="/#case-studies">
      <h2>Case studies</h2>
    </a>
    <h1 class="intro__title">{title}</h1>
  </div>
  <div class="intro__description">
    <p>{description}</p>
  </div>
  {#if source || liveSite}
    <div class="intro__buttons">
      {#if source}
        <Button type="link" href={source} newTab>View source</Button>
      {/if}
      {#if liveSite}
        <Button type="link" href={liveSite} newTab>View live site</Button>
      {/if}
    </div>
  {/if}
</section>

<style lang="scss">
  @import '$scss/case-study';

  .intro {
		@include v-gap(12px);

		@media screen and (min-width: $screen-sm) {
			@include v-gap(24px);
		}

		&__case-studies {
			background-color: $gray-1;
			width: fit-content;
			padding: 4px 6px;
			border-radius: 4px;
			@include transition($transition-duration-2, background-color);

			&:hover {
				background-color: $gray-2;

				h2 {
					color: $black;
				}
			}

			h2 {
				text-transform: lowercase;
				font-size: $font-size-8;
				font-family: $font-body;
				font-weight: 500;
				color: $gray-7;
				@include transition($transition-duration-2, color);
			}
		}

		&__title {
			font-size: $font-size-32;
			line-height: 1;
			text-transform: lowercase;

			@media screen and (min-width: $screen-sm) {
				font-size: $font-size-60;
			}

			@media screen and (min-width: $screen-md) {
				font-size: $font-size-80;
			}

			@media screen and (min-width: $screen-xl) {
				font-size: $font-size-128;
			}
		}

		&__description {
      @include page-grid;

      p {
        font-size: $font-size-10;
        grid-column: 1 / 9;
        color: $black;
  
        @media screen and (min-width: $screen-sm) {
          font-size: $font-size-16;
        }
  
        @media screen and (min-width: $screen-md) {
          font-size: $font-size-24;
        }
      }
		}

		&__buttons {
			display: flex;
			gap: 16px;
		}
	}
</style>