import {Component, OnInit} from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {AuthService} from '../shared/services/auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AngularFirestore} from '@angular/fire/firestore';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  public Editor = ClassicEditor;
  public editorData = '';
  public titre = 'Sans titre';
  public idPage;
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(public authService: AuthService, private httpClient: HttpClient, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (!params.id) {
        this.createDocument();
      } else {
        this.idPage = params.id;
        this.getDocument();
      }
    });

  }

  getDocument() {

    this.httpClient.get(environment.firebase.databaseURL + '/posts/' + this.idPage + '.json').subscribe((data: any) => {
      this.editorData = data.editorData === null ? '' : data.editorData;
      this.titre = data.titre;
    });
  }

  createDocument() {
    this.httpClient.post(environment.firebase.databaseURL + '/posts.json', {
      titre: 'sans Titre',
      page: 'Une nouvelle histoire'
    }).subscribe((data: any) => {
      this.idPage = data.name;
    });
  }

  onSearchChange() {
    if (this.titre.trim().length === 0 || this.editorData.trim().length) {
      this.httpClient.put(environment.firebase.databaseURL + '/posts/' + this.idPage + '.json', {
        titre: this.titre,
        editorData: this.editorData
      }).subscribe();
    }
  }
}
