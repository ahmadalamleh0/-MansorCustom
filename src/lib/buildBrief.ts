import { scrollToHash } from './scroll'

/** Event the Build Brief listens for; `detail` is a service title to preselect */
export const PRESELECT_EVENT = 'build-brief:preselect'

/** Scroll to the Build Brief with a service already chosen (e.g. "Tuning"). */
export function openBuildBrief(service: string) {
  window.dispatchEvent(new CustomEvent<string>(PRESELECT_EVENT, { detail: service }))
  scrollToHash('#build')
}
