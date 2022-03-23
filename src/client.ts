import { Connection, WorkflowClient } from '@temporalio/client';
import { uberWorkflow } from './workflows';

async function run() {
  const connection = new Connection({});
  const client = new WorkflowClient(connection.service, {});

  const handle = await client.start(uberWorkflow, {
      args: ['30s'],
      taskQueue: 'uber-task-queue',
      workflowId: 'wf-id-' + Math.floor(Math.random() * 1000),
    });
  console.log(`Started workflow ${handle.workflowId}`);

  console.log(await handle.result());
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
