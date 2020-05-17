import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as PcAsg from '../lib/pc-asg-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new PcAsg.PcAsgStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
