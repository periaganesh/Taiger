import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'project-readme',
  templateUrl: './project-readme.component.html',
  styleUrls: ['./project-readme.component.css']
})
export class ProjectReadmeComponent implements OnInit {
  @Input() readme:string;
  @Input() error:string;
  constructor() { }

  ngOnInit() {

  }

}
