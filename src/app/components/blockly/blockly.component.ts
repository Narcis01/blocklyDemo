import { Component, OnInit } from '@angular/core';
import * as Blockly from 'blockly';
import { BlocklyGeneratorService } from 'src/app/services/blockly-generator.service';

@Component({
  selector: 'app-blockly',
  templateUrl: './blockly.component.html',
  styleUrls: ['./blockly.component.css']
})
export class BlocklyComponent implements OnInit {

  workspace!: Blockly.WorkspaceSvg;

  constructor(private generateService: BlocklyGeneratorService) { }

  ngOnInit(): void {
    this.initializeBlockly();
  }

  initializeBlockly(): void {
    this.workspace = this.generateService.generateBlocks();
    
  }

  runCode(): void {
    const blocks = this.workspace.getTopBlocks(true);
    blocks.forEach(block => {
      switch (block.type) {
        case 'caffe_machine':
          const caffeSize = block.getFieldValue('SIZE');
          const caffeType = block.getFieldValue('TYPE');
          const caffeSugar = block.getFieldValue('SUGAR');
          const caffeMilk = block.getFieldValue('MILK');
          this.makeCoffee(caffeSize, caffeType, caffeSugar, caffeMilk);
          break;
        case 'tea_machine':
          const teaSize = block.getFieldValue('SIZE');
          const teaType = block.getFieldValue('TYPE');
          const teaSugar = block.getFieldValue('SUGAR');
          const teaLemon = block.getFieldValue('LEMON');
          this.makeTea(teaSize, teaType, teaSugar, teaLemon);
          break;
      }
    });
  }

  makeCoffee(size: string, type: string, sugar: string, milk: string): void {
    console.log('Coffee order:', size, type, sugar, milk);
  }

  makeTea(size: string, type: string, sugar: string, lemon: string): void {
    console.log('Tea order:', size, type, sugar, lemon);
  }
}
