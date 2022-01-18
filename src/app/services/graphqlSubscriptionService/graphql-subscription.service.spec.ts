import { TestBed } from '@angular/core/testing';

import { GraphqlSubscriptionService } from './graphql-subscription.service';

describe('GraphqlSubscriptionService', () => {
  let service: GraphqlSubscriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphqlSubscriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
