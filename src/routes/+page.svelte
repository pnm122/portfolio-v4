<script>
	import Button from "$components/Button.svelte";
	import SplitText from "$components/SplitText.svelte";
	import popInAnimation from "$utils/animation/popInAnimation";
	import rollInAnimation from "$utils/animation/rollInAnimation";
	import gsap from "gsap";

  $effect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      tl.fromTo('.hero__heading .letter', ...rollInAnimation())
      tl.fromTo('.hero__description', ...popInAnimation({ delay: 0.125 }))
      tl.fromTo('.hero__cta', ...popInAnimation({ delay: 0.125}))

      tl.fromTo('body', {
        scale: 0.85,
        overflow: 'hidden',
        transformOrigin: 'center 50vh'
      }, {
        scale: 1,
        ease: 'power4.out',
        duration: 0.375,
        delay: 0.125
      })

      tl.to('body', { overflow: 'auto', duration: 0 })

      tl.fromTo('.navigation .toggle__bar', {
        scaleX: 0
      }, {
        scaleX: 1,
        ease: 'power4.out',
        duration: 0.25,
        stagger: 0.05,
        delay: 0.25
      })
    })

    return () => ctx.revert()
  });

</script>
<div class='hero container'>
  <h1 class='hero__heading'>
    <SplitText text='pierce martin' />
  </h1>
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

    &__description {
      font-size: $font-size-8;

      @media screen and (min-width: $screen-sm) {
        font-size: $font-size-10;
      }
    }

    :global(.hero__cta) {
      margin-top: 24px;
    }
  }
</style>