<script lang="ts">
	import gsap from "gsap"
	import Button from "./Button.svelte"
	import { goto } from "$app/navigation"

  interface Props {
    slug: string
    title: string
  }

  const {
    slug,
    title
  }: Props = $props()

  let progress = $state(0)

  $effect(() => {
    let navigation = 0
    const ctx = gsap.context(() => {
      const container = document.querySelector('.next')
      const inner = document.querySelector('.next__inner')
      const progressbar = document.querySelector('.progress')
      const updateProgress = gsap.quickTo('.progress__bar', 'width', {
        duration: 0.5,
        ease: 'power4.out'
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=1200px',
          pin: true,
          scrub: true,
          onUpdate: (self) => {
            updateProgress(self.progress * progressbar!.clientWidth)

            if(self.progress > 0.99 && !navigation) {
              navigation = setTimeout(() => {
                goto(`/case-study/${slug}`)
              }, 500)
            }
          }
        },
      })
    })

    return () => {
      ctx.revert()
      if(navigation) {
        clearTimeout(navigation)
      }
    }
  })
</script>

<div class='next'>
  <div class='next__inner'>
    <div class='text'>
      <h2 class='text__up-next'>Up next</h2>
      <div class='above-progress'>
        <h1 class='above-progress__title'>
          {title}
        </h1>
        <Button
          type='link'
          href='/case-study/{slug}'
          class='above-progress__skip'
          style='text'>
          Skip
        </Button>
      </div>
    </div>
    <div
      role='progressbar'
      aria-valuemin='0'
      aria-valuemax='100'
      aria-valuenow={progress}
      class='progress'>
      <div role='' class='progress__bar'></div>
    </div>
  </div>
</div>

<style lang="scss">
  @import '$scss/mixins';
  @import '$scss/variables';

  .next {
    @include container;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    .text {
      @include v-gap(0px);

      &__up-next {
        font-family: $font-body;
        text-transform: lowercase;
        font-weight: 500;
      }

      .above-progress {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;

        &__title {
          font-size: $font-size-16;
          text-transform: lowercase;

          @media screen and (min-width: $screen-sm) {
            font-size: $font-size-24;
          }

          @media screen and (min-width: $screen-md) {
            font-size: $font-size-40;
          }

          @media screen and (min-width: $screen-lg) {
            font-size: $font-size-60;
          }
        }
      }
    }

    .progress {
      width: 100%;
      height: 4px;
      border-radius: 999px;
      overflow: hidden;
      background-color: $gray-1;
      margin: 6px 0 24px 0;

      &__bar {
        background-color: $black;
        height: 100%;
        width: 0;
      }
    }
  }
</style>