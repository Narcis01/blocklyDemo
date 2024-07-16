import { TestBed } from '@angular/core/testing';
import { BlocklyGeneratorService } from './blockly-generator.service';
import { DataService } from './data.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import * as Blockly from 'blockly';

const mockCategories = [
  {
    id: 1, name: 'Category 1', machine: [
      { id: 1, name: 'Machine 1', errors: [{ id: 1, description: 'Error 1' }] }
    ]
  }
];

const mockDataService = {
  getCategories: jasmine.createSpy('getCategories').and.returnValue(of(mockCategories))
};

describe('BlocklyGeneratorService', () => {
  let service: BlocklyGeneratorService;
  let blocklyDiv: HTMLDivElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        BlocklyGeneratorService,
        { provide: DataService, useValue: mockDataService }
      ]
    });
    service = TestBed.inject(BlocklyGeneratorService);

    blocklyDiv = document.createElement('div');
    blocklyDiv.id = 'blocklyDiv';
    document.body.appendChild(blocklyDiv);
  });

  afterEach(() => {
    document.body.removeChild(blocklyDiv);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate blocks', (done) => {
    service.generateBlocks().then(workspace => {
      expect(mockDataService.getCategories).toHaveBeenCalled();
      expect(workspace).toBeTruthy();
      done();
    }).catch(error => {
      done.fail(error);
    });
  });
});
