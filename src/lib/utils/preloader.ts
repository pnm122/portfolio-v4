import { browser } from '$app/environment'

let finishedPreloadingCallback = () => {}
let finishedPreloading = new Promise<void>((res) => (finishedPreloadingCallback = res))

if (browser) {
	document.body.setAttribute('data-preloading', 'inactive')
}

function setPreloadingState(state: 'inactive' | 'active' | 'finished') {
	document.body.setAttribute('data-preloading', state)
	if(state === 'finished') {
    finishedPreloadingCallback()
  }
}

function isPreloading() {
	return document.body.getAttribute('data-preloading') === 'active'
}

export { finishedPreloading, setPreloadingState, isPreloading }