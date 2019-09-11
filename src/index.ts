import { Application } from 'probot' // eslint-disable-line no-unused-vars
import { handlePullRequestChangeProbot } from './event-handlers/pull-request-change';
import { initJiraAuth } from './jira/jira-oauth';

export = (app: Application) => {

  // Register event listeners
  app.on(
    [
      'pull_request.opened',
      'pull_request.edited',
      'pull_request.reopened',
      'pull_request.synchronize',
      // 'check_run.rerequested', ???
    ], handlePullRequestChangeProbot
  );

  // app.on('issues.opened', async (context) => {
  //   const issueComment = context.issue({ body: 'Thanks for opening this issue!' })
  //   await context.github.issues.createComment(issueComment)
  // })
  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}
