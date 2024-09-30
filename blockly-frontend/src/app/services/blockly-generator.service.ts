import { Injectable } from '@angular/core';
import * as Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';
import { DataService } from './data.service';
import { Category } from '../models/category';



@Injectable({
  providedIn: 'root'
})
export class BlocklyGeneratorService {
  toolboxString: string = `<xml xmlns="https://developers.google.com/blockly/xml">`;
  constructor(private dataService: DataService) { }
  /**
   * configuration for dark mode
   */
  darkTheme = Blockly.Theme.defineTheme('darkTheme', {
    'blockStyles': {
      'logic_blocks': {
        'colourPrimary': '#789FF0',
        'colourSecondary': '#567CC8',
        'colourTertiary': '#3A5991'
      },
      'loop_blocks': {
        'colourPrimary': '#FFC760',
        'colourSecondary': '#D9A94E',
        'colourTertiary': '#A98439'
      },
      'math_blocks': {
        'colourPrimary': '#FF8098',
        'colourSecondary': '#D9667A',
        'colourTertiary': '#A94958'
      },
      'text_blocks': {
        'colourPrimary': '#66CC66',
        'colourSecondary': '#529C52',
        'colourTertiary': '#3A713A'
      },
      'variable_blocks': {
        'colourPrimary': '#FFD966',
        'colourSecondary': '#E6B843',
        'colourTertiary': '#B79A30'
      },
      'procedure_blocks': {
        'colourPrimary': '#A484E8',
        'colourSecondary': '#8769D6',
        'colourTertiary': '#6C51AB'
      }
    },
    'categoryStyles': {
      'logic_category': {
        'colour': '#789FF0'
      },
      'loop_category': {
        'colour': '#FFC760'
      },
      'math_category': {
        'colour': '#FF8098'
      },
      'text_category': {
        'colour': '#66CC66'
      },
      'variable_category': {
        'colour': '#FFD966'
      },
      'procedure_category': {
        'colour': '#A484E8'
      }
    },
    'componentStyles': {
      'workspaceBackgroundColour': '#565656',
      'toolboxBackgroundColour': '#3B3B3B',
      'toolboxForegroundColour': '#FFFFFF',
      'flyoutBackgroundColour': '#444444',
      'flyoutOpacity': 1,
      'scrollbarColour': '#999999',
      'insertionMarkerColour': '#FFFFFF',
      'insertionMarkerOpacity': 0.3,
      'cursorColour': '#FFFFFF',
      'markerColour': '#FF6666',
      'selectedGlowColour': '#FF6666',
      'selectedGlowOpacity': 0.6,
      'replacementGlowColour': '#FFFF99',
      'replacementGlowOpacity': 0.6
    },
    'fontStyle': {
      'family': 'Arial, sans-serif',
      'weight': 'bold',
      'size': 12
    },
    'startHats': true,
    name: ''
  });
  /**
   * fetch categories, machines and errors and add to workspace
   * @returns workspace with all machines
   */
  generateBlocks(): Promise<Blockly.WorkspaceSvg> {
    return new Promise((resolve, reject) => {
      /**
       * fetch data from backend and create the blocly blocks and register them in Blockly
       */
      this.dataService.getCategories().subscribe({
        next: categories => {
          categories.forEach((category) => {
            // create categories for every category we have
            this.toolboxString += `<category name="${category.name}" colour="#5C81A6">`;
            category.machine.forEach((m) => {
              // add machines for the curent category
              this.toolboxString += `<category name="${m.name}" colour="purple">`;
              //config for custom blockly block
              Blockly.defineBlocksWithJsonArray([{
                "type": `${category.name}_${m.id}`,
                "message0": `_${m.name}_`,
                "colour": 160,
                "nextStatement": "Action",
                "tooltip": `${m.name}`
              }]);
              // we can set javascriptgenerator to return what we want from a block
              javascriptGenerator.forBlock[`${category.name}_${m.id}`] = function (block, generator) {
                return `${m.id}`;
              }
              // add the machines to the current category
              this.toolboxString += `<block type="${category.name}_${m.id}"></block> `;

              m.errors.forEach((error) => {
                // config for the error blocks
                Blockly.defineBlocksWithJsonArray([{
                  "type": `${error.description}_error_${error.id}`,
                  "message0": `${error.description}`,
                  "colour": 160,
                  "nextStatement": "Action",
                  "previousStatement": "Action",
                  "tooltip": `${error.description}`
                }]);
                // we can set javascriptgenerator to return what we want from a block
                javascriptGenerator.forBlock[`${error.description}_error_${error.id}`] = function (block, generator) {
                  return `${error.id}`;
                }
                // add the error to the current machine
                this.toolboxString += `<block type="${error.description}_error_${error.id}"></block> `;
              })
              // close the current subcategory
              this.toolboxString += `</category>`;
            })
            // close the main category
            this.toolboxString += `</category>`;

          })
          // close the workspace xml config
          this.toolboxString += "</xml>";
          // config the workspace with the custom blocks and the theme 
          const workspace = Blockly.inject('blocklyDiv', {
            toolbox: this.toolboxString,
            theme: this.darkTheme
          });
          resolve(workspace);
        },
        error: error => {
          console.error('Error fetching categories:', error);
          reject(error);
        },
      }
      );
    });
  }
}
