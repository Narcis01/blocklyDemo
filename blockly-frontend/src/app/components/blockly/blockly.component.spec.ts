import { ComponentFixture, TestBed } from '@angular/core/testing';
import * as Blockly from 'blockly';

import { BlocklyComponent } from './blockly.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BlocklyGeneratorService } from 'src/app/services/blockly-generator.service';
import { DataService } from 'src/app/services/data.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Workspace } from 'src/app/models/workspace';

const mockWorkspace = new Blockly.WorkspaceSvg(new Blockly.Options({}));;
const mockWorkspaces = [
  { id: 1, title: 'Test 1', content: '<xml></xml>' },
  { id: 2, title: 'Test 2', content: '<xml></xml>' }
];
const stubWorkspace: Workspace = {
  id: 1,
  content: '<xml xmlns="https://developers.google.com/blockly/xml"></xml>',
  title: 'Test Workspace'
};
const mockGenerateService = {
  generateBlocks: jasmine.createSpy('generateBlocks').and.returnValue(Promise.resolve(mockWorkspace))
};

const mockDataService = {
  saveWorkspace: jasmine.createSpy('saveWorkspace').and.returnValue(of(stubWorkspace)),
  getWorkspaces: jasmine.createSpy('getWorkspaces').and.returnValue(of(mockWorkspaces))
};

describe('BlocklyComponent', () => {
  let component: BlocklyComponent;
  let fixture: ComponentFixture<BlocklyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlocklyComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [
        { provide: BlocklyGeneratorService, useValue: mockGenerateService },
        { provide: DataService, useValue: mockDataService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocklyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize Blockly', async () => {
    await component.initializeBlockly();
    expect(mockGenerateService.generateBlocks).toHaveBeenCalled();
    expect(component.workspace).toEqual(mockWorkspace); 
  });

  it('should load table workspace', () => {
    component.loadTableWorkspace();
    expect(mockDataService.getWorkspaces).toHaveBeenCalled();
  });

  it('should save workspace', () => {
    component.workspace = mockWorkspace;
    component.inputTitle = 'Test Workspace';
    component.workspaceToSave = { id: 1, content: "content", title: "Test Workspace"}; 
    component.saveWorkspace();
    expect(mockDataService.saveWorkspace).toHaveBeenCalled(); 
  });

  it('should load workspace', () => {
    spyOn(Blockly.Xml, 'clearWorkspaceAndLoadFromXml').and.callThrough();
    const workspaceString = '<xml xmlns="https://developers.google.com/blockly/xml"></xml>'; 
    component.workspace = mockWorkspace;
    component.loadWorkspace(workspaceString);
    expect(Blockly.Xml.clearWorkspaceAndLoadFromXml).toHaveBeenCalled();
  });
});