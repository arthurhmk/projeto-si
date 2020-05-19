import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface Repository {
  repos: {
    name: string;
    html_url: string;
    description: string;
  };
}

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.css'],
})
export class ReposComponent implements OnInit {
  gitLink = 'https://github.com/';
  collaborators = ['arthurhmk', 'fabio-alves', 'jhonnatthan'];
  repositories: Array<Repository> = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.collaborators.forEach((str, index) => {
      this.http
        .get<Repository>(`https://api.github.com/users/${str}/repos`)
        .subscribe((data) => {
          this.repositories[index] = data;
        });
    });
  }
}
