// Maybe consider using https://github.com/actions/typescript-action

import { Toolkit } from 'actions-toolkit';
import { handlePullRequestChangeGithubAction } from './event-handlers/pull-request-change';

// Run your GitHub Action!
Toolkit.run(handlePullRequestChangeGithubAction);
