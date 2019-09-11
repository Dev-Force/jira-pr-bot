import jira_connector from 'jira-connector';
import { prompt } from 'enquirer';
import * as util from 'util';

// Ref for jira oauth https://github.com/floralvikings/jira-connector#oauth-authentication
export const initJiraAuth = () => {
    const {
        JIRA_HOST: host,
        JIRA_CONSUMER_KEY: consumer_key, 
        JIRA_PRIVATE_KEY: private_key,
        JIRA_ACCESS_TOKEN: token,
        JIRA_ACCESS_TOKEN_SECRET: token_secret,
    }: any = process.env;

    return new jira_connector({
        host,
        oauth: {
            consumer_key,
            private_key, 
            token,
            token_secret,
        }
    });
};

export const generateJiraAccessToken = async () => {
    const {
        JIRA_HOST: host,
        JIRA_CONSUMER_KEY: consumer_key,
        JIRA_PRIVATE_KEY: private_key
    } = process.env;

    const getAuthorizeURL = util.promisify(
        jira_connector.oauth_util.getAuthorizeURL
    ).bind(jira_connector.oauth_util);

    const swapRequestTokenWithAccessToken = util.promisify(
        jira_connector.oauth_util.swapRequestTokenWithAccessToken
    ).bind(jira_connector.oauth_util);

    const { url, token, token_secret }: any = await getAuthorizeURL({
        host,
        oauth: {
            consumer_key,
            private_key,
        }
    });

    const verificationCode = await prompt({
        type: 'input',
        name: 'verificationCode',
        message: `Paste your verification code (get it from ${url})?`
    });

    const accessToken = await swapRequestTokenWithAccessToken({
        host,
        oauth: {
            token,
            token_secret,
            oauth_verifier: verificationCode,
            consumer_key,
            private_key,
        }
    })

    // Report
    console.log('Printing Access Token Information:');
    console.log('Access Token:', accessToken);
    console.log('Access Token Secret:', token_secret);
    console.log('Please update your environment variables respectively.');
};