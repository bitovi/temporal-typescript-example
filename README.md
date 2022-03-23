# Temporal Typescript Example

This project was scaffolded by the temporal package initializer (example: `npx @temporalio/create@latest ./myfolder`).

This example illustrates a simplified Uber workflow:

* the client requests a ride
* a driver can accept which transitions you to the `"driver is on their way”` state
* the system can time out after 30 seconds and transition you to the `“no drivers found”` state

### Running this example

1. Make sure Temporal Server is running locally (see the [quick install guide](https://docs.temporal.io/docs/server/quick-install/)).
1. `npm install` to install dependencies.
1. `npm run start.watch` to start the Worker.
1. In another shell, `npm run workflow` to run the Workflow Client.

The client should log the Workflow ID that is started, and you should see it reflected in Temporal Web UI.
By default, the workflow will timeout after 30 seconds and result in a `"no drivers found"` state.

However, before the timeout occurs, you can simulate a driver accepting the request:

* In another shell, `npm run accept-request -- --workflow=[WORKFLOW ID HERE]`
... replacing `[WORKFLOW ID HERE]` with the workflow ID that is logged out to the shell when the workflow is first started.

This will result in a `"driver is on their way"` state.


### Viewing the Temporal Web UI
This gets started up along with the Temporal Server: http://localhost:8088/
