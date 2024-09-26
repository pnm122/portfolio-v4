<script lang="ts">
	import gsap from "gsap"

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
      
      gsap.to(projects, {
        xPercent: -100 * (projects.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: projectsContainer,
          pin: true,
          // pinSpacing: false,
          scrub: 1,
          snap: {
            snapTo: 1 / (projects.length - 1),
            duration: { min: 0.5, max: 1 },
            ease: 'power4.out',
            directional: false
          },
          start: 'top top',
          // base vertical scrolling on how wide the container is so it feels more natural
          end: () => `${projectsContainer.offsetWidth}px`
        }
      })
    })

    return () => {
      ctx.revert()
    }
  })
</script>

<section class='projects'>
  <div class='projects__inner'>
    <div class='project'></div>
    <div class='project'></div>
    <div class='project'></div>
    <div class='project'></div>
  </div>
</section>

<style lang="scss">
  @import '$scss/mixins';

  .projects {
    margin-top: 200px;

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
  }
</style>