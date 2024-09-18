export default function popInAnimation(options?: gsap.TweenVars): [gsap.TweenVars, gsap.TweenVars] {
  return [{
    scale: 0
  }, {
    scale: 1,
    ease: 'back.out',
    duration: 0.25,
    ...options
  }]
}