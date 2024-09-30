<script lang="ts">
	import gsap from "gsap"
	import { Canvas, Circle, Rectangle } from "svelte-physics-renderer"

  const format = new Intl.DateTimeFormat([], {
    timeZone: 'America/New_York',
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })

  let canvas = $state<Canvas | undefined>()
  let time = $state(new Date())
  let animationCompleted = $state(false)

  $inspect(time)

  function startCanvas() {
    canvas?.context.start()
  }

  function stopCanvas() {
    canvas?.context.stop()
  }

  $effect(() => {
    console.log('effect')
    const ctx = gsap.context(() => {
      gsap.set('.lets-talk', {
        transformOrigin: 'bottom left'
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.contact',
          start: 'bottom-=600px bottom',
          end: 'bottom bottom',
          scrub: true
        },
        onStart: () => {
          // if(animationCompleted) animationCompleted = false
          (() => {
        stopCanvas()
      })()
        },
        onUpdate: () => {
          // if(animationCompleted) animationCompleted = false
        },
        onComplete: () => {
          // if(!animationCompleted) animationCompleted = true
          (() => {
            startCanvas()
          })()
        }
      })

      tl.from('.lets-talk', {
        y: '-600px',
        scale: () => {
          const contact = document.querySelector<HTMLElement>('.contact')
          const letsTalk = document.querySelector<HTMLElement>('.lets-talk')
          if(!contact || !letsTalk) return 3
          return contact.clientWidth / letsTalk.clientWidth
        },
        ease: 'none'
      })

      gsap.from('.contact-link, .contact__image', {
        opacity: 0,
        scrollTrigger: {
          trigger: '.contact',
          start: 'bottom-=100px bottom',
          end: 'bottom bottom',
          scrub: true
        }
      })
    })

    // function onResize() {
		// 	if (canvas?.context.state === 'running') {
    //     if(animationCompleted) {
    //       canvas.context.stop()
    //       canvas.context.start()
    //     } else {
    //       canvas.context.stop()
    //     }
		// 	}
		// }

		// window.addEventListener('resize', onResize)

    // const interval = setInterval(() => {
    //   time = new Date(time.getTime() + 1000)
    // }, 1000)

		return () => {
			// window.removeEventListener('resize', onResize)
			(() => {
        stopCanvas()
      })()
      // clearInterval(interval)
      ctx.revert()
		}
  })
</script>

<div
  id='contact'
  class='contact'>
  <Canvas
    bind:this={canvas}
    width='100%'
    height='100%'
    gravity={{ scale: 0.00067 }}
    bounded={false}>
    <div class='contact__canvas'>
      <div class='contact__body'>
        <Rectangle isStatic>
          <h1 class='lets-talk'>
            Let's talk
          </h1>
        </Rectangle>
        <p class='time'>
          {#each format.format(time).split(',') as timeSection}
            <Rectangle class='time__inner' isStatic>
              <span>{timeSection}</span>
            </Rectangle>
          {/each}
        </p>
      </div>
      <div class='drop-in-items'>
        <Circle
          class='contact-link contact-link--email'
          radius={16}
          restitution={0.75}
          size={160}>
          <a
            class='contact-link__inner'
            href='mailto:pnmartin02@gmail.com'>
            Email
          </a>
        </Circle>
        <Circle
          class='contact-link contact-link--github'
          radius={16}
          restitution={0.75}
          size={160}>
          <a
            class='contact-link__inner'
            href='https://github.com/pnm122'
            target='_blank'
            rel='noopener noreferrer'>
            Github
          </a>
        </Circle>
        <Circle
          class='contact-link contact-link--linkedin'
          radius={16}
          restitution={0.75}
          size={160}>
          <a
            class='contact-link__inner'
            href='https://www.linkedin.com/in/pierce-martin-02/'
            target='_blank'
            rel='noopener noreferrer'>
            Linkedin
          </a>
        </Circle>
        <Rectangle
          class='contact__image'
          restitution={0.75}
          radius={16}>
          <img
            alt='Pierce Martin'
            src='images/homepage/pierce.jfif'>
        </Rectangle>
      </div>
      <Rectangle class='wall wall--left' isStatic />
      <Rectangle class='wall wall--right' isStatic />
      <!-- <Rectangle class='wall wall--top' isStatic /> -->
      <Rectangle class='wall wall--bottom' isStatic />
    </div>
  </Canvas>
</div>

<style lang="scss">
  @import '$scss/mixins';
  @import '$scss/variables';

  .contact {
    @include container;
    height: 1500px;
    position: relative;
    margin-top: 500px;
    // A little margin to make sure that the animation end triggers
    margin-bottom: 4px;
    
    &__canvas {
      display: flex;
      flex-direction: column-reverse;
      height: 100%;
    }

    &__body {
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }

    :global(.contact__image) {
      width: 200px;
      height: 200px;
      overflow: hidden;

      :global(img) {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }

    :global(.lets-talk) {
      text-transform: lowercase;
      font-size: $font-size-40;
      line-height: 0.825;
      margin-bottom: -0.11em;
      width: fit-content;
      white-space: nowrap;
      position: relative;
      z-index: 1;

      @media screen and (min-width: $screen-sm) {
        font-size: $font-size-60;
      }

      @media screen and (min-width: $screen-md) {
        font-size: $font-size-96;
      }

      @media screen and (min-width: $screen-lg) {
        font-size: $font-size-128;
      }
    }

    .drop-in-items {
      @include v-gap(320px);
      padding-bottom: 1500px;
      padding-left: 15%;
      position: relative;

      @media screen and (min-width: $screen-sm) {
        padding-left: 45%;
      }
    }

    .time {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      text-align: right;
      font-size: $font-size-6;

      @media screen and (min-width: $screen-sm) {
        font-size: $font-size-8;
      }
    }

    :global(.time__inner) {
      width: fit-content;
    }

    :global(.contact-link) {
      text-transform: lowercase;
      font-family: $font-heading;
      font-size: $font-size-24;
      color: $heading;
      height: 160px;

      :global(.contact-link__inner) {
        width: 100%;
        height: 100%;
        @include centered;
      }
    }

    :global(.contact-link--email) {
      background-color: $primary;
    }

    :global(.contact-link--github) {
      background-color: $accent;
    }

    :global(.contact-link--linkedin) {
      background-color: $tertiary;
    }

    :global(.wall) {
      position: absolute;
    }

    :global(.wall--left),
    :global(.wall--right) {
      top: 0;
      bottom: 0;
      width: 200px;
    }

    :global(.wall--top),
    :global(.wall--bottom) {
      left: 0;
      right: 0;
      height: 200px;
    }

    :global(.wall--left) {
      right: 100%;
    }

    :global(.wall--right) {
      left: 100%;
    }

    :global(.wall--top) {
      bottom: 100%;
    }

    :global(.wall--bottom) {
      top: 100%;
    }
  }
</style>