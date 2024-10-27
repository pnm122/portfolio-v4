export default function isTouchDevice() {
	return !window.matchMedia('(any-pointer: fine)').matches
}
