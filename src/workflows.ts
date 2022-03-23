import * as wf from '@temporalio/workflow';
// Only import the activity types
import type * as activities from './activities';

const { requestARide } = wf.proxyActivities<typeof activities>({
  startToCloseTimeout: '5s'
});

export const driverAccepted = wf.defineSignal('driverAcceptedSignal');

export async function uberWorkflow(requestARideTimeout: string | number): Promise<string> {
  await requestARide();

  let driverHasAccepted = false;

  wf.setHandler(driverAccepted, () => void (driverHasAccepted = true));

  if (await wf.condition(() => driverHasAccepted === true, requestARideTimeout)) {
    // reach here if predicate function is true
    return 'driver is on their way';
  } else {
    // reach here if timeout happens first
    return 'no drivers found';
  }
}
