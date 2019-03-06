import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private http: HttpClient) { 
  
  }

  getUserProject(userName:string):Observable<any[]>{
    return this.http.get<any[]>(
                        "https://api.github.com/users/"+userName+"/repos?per_page=100"
                    ).pipe(
                      catchError(this.handleError)
                    );
  }

  downloadReadme(userName:string, projectName:string):Observable<string>{
    return this.http.get(
                "https://raw.githubusercontent.com/"+userName+"/"+projectName+"/master/README.md",
                { responseType: 'text' }
              ).pipe(
                catchError(this.handleError)
              );
  }

  private handleError(error: HttpErrorResponse){
    if(error.status == 404){
      return throwError("404");
    }else{
      return throwError("Server error : "+error.message);
    }
  }
}
