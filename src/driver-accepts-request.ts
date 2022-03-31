import { Connection, WorkflowClient } from '@temporalio/client';
import { driverAcceptedSignal } from './workflows';

async function run() {
  const workflowId = process.argv
  ?.find(arg => arg.includes('--workflow'))
  ?.split('=')
  [1];

  const connection = new Connection({});
  const client = new WorkflowClient(connection.service, {});

  if (workflowId){
    const handle = client.getHandle(workflowId);
    await handle.signal(driverAcceptedSignal);
    console.log('signal has been sent');
    return;
  }

  throw new Error('workflowId was not provided');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
