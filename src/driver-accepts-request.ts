import { Connection, WorkflowClient } from '@temporalio/client';
import { driverAccepted } from './workflows';

async function run() {
  const connection = new Connection({});

  const client = new WorkflowClient(connection.service, {});

  const workflowId = process.argv
    ?.find(arg => arg.includes('--workflow'))
    ?.split('=')
    [1];

  if (workflowId){
    const handle = client.getHandle(workflowId);
    await handle.signal(driverAccepted);
    console.log('signal has been sent');
    return;
  }

  throw new Error('workflowId was not provided');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
