import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Avatar } from 'src/model/avatar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  constructor(private http: HttpClient) { }

  getAvatarsByType(id: number | null): Observable<Avatar[]> {
    return this.http.get<Avatar[]>('http://localhost:8080/api/avatar/type/' + id);
  }

  getAllAvatars(): Observable<Avatar[]> {
    return this.http.get<Avatar[]>('http://localhost:8080/api/avatar/');
  }

  moveListOfAvatars(avatars: Avatar[]): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/avatar/move-avatars', avatars);
  }

  startFireworks(avatars: Avatar[]): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/avatar/start-fireworks', avatars);
  }

  stopFireworks(avatars: Avatar[]): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/avatar/stop-fireworks', avatars);
  }

  getAllAvatarsButFireworks(): Observable<Avatar[]> {
    return this.http.get<Avatar[]>('http://localhost:8080/api/avatar/get-all-avatars-but-fireworks');
  }

  triggerManifestation(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/api/avatar/triggerManifestation');
  }

  clearManifestation(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/api/avatar/clearManifestation');
  }
}
