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
  constructor(private generateService: BlocklyGeneratorService,
              private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.initializeBlockly();
    this.loadTableWorkspace();
  }

  initializeBlockly(): void {
    this.generateService.generateBlocks().then((workspace) => {
      this.workspace = workspace;
    }).catch((error) => {
      console.log(error);
    });
    
  }

  runCode(): void {
 
    const blocks = this.workspace.getTopBlocks(true);
    blocks.forEach((block) => {
      console.log(`For block type: ${block.type} we have the attached:`)
      let attachedBlocks = this.getAllConnectedBlocks(block);
      attachedBlocks.forEach((attachedBlock) =>{
        console.log(attachedBlock.type);
      })

      console.log("  ");
    })
  };

  getAllConnectedBlocks(block: Blockly.Block): Blockly.Block[] {
    let connectedBlocks = [];
    let nextBlock = block.getNextBlock();
    while (nextBlock) {
      connectedBlocks.push(nextBlock);
      nextBlock = nextBlock.getNextBlock();
    }
    return connectedBlocks;
  }

  saveWorkspace() {
    const xml = Blockly.Xml.workspaceToDom(this.workspace);
    const xmlText = Blockly.Xml.domToText(xml);
    this.workspaceToSave.content = xmlText;
    this.workspaceToSave.title = this.inputTitle;
    this.dataService.saveWorkspace(this.workspaceToSave).subscribe( () => this.loadTableWorkspace());
  }

  loadWorkspace(workspaceString: string) {
    
    if (workspaceString) {
      const xml = Blockly.utils.xml.textToDom(workspaceString);
      Blockly.Xml.clearWorkspaceAndLoadFromXml(xml, this.workspace);
      console.log('Workspace loaded');
    } else {
      console.log('No workspace saved in localStorage');
    }
  }

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


