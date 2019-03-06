import { Component, OnInit } from '@angular/core';
import { GithubService } from '../github.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  username:string = "";
  userProjects:string[] = [];
  userProfileError:string="";
  readme:string="";
  readmeError:string;
  constructor(private githubsrv:GithubService) { }

  ngOnInit() {
  }

  search(){
    this.clearAll();
    this.githubsrv.getUserProject(this.username)
                  .subscribe(
                    response =>{
                      for(let project of response){
                        this.userProjects.push(project.name);
                      }
                    },
                    err =>{
                      if(err == 404){
                        this.userProfileError = "User profile not found";
                      }else{
                        this.userProfileError = err;
                      }
                    }
                  );
  }

  displayReadMe(projectName){
    this.clearReadMe();
    this.clearErrors();
    this.githubsrv.downloadReadme(this.username,projectName)
                  .subscribe(
                    response =>{
                      this.readme = response.toString();
                    },
                    err => {
                      if(err == 404){
                        this.readmeError = "README.md file not found";
                      }else{
                        this.readmeError = err;
                      }
                    }
                  );
  }

  clearAll(){
    this.clearProjects();
    this.clearReadMe();
    this.clearErrors();
  }

  clearProjects(){
    this.userProjects=[];
  }

  clearReadMe(){
    this.readme="";
  }

  clearErrors(){
    this.readmeError="";
    this.userProfileError="";
  }
}
