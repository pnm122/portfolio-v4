/**
 * Easing function to reach the end of the animation halfway through, then return back to the start (making a "v" shape).
 * @param n Animation progress
 */
export default function vEase(n: number) {
	return n < 0.5 ? 2 * n : 2 * (1 - n)
}
