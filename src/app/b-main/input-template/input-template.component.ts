import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { NavigationButtonsComponent } from '.././navigation-buttons/navigation-buttons.component';
import { SavedTamplate } from './saved-template';
import { Elements } from './elements';
import { UserCode } from './user-code';

@Component({
  selector: 'app-input-template',
  templateUrl: './input-template.component.html',
  styleUrls: ['./input-template.component.css']
})
export class InputTemplateComponent implements OnInit {
  private _templates = [];

  public _elements: Elements;
  private _userCode: UserCode;
  private _save: SavedTamplate;
  private _navBtnComp: NavigationButtonsComponent;


  @Input() public renderToDo;
  @Output() public saveBtnClicked = new EventEmitter();
  @Output() public sendingName = new EventEmitter();
  @Output() public sendReadyTemplate = new EventEmitter();

  public isShow: boolean;
  public templateName = "";
  public modifier = "";
  public className = "";
  public tag = "";
  public isModifier: boolean = false;
  public isChild: boolean = false;
  public backgroundArea: string = "#1E1E1E";
  public textColorArea: string = "#00d604";

  public switchBackground(color) {

    this.backgroundArea = color;

  }

  public switchTextColor(color) {

    this.textColorArea = color;

  }

  public showChildElement() {

    this.isChild = true;

  }

  public getTemplate() {

    let temp = this._save.listTemplates();

    return temp;

  }

  public clearForm() {

    this.className = "";
    this.tag = "";
    this.renderToDo = ""
    this.isShow = true;
    this.modifier = "";
    this.isModifier = false;


    this._elements.items.splice(0, this._elements.items.length);
    this._templates.splice(0, this._templates.length);
    this._elements.cssRules.splice(0, this._elements.cssRules.length);
    this._elements.cssTemplate.splice(0, this._elements.cssTemplate.length);
  }

  public clearElement() {

    this.className = "";
    this.tag = "";
    this.modifier = "";
    this.isModifier = false

  }

  public saveTemplate(block, endBlock, nameBlock):void {

    let obj = "";
    let child = "";
    this.templateName = nameBlock;
    let userCode = this._userCode.userTemplate;

    for (let i = 0; i < this._elements.items.length; i++) {


      for (let j = 0; j < this._elements.items[i].childs.length; j++) {

        child = child + this._elements.items[i].childs[j].tag +
          this._elements.items[i].childs[j].name +
          this._elements.items[i].childs[j].closeTag;

      }

      obj = obj + this._elements.items[i].tag +
        this._elements.items[i].className +
        child +
        this._elements.items[i].closeTag;

      child = "";

    }
    this._templates.push({
      "block": block,
      "body": obj,
      "endBlock": endBlock,
      "css": [].concat(this._elements.cssTemplate)
    });

    if (userCode.length !== 0) {
      this._templates[0]["user-code"] = userCode[0];
    }

    for (let i = 0; i < this._templates.length; i++) {

      this._save.templates(this._templates[i]);

    }

    this.clearForm();

  }

  public OnBtnClicked() {

    let boolean = false;

    this.saveBtnClicked.emit(boolean);
    this.sendingName.emit(this.templateName);
    this.sendReadyTemplate.emit(this.getTemplate());

  }

  public showModifier() {

    this.isModifier = true;

  }

  constructor() {

    this._save = new SavedTamplate();
    this._elements = new Elements();
    this._userCode = new UserCode();

  }

  ngOnInit() { }

  ngOnChanges() {

    if (this.renderToDo === "") {

      this.isShow = true;

    } else {

      this.isShow = false;
      this.tag = "";
      this.className = "";
      this._elements.items.splice(0, this._elements.items.length);

    }

  }

}
