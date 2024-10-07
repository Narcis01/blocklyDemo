import { Component, OnInit } from '@angular/core';
import * as Blockly from 'blockly';
import { BlocklyGeneratorService } from 'src/app/services/blockly-generator.service';
import { DataService } from 'src/app/services/data.service';
import { Workspace } from 'src/app/models/workspace';
import { Machine } from 'src/app/models/machine';
import { ErrorMachine } from 'src/app/models/errorMachine';

@Component({
  selector: 'app-blockly',
  templateUrl: './blockly.component.html',
  styleUrls: ['./blockly.component.css']
})
export class BlocklyComponent implements OnInit {

  workspace!: Blockly.WorkspaceSvg;
  workspaceToSave!: Workspace;
  loadWorkspaces!: Workspace[];
  inputTitle: string = '';
  showWorkspaces: boolean = false;
  showSaveWorkspaceForm: boolean = false;
  resultRunCode: string = '';
  constructor(private generateService: BlocklyGeneratorService,
              private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.initializeBlockly();
    this.loadTableWorkspace();
  }
  /**
   * create the workspace with custom blocks and custom theme
   */
  initializeBlockly(): void {
    this.generateService.generateBlocks().then((workspace) => {
      this.workspace = workspace;
    }).catch((error) => {
      console.log(error);
    });
    
  }
  /**
   * log the parent blocks and the children attached to them
   */
  runCode(): void {
    this.resultRunCode = '';
    let errors: ErrorMachine[] = [];
    // get blocks from the top to botton 
    const blocks = this.workspace.getTopBlocks(true);
    blocks.forEach((block) => {
      // get the connected blocks from the parent
      const errorBlocks = this.getAllConnectedBlocks(block);
      errorBlocks.forEach(error => {
        errors.push({id: 0, description: error.tooltip.toString()})
      })
      //create a machine with selected errors
      const machine: Machine = {id: 0, name: block.tooltip.toString(), errors: errors};

      //send it to the backend and get the response
      this.resultRunCode += this.dataService.getWorkspaceResponse(machine);
      this.resultRunCode += '\n';

    })
  };
  /**
   * 
   * @param block parent block from the workspace
   * @returns array with all connected children blocks
   */
  getAllConnectedBlocks(block: Blockly.Block): Blockly.Block[] {
    let connectedBlocks = [];
    let nextBlock = block.getNextBlock();
    while (nextBlock) {
      connectedBlocks.push(nextBlock);
      nextBlock = nextBlock.getNextBlock();
    }
    return connectedBlocks;
  }
  /**
   * save current workspace
   */
  saveWorkspace() {
    // convert workspace to DOM
    const xml = Blockly.Xml.workspaceToDom(this.workspace);
    // convert DOM to text
    const xmlText = Blockly.Xml.domToText(xml);
    this.workspaceToSave = {content: xmlText, title: this.inputTitle, id: 0}
    // save workspace and load the workspaces
    this.dataService.saveWorkspace(this.workspaceToSave).subscribe( () => this.loadTableWorkspace());
  }
  /**
   * Change the current workspace with a selected workspace 
   * @param workspaceString workspace content from the selected workspace 
   */
  loadWorkspace(workspaceString: string) {
    if (workspaceString) {
      // convert xml to DOM
      const xml = Blockly.utils.xml.textToDom(workspaceString);
      // load the workspace 
      Blockly.Xml.clearWorkspaceAndLoadFromXml(xml, this.workspace);
      console.log('Workspace loaded');
    } else {
      console.log('No workspace saved in localStorage');
    }
  }
  /**
   * Get saved workspaces from the database
   */
  loadTableWorkspace(){
    this.dataService.getWorkspaces().subscribe(
      data => {
          this.loadWorkspaces = data;
          console.log("Workspaces loaded");
      }
    )
  };

  showSavedWorkspaces(){
    if(this.showWorkspaces == true) this.showWorkspaces = false;
    else this.showWorkspaces = true;
  }
  
  showSaveForum(){
    if(this.showSaveWorkspaceForm == true) this.showSaveWorkspaceForm = false;
    else this.showSaveWorkspaceForm = true;
  }
}


