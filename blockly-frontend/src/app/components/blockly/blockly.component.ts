import { Component, OnInit } from '@angular/core';
import * as Blockly from 'blockly';
import { BlocklyGeneratorService } from 'src/app/services/blockly-generator.service';
import {javascriptGenerator} from 'blockly/javascript';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-blockly',
  templateUrl: './blockly.component.html',
  styleUrls: ['./blockly.component.css']
})
export class BlocklyComponent implements OnInit {

  workspace!: Blockly.WorkspaceSvg;

  constructor(private generateService: BlocklyGeneratorService,
              private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.initializeBlockly();
   
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
    localStorage.setItem('blocklyWorkspace', xmlText);
    console.log('Workspace saved');
  }

  loadWorkspace() {
    const xmlText = localStorage.getItem('blocklyWorkspace');
    if (xmlText) {
      const xml = Blockly.utils.xml.textToDom(xmlText);
      Blockly.Xml.clearWorkspaceAndLoadFromXml(xml, this.workspace);
      console.log('Workspace loaded');
    } else {
      console.log('No workspace saved in localStorage');
    }
  }
}


