import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  @Input() projects:string[];
  @Input() error:string;
  @Output() onProjectClick:EventEmitter<string> = new EventEmitter();
  constructor() { }

  ngOnInit() {  
  }

  projectClicked(projectName:string ){
    this.onProjectClick.emit(projectName);
  }
}
