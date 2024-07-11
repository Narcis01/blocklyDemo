import { Injectable } from '@angular/core';
import * as Blockly from 'blockly';
import {javascriptGenerator} from 'blockly/javascript';

@Injectable({
  providedIn: 'root'
})
export class BlocklyGeneratorService {
  toolboxString: string = `<xml xmlns="https://developers.google.com/blockly/xml">`;
  constructor() { }

  generateBlocks(): Blockly.WorkspaceSvg {
    
   
    Blockly.defineBlocksWithJsonArray([{
      "type": "caffe_machine",
      "message0": 'coffe_machine ',
      "colour": 160,
      "nextStatement": "Action",
    }]);
    javascriptGenerator.forBlock['caffe_machine'] = function(block, generator) {
 
      return `coffe_machine`;
    }
    // Register the definition.
    this.toolboxString += `<category name="Coffee Machines" colour="#5C81A6">
                           <block type="caffe_machine"></block>
                          `;
    //errors
    Blockly.defineBlocksWithJsonArray([{
      "type": "error_no_water",
      "message0": 'error_no_water ',
      "previousStatement": "Action",
      "colour": 160,
      "nextStatement": "Action",
    }]);
    javascriptGenerator.forBlock['error_no_water'] = function(block, generator) {
      return ` no_water`;
    }
    // Register the definition.
    this.toolboxString += `<category name="Errors" colour="#5CA65C">
                            <block type="error_no_water"></block>
                            `;

    Blockly.defineBlocksWithJsonArray([{
      "type": "error_no_sugar",
      "message0": 'error_no_sugar ',
      "previousStatement": "Action",
      "colour": 160,
      "nextStatement": "Action",
    }]);
    javascriptGenerator.forBlock['error_no_sugar'] = function(block, generator) {
      return ` no_sugar`;
    }
    // Register the definition.
    this.toolboxString += `<block type="error_no_sugar"></block> </category> </category>`;

    return Blockly.inject('blocklyDiv', {
      toolbox: this.toolboxString
    });
  }

  
}
