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

  generateBlocks(): Promise<Blockly.WorkspaceSvg> {
    return new Promise((resolve, reject) => {
      this.dataService.getCategories().subscribe(
        (categories: Category[]) => {
          console.log(categories);
          categories.forEach((category) => {
            this.toolboxString += `<category name="${category.name}" colour="#5C81A6">`;
            console.log(category);


            category.machine.forEach((m) => {
              this.toolboxString += `<category name="${m.name}" colour="#5C81A6">`;
              Blockly.defineBlocksWithJsonArray([{
                "type": `${category.name}_${m.id}`,
                "message0": `_${m.name}_`,
                "colour": 160,
                "nextStatement": "Action",
              }]);
              javascriptGenerator.forBlock[`${category.name}_${m.id}`] = function (block, generator) {
                return `${m.id}`;
              }
              // Register the definition.
              this.toolboxString += `<block type="${category.name}_${m.id}"></block> `;

              m.errors.forEach((error) => {
                Blockly.defineBlocksWithJsonArray([{
                  "type": `${m.name}_error_${error.id}`,
                  "message0": `${error.description}`,
                  "colour": 160,
                  "nextStatement": "Action",
                  "previousStatement": "Action"
                }]);
                javascriptGenerator.forBlock[`${m.name}_error_${error.id}`] = function (block, generator) {
                  return `${error.id}`;
                }
                // Register the definition.
                this.toolboxString += `<block type="${m.name}_error_${error.id}"></block> `;
              })
              this.toolboxString += `</category>`;
            })


           
            this.toolboxString += `</category>`;

          })
          this.toolboxString += "</xml>";
          const workspace =  Blockly.inject('blocklyDiv', {
            toolbox: this.toolboxString
          });
          resolve(workspace);
         
          
        },
        (error) => {
          console.error('Error fetching categories:', error);
          reject(error); // Reject the promise if there's an error
        }
      );
    });
  }
}
