import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import Destinations = require('../lib/destinations-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Destinations.DestinationsStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
