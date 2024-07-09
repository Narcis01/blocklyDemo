import { Injectable } from '@angular/core';
import * as Blockly from 'blockly';

@Injectable({
  providedIn: 'root'
})
export class BlocklyGeneratorService {
  toolboxString: string = `<xml xmlns="https://developers.google.com/blockly/xml">`;
  constructor() { }

  generateBlocks(): Blockly.WorkspaceSvg {
    
    for(let i = 0; i < 2; i++){
      Blockly.defineBlocksWithJsonArray([
        {
          "type": "caffe_machine number: " + i,
          "message0": "Caffe Machine",
          "inputsInline": false,
          "colour": 230,
          "tooltip": "Caffe Machine",
          "helpUrl": "",
          "mutator": "label"
        },
      ]);
      Blockly.Blocks['caffe_machine number: ' + i] = {
        init: function() {
          this.appendDummyInput()
            .appendField("Select your option for coffe machine number: " + i)
  
          this.appendDummyInput()
            .appendField("Size")
            .appendField(new Blockly.FieldDropdown([
              ["Small", "SMALL"],
              ["Medium", "MEDIUM"],
              ["Large", "LARGE"]
            ]), "SIZE");
          
          this.appendDummyInput()
            .appendField("Type")
            .appendField(new Blockly.FieldDropdown([
              ["Espresso", "ESPRESSO"],
              ["Americano", "AMERICANO"],
              ["Cappuccino", "CAPPUCCINO"]
            ]), "TYPE");
  
          this.appendDummyInput()
            .appendField("Sugar")
            .appendField(new Blockly.FieldDropdown([
              ["No Sugar", "NO_SUGAR"],
              ["One Spoon", "ONE_SPOON"],
              ["Two Spoons", "TWO_SPOONS"]
            ]), "SUGAR");
  
          this.appendDummyInput()
            .appendField("Milk")
            .appendField(new Blockly.FieldDropdown([
              ["No Milk", "NO_MILK"],
              ["Regular", "REGULAR"],
              ["Soy", "SOY"]
            ]), "MILK");
          
          this.setOutput(true, null);
          this.setColour(230);
          this.setTooltip("Caffe Machine");
          this.setHelpUrl("");
        }
      };
      this.toolboxString += `<block type="caffe_machine number: ${i}"></block>`;
    }
    for(let i = 0; i < 2; i++){
      Blockly.defineBlocksWithJsonArray([
        {
          "type": "tea_machine number: " + i,
          "message0": "Tea Machine",
          "inputsInline": false,
          "colour": 230,
          "tooltip": "Tea Machine",
          "helpUrl": "",
          "mutator": "label"
        },
      ]);
      Blockly.Blocks['tea_machine number: ' + i] = {
        init: function() {
          this.appendDummyInput()
            .appendField("Select your option for tea machine number: " + i)
  
          this.appendDummyInput()
            .appendField("Size")
            .appendField(new Blockly.FieldDropdown([
              ["Small", "SMALL"],
              ["Medium", "MEDIUM"],
              ["Large", "LARGE"]
            ]), "SIZE");
          
          this.appendDummyInput()
            .appendField("Type")
            .appendField(new Blockly.FieldDropdown([
              ["Espresso", "ESPRESSO"],
              ["Americano", "AMERICANO"],
              ["Cappuccino", "CAPPUCCINO"]
            ]), "TYPE");
  
          this.appendDummyInput()
            .appendField("Sugar")
            .appendField(new Blockly.FieldDropdown([
              ["No Sugar", "NO_SUGAR"],
              ["One Spoon", "ONE_SPOON"],
              ["Two Spoons", "TWO_SPOONS"]
            ]), "SUGAR");
  
          this.appendDummyInput()
            .appendField("Milk")
            .appendField(new Blockly.FieldDropdown([
              ["No Milk", "NO_MILK"],
              ["Regular", "REGULAR"],
              ["Soy", "SOY"]
            ]), "MILK");
          
          this.setOutput(true, null);
          this.setColour(230);
          this.setTooltip("Tea Machine");
          this.setHelpUrl("");
        }
      };

      
      this.toolboxString += `<block type="tea_machine number: ${i}"></block>`;
    }
    return Blockly.inject('blocklyDiv', {
      toolbox: this.toolboxString
    });
  }
}
