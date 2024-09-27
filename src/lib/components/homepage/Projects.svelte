<script lang="ts">
	import vEase from "$utils/vEase"
	import gsap from "gsap"

  const projects = [{}, {}, {}, {}]

  let projectsTween: gsap.core.Tween
  $effect(() => {
    const ctx = gsap.context(() => {
      const projectImages = gsap.utils.toArray('.project-image')
      const projectsContainer = document.querySelector('.projects') as HTMLElement
      // Scale the projects themselves rather than the whole container
      // If you scale the container, GSAP's calculations on its position get wonky
      gsap.from(projectImages, {
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

      const buttonsTo = gsap.quickTo(
        document.querySelector('.project-buttons'),
        'left'
      )
      
      
      projectsTween = gsap.to(projectImages, {
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
          end: () => `${window.innerWidth * projects.length}px`,
          onUpdate: (self) => {
            const leftOffset = 24
            const rightOffset = 200
            const containerWidth = window.innerWidth - leftOffset - rightOffset
            buttonsTo(((1 - self.progress) * containerWidth) + leftOffset)
          }
        }
      })

      gsap.utils.toArray<HTMLElement>('.project-buttons__button').forEach((btn, index) => {
        gsap.to(btn, {
          y: -24,
          // The button will go back to y=0 at the end of the animation
          ease: vEase,
          scrollTrigger: {
            containerAnimation: projectsTween,
            trigger: `.project-image:nth-of-type(${index + 1})`,
            // Start when the project appears from the right
            start: 'left right',
            // End when the project is fully out of frame on the left
            // The peak of the animation will then be right in the middle, when the project is fully onscreen
            end: 'right left',
            scrub: true
          }
        })
      })

      gsap.utils.toArray<HTMLElement>('.project').forEach((project, index) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            containerAnimation: projectsTween,
            trigger: `.project-image:nth-of-type(${index + 1})`,
            start: 'left right-=50%',
            end: 'right left+=50%',
            scrub: true
          }
        })

        gsap.set(project, { opacity: 0 })
        
        tl.fromTo(project, {
          opacity: 0,
          scale: 1.75
        }, {
          opacity: 1,
          scale: 1,
          ease: 'none'
        })

        tl.to(project, {
          opacity: 0,
          scale: 0.5,
          ease: 'none'
        })
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
      ease: 'expo.inOut',
      duration: 1,
      scrollTo: {
        y: start + (projectScrollSize * n)
      }
    })
  }
</script>

<section class='projects'>
  {#each projects as project}
    <div class='project-image'>
    </div>
  {/each}
  {#each projects as project, i}
    <div class='project'>
      <h1 class='project__title'>Project {i + 1}</h1>
    </div>
  {/each}
  <div class='project-buttons'>
    {#each projects as _, i}
      <button
        class='project-buttons__button'
        onclick={() => scrollToProject(i)}>
        Project {i + 1}
      </button>
    {/each}
  </div>
</section>

<style lang="scss">
  @import '$scss/mixins';

  .projects {
    margin-top: 200px;
    position: relative;
    display: flex;
    flex-direction: row;
    height: 100vh;
    overflow: hidden;

    .project {
      position: absolute;
      z-index: 1;
      bottom: 50%;
      left: 24px;

      &__title {
        font-size: $font-size-24;
      }
    }

    .project-image {
      @include force-size(100vw, 100%);

      &:nth-of-type(1) {
        background-color: royalblue;
      }

      &:nth-of-type(2) {
        background-color: tan;
      }

      &:nth-of-type(3) {
        background-color: mediumseagreen;
      }

      &:nth-of-type(4) {
        background-color: mediumslateblue;
      }
    }

    .project-buttons {
      position: absolute;
      bottom: 24px;
      left: calc(100% - 200px);
      @include h-gap(12px);

      &__button {
        white-space: nowrap;
      }
    }
  }
</style>