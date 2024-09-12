<script lang="ts">
	import Button from "$components/Button.svelte";
	import SplitText from "$components/SplitText.svelte";
	import popInAnimation from "$utils/animation/popInAnimation";
	import rollInAnimation from "$utils/animation/rollInAnimation";
	import gsap from "gsap";
	import { Canvas, Rectangle, Circle } from "svelte-physics-renderer";

  const skills = [
    'HTML',
    'CSS',
    'SCSS',
    'Tailwind',
    'JavaScript',
    'TypeScript',
    'React',
    'Svelte',
    'Stencil',
    'Node',
    'Express',
    'Flask',
    'Flutter',
    'Firebase',
    'MongoDB',
    'GSAP',
    'Matter.js',
    'Java',
    'Git',
    'GitLab CI',
    'Figma',
    'Adobe XD',
    'OpenGL'
  ]

  let skillsCanvas: Canvas | undefined = $state()

  $effect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      tl.to('body', { overflow: 'hidden' })
      tl.fromTo('.hero__heading .letter', ...rollInAnimation())
      tl.fromTo('.hero__description', ...popInAnimation({ delay: 0.125 }))
      tl.fromTo('.hero__cta', ...popInAnimation({ delay: 0.125 }))

      tl.fromTo('.homepage', {
        scale: 0.85,
        transformOrigin: 'center 50vh'
      }, {
        scale: 1,
        ease: 'power4.out',
        duration: 0.375,
        delay: 0.125
      })

      tl.to('body', { overflow: 'auto' })

      tl.fromTo('.navigation .toggle__bar', {
        scaleX: 0
      }, {
        scaleX: 1,
        ease: 'power4.out',
        duration: 0.25,
        stagger: 0.05,
        delay: 0.25
      })

      tl.fromTo('.hero', {
        filter: 'brightness(100%)',
      }, {
        filter: 'brightness(0%)',
        scrollTrigger: {
          trigger: '.about',
          start: 'top 425px',
          end: 'top top',
          scrub: true
        }
      })

      tl.fromTo('.hero__inner', {
        scale: 1,
        y: 0
      }, {
        scale: 0.5,
        y: -100,
        scrollTrigger: {
          trigger: '.raised',
          start: 'top 425px',
          end: 'top top',
          scrub: true
        }
      })

      // must come first so from state doesn't override intended initial from state
      tl.fromTo('.raised', {
        // Can't animate with variables? :(
        backgroundColor: 'oklch(36.71% 0.073 154.39)'
      }, {
        backgroundColor: 'oklch(99.25% 0.005 67.77)',
        scrollTrigger: {
          trigger: '.skills',
          start: 'bottom center',
          end: 'bottom 25%',
          scrub: true
        }
      })

      tl.fromTo('.raised', {
        // Can't animate with variables? :(
        backgroundColor: 'oklch(99.25% 0.005 67.77)'
      }, {
        backgroundColor: 'oklch(36.71% 0.073 154.39)',
        scrollTrigger: {
          trigger: '.skills',
          start: 'top center',
          end: 'top 25%',
          scrub: true
        }
      })

      tl.fromTo('.about__heading .word', ...popInAnimation({
        stagger: 0.05,
        scrollTrigger: {
          trigger: '.about__heading',
          start: 'top center',
          end: 'top 100px',
          scrub: 1.5
        }
      }))
    })

    const observer = new IntersectionObserver((e) => {
      if(e[0].isIntersecting) {
        skillsCanvas?.context.start()
      } else {
        skillsCanvas?.context.stop()
      }
    })

    observer.observe(document.querySelector('.skills')!)

    function onResize() {
      if(skillsCanvas?.context.state === 'running') {
        skillsCanvas.context.stop()
        skillsCanvas.context.start()
      }
    }

    window.addEventListener('resize', onResize)

    return () => {
      observer.disconnect()
      ctx.revert()
      window.removeEventListener('resize', onResize)
      skillsCanvas?.context.stop()
    }
  });

  function getRandomAlignment() {
    return ['flex-start', 'center', 'flex-end'][Math.round(Math.random() * 2)]
  }
</script>
<div class='homepage'>
  <section class='hero'>
    <div class='hero__inner'>
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
  </section>
  <!-- <a href='#about' id='scroll'>
    scroll
  </a> -->
  <section class='raised'>
    <section class='about' id='about'>
      <div class='about__inner'>
        <h1 class='about__heading'>
          <SplitText
            text='Creativity is at my core. I love creating rich digital experiences — from perfecting the smallest details to scaffolding the biggest ideas.'
          />
        </h1>
        <div class='about__content'>
          <p>
            Most recently, I was an intern on the Design Systems team at Chatham Financial. Most notably, I created, added features to, and maintained components in a component library,
      wrote extensive unit tests, and created a pipeline to automate the process of converting design tokens into code variables.
          </p>
          <p>
            Previously, I spent 8 months freelancing on Fiverr, where I became a Level 1 Seller offering web design and development services. I maintained a 5 star rating, crafting quality, bespoke solutions for nearly 50 orders.
          </p>
          <p>
            I’m an avid tennis player and fan, and I’m passionate about playing music, including guitar, piano, and drums. I also love learning new things, and I’m always seeking out new knowledge.
          </p>
        </div>
      </div>
    </section>
    <section class='skills'>
      <Canvas
        bind:this={skillsCanvas}
        width='100%'
        height='100%'
        interactive
        bounded={false}
        gravity={{ scale: 0.0005 }}>
        <div class='skills__inner'>
          <div class='skills__content'>
            <Rectangle class='skills__left-wall' isStatic />
            <Rectangle class='skills__right-wall' isStatic />
            <Rectangle class='skills__bottom-wall' isStatic />
            <Rectangle style='width: fit-content;' isStatic>
              <h1 class='skills__heading'>Skills</h1>
            </Rectangle>
            <Rectangle style='width: fit-content;' isStatic>
              <p class='skills__description'>
                Through schoolwork, personal and service projects, and professional experience as both a freelancer and as an intern, I've developed actionable skills in many web tools and technologies.
              </p>
            </Rectangle>
          </div>
          <ul class='skill-list'>
            {#each skills as skill}
              <li class='skill-list__item' style='align-self: {getRandomAlignment()};'>
                <Circle
                  size={100}
                  class='skill-circle'
                  restitution={0.75}>
                  {skill}
                </Circle>
              </li>
            {/each}
          </ul>
        </div>
      </Canvas>
      <span>
        {skillsCanvas?.context.state}
      </span>
      <button onclick={() => skillsCanvas?.context.state === 'running' ? skillsCanvas.context.stop() : skillsCanvas?.context.start()}>
        Toggle canvas
      </button>
    </section>
  </section>
</div>

<style lang="scss">
  @import '$scss/variables';
  @import '$scss/mixins';

  .hero {
    position: sticky;
    z-index: -1;
    top: 0;
    height: 450px;
    background-color: $background;
    @include centered;

    &__inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding-inline: 24px;
    }

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
      max-width: 500px;

      @media screen and (min-width: $screen-sm) {
        font-size: $font-size-10;
      }
    }

    :global(.hero__cta) {
      margin-top: 24px;
    }
  }

  #scroll {
    position: fixed;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
  }

  .raised {
    background-color: $background;
  }

  .about {
    padding-top: 80px;
    padding-bottom: 200px;

    &__inner {
      display: flex;
      flex-direction: column;
      gap: 64px;
      @include container;
    }

    &__heading {
      text-align: center;
      font-size: $font-size-20;

      @media screen and (min-width: $screen-sm) {
        font-size: $font-size-24;
      }

      @media screen and (min-width: $screen-md) {
        font-size: $font-size-32;
      }
    }

    &__content {
      @include columns(1);

      @media screen and (min-width: $screen-lg) {
        @include columns(3);
      }

      p {
        font-size: $font-size-10;
      }
    }
  }

  .skills {
    width: 100%;
    height: 100vh;
    max-height: 800px;

    &__inner {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      height: 100%;
    }

    &__content {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 24px;
    }

    &__heading {
      font-size: $font-size-24;
      color: $white;
      text-transform: lowercase;
      line-height: 1;
      width: fit-content;

      @media screen and (min-width: $screen-md) {
        font-size: $font-size-60;
      }
    }

    &__description {
      color: $white;
      max-width: 500px;
      width: fit-content;
    }

    :global(.skills__left-wall) {
      position: absolute;
      right: 100%;
      top: 0;
      bottom: 0;
      width: 100px;
    }

    :global(.skills__right-wall) {
      position: absolute;
      left: 100%;
      top: 0;
      bottom: 0;
      width: 100px;
    }

    :global(.skills__bottom-wall) {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      height: 100px;
    }

    .skill-list {
      margin: 0;
      padding: 0 15% 100% 0;
      display: flex;
      flex-direction: column;
      gap: 160px;
      width: 160px;

      &__item {
        display: block;

        :global(.skill-circle) {
          background-color: $primary-extra-dark;
        color: $white;
          pointer-events: none;
          @include centered;
        }
      }
    }
  }
</style>