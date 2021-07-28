import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  constructor(public authService: AuthService, private httpClient: HttpClient) {
  }

  public pages;

  ngOnInit(): void {
    this.httpClient.get(environment.firebase.databaseURL + '/posts.json')
      .subscribe((pages: any) => {
        this.pages = pages;
      });
  }

  deleteThis(key: any) {
    this.httpClient.delete(environment.firebase.databaseURL + '/posts/' + key + '.json').subscribe();
    delete this.pages[key];
  }
}
