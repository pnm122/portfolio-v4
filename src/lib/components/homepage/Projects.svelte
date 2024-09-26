<script lang="ts">
	import gsap from "gsap"
	import ScrollTrigger from "gsap/dist/ScrollTrigger"

  const projects = [{}, {}, {}, {}]

  let projectsTween: gsap.core.Tween
  $effect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
      
      const projects = gsap.utils.toArray('.project')
      const projectsContainer = document.querySelector('.projects') as HTMLElement
      const projectsInner = document.querySelector('.projects__inner') as HTMLElement
      gsap.from(projectsInner, {
        scale: 0.333,
        transformOrigin: '50vw center',
        ease: 'none',
        scrollTrigger: {
          trigger: projectsContainer,
          scrub: 1,
          start: 'top bottom',
          end: 'top top'
        }
      })
      
      projectsTween = gsap.to(projects, {
        xPercent: -100 * (projects.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: projectsContainer,
          pin: true,
          scrub: 1,
          snap: {
            snapTo: 1 / (projects.length - 1),
            duration: { min: 0.5, max: 1 },
            ease: 'power4.out',
            directional: false
          },
          start: 'top top',
          // base vertical scrolling on how wide the container is so it feels more natural
          end: () => `${projectsContainer.offsetWidth ?? 0}px`
        }
      })
    })

    return () => {
      ctx.revert()
    }
  })

  function scrollToProject(n: number) {
    const { start, end } = projectsTween.scrollTrigger!
    const projectScrollSize = ((end - start) / (projects.length - 1))
    gsap.to(window, {
      scrollTo: {
        y: start + (projectScrollSize * n)
      }
    })
  }
</script>

<div id='projects-scroll-ref'></div>
<section class='projects'>
  <div class='projects__inner'>
    <div class='project'></div>
    <div class='project'></div>
    <div class='project'></div>
    <div class='project'></div>
    <div class='project-buttons'>
      {#each projects as _, i}
        <button
          class='project-buttons__button'
          onclick={() => scrollToProject(i)}>
          Project {i}
        </button>
      {/each}
    </div>
  </div>
</section>

<style lang="scss">
  @import '$scss/mixins';

  .projects {
    margin-top: 200px;
    position: relative;

    &__inner {
      display: flex;
      flex-direction: row;
      height: 100vh;
      max-height: -webkit-fill-available;
      overflow: hidden;
    }

    .project {
      @include force-size(100vw, 100%);

      &:nth-of-type(1) {
        background-color: red;
      }

      &:nth-of-type(2) {
        background-color: greenyellow;
      }

      &:nth-of-type(3) {
        background-color: blue;
      }

      &:nth-of-type(4) {
        background-color: blueviolet;
      }
    }

    .project-buttons {
      position: absolute;
      bottom: 24px;
      right: 24px;
      @include h-gap(12px);
    }
  }
</style>