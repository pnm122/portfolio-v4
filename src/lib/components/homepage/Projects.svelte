<script lang="ts">
	import vEase from "$utils/vEase"
	import gsap from "gsap"

  const projects = [{}, {}, {}, {}]
  let selectedProject = $state(0)

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
        'x'
      )

      const setPaddingTop = gsap.quickTo(
        gsap.utils.toArray('.project-image__padding-box'),
        'paddingTop',
        {
          duration: 1,
          ease: 'power4.out'
        }
      )

      const setPaddingBottom = gsap.quickTo(
        gsap.utils.toArray('.project-image__padding-box'),
        'paddingBottom',
        {
          duration: 1,
          ease: 'power4.out'
        }
      )
      
      const paddingProxy = { padding: 0 }
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
          end: () => `${Math.min(window.innerWidth, 1000) * projects.length}px`,
          onUpdate({ progress, getVelocity }) {
            // Vertically crop the project images based on scroll velocity
            // Faster scroll ==> more cropping
            const clamp = gsap.utils.clamp(0, 100)
            // Start from 1.1 so small scroll speeds don't affect cropping (which can be somewhat jarring)
            const scrollSpeed = Math.abs(getVelocity()) / 10000
            const padding = clamp(scrollSpeed * 100)
            if(padding > paddingProxy.padding) {
              paddingProxy.padding = padding
              gsap.to(paddingProxy, {
                padding: 0,
                duration: 1,
                ease: 'power4.out',
                overwrite: true,
                onUpdate() {
                  setPaddingTop(paddingProxy.padding)
                  setPaddingBottom(paddingProxy.padding)
                }
              })
            }

            // Update button locations based on progress
            // Keeps currently selected button in the center of the screen
            const buttonWidth = 120
            const containerWidth = document.querySelector('.project-buttons')!.getBoundingClientRect().width
            const endPosition = -1 * (containerWidth - buttonWidth)
            buttonsTo(progress * endPosition)

            if(Math.abs(getVelocity()) > 100) return
            const selected = projects.findIndex((_, index) => {
              const ACCEPTABLE_RANGE = 0.1
              const progressIfSelected = index / (projects.length - 1)
              return progress >= progressIfSelected - ACCEPTABLE_RANGE && progress <= progressIfSelected + ACCEPTABLE_RANGE
            })
            if(selectedProject !== selected) {
              selectedProject = selected
            }
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

        gsap.set(project, { visibility: 'hidden' })
        
        tl.fromTo(project, {
          visibility: 'hidden',
          opacity: 0,
          scale: 1.75
        }, {
          visibility: 'visible',
          opacity: 1,
          scale: 1,
          ease: 'none'
        })

        tl.to(project, {
          opacity: 0,
          scale: 0.5,
          ease: 'none'
        })

        tl.set(project, { visibility: 'hidden' })
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

<section 
  class='projects'
  aria-live='polite'
  aria-roledescription='carousel'
  aria-label='Projects'>
  {#each projects as project}
    <div class='project-image'>
      <!-- <img
        class='project-image__image'
        src=''
        alt=''> -->
      <div class='project-image__padding-box'>
        <div
          class='project-image__image'></div>
      </div>
    </div>
  {/each}
  {#each projects as project, i}
    <div
      class='project'
      role='group'
      aria-labelledby={`project__title${i + 1}`}
      aria-roledescription='slide'>
      <h1
        class='project__title'
        id={`project__title${i + 1}`}>
        Project {i + 1}
      </h1>
    </div>
  {/each}
  <div
    class='project-buttons'
    role='tablist'>
    {#each projects as _, i}
      <button
        class='project-buttons__button'
        role='tab'
        aria-selected={selectedProject === i}
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
      padding: clamp(24px, 7.5%, 80px);

      &:nth-of-type(1) .project-image__image {
        background-color: royalblue;
      }

      &:nth-of-type(2) .project-image__image {
        background-color: tan;
      }

      &:nth-of-type(3) .project-image__image {
        background-color: mediumseagreen;
      }

      &:nth-of-type(4) .project-image__image {
        background-color: mediumslateblue;
      }

      &__padding-box {
        width: 100%;
        height: 100%;
      }
      
      &__image {
        width: 100%;
        height: 100%;
        border-radius: 16px;
      }
    }

    .project-buttons {
      --button-width: 120px;

      position: absolute;
      bottom: 24px;
      left: calc(50% - (var(--button-width) / 2));
      @include h-gap(12px);

      &__button {
        white-space: nowrap;
        width: var(--button-width);
        aspect-ratio: 16 / 9;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 4px 4px 16px rgba(0, 0, 0, 0.15);
      }
    }
  }
</style>