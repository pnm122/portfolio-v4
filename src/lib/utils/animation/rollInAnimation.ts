export default function rollInAnimation(options?: gsap.TweenVars): [gsap.TweenVars, gsap.TweenVars] {
  return [{
    transformOrigin: 'center bottom',
    scaleY: 0,
    transformStyle: 'preserve-3d'
  }, {
    scaleY: 1,
    ease: 'back.out',
    duration: 0.25,
    stagger: 0.025,
    ...options
  }]
}