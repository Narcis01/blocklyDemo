import { Component, OnInit } from '@angular/core';
import * as Blockly from 'blockly';
import { BlocklyGeneratorService } from 'src/app/services/blockly-generator.service';
import { DataService } from 'src/app/services/data.service';
import { Workspace } from 'src/app/models/workspace';

@Component({
  selector: 'app-blockly',
  templateUrl: './blockly.component.html',
  styleUrls: ['./blockly.component.css']
})
export class BlocklyComponent implements OnInit {

  workspace!: Blockly.WorkspaceSvg;
  workspaceToSave: Workspace = new Workspace;
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
    // get blocks from the top to botton 
    const blocks = this.workspace.getTopBlocks(true);
    blocks.forEach((block) => {
      // log every parent block name
      this.resultRunCode += `For the machine: ${block.tooltip} with the attached blocks: `;
      let attachedBlocks = this.getAllConnectedBlocks(block);
      // log every child block from the parent
      attachedBlocks.forEach((attachedBlock) =>{
        this.resultRunCode += `${attachedBlock.tooltip} `;
      })
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
    this.workspaceToSave.content = xmlText;
    this.workspaceToSave.title = this.inputTitle;
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


