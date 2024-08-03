import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import VersioningUpdatesCfn = require('../lib/versioning-updates-cfn-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new VersioningUpdatesCfn.VersioningUpdatesCfnStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
