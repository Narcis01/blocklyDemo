import { TestBed } from '@angular/core/testing';

import { BlocklyGeneratorService } from './blockly-generator.service';

describe('BlocklyGeneratorService', () => {
  let service: BlocklyGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlocklyGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
