import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProgressWebsocketService} from '../../service/progress.websocket.service';
import {Avatar} from 'src/model/avatar';
import {ActivatedRoute} from '@angular/router';
import {MapService} from '../../service/map.service';
import {MapModel} from '../../../model/map';
import {AvatarService} from 'src/app/service/avatar.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {

  public title = 'Using WebSocket under Angular';
  private obs: any;
  public timer: string | undefined;
  public avatarList!: Avatar[];
  mapResponse: MapModel | undefined;

  constructor(
    router: ActivatedRoute,
    private progressWebsocketService: ProgressWebsocketService,
    private mapService: MapService,
    private avatarService: AvatarService) {
    router.params.subscribe(val => {
      this.initProgressWebSocket();
      this.mapService.getMapById(val.id).subscribe(map => {
          this.mapResponse = map;
          console.log(this.mapResponse);
        },
        error => {
          this.mapResponse = undefined;
          console.log(error.message);
        }
      );
    });
  }

  ngOnInit(): void {
    this.getAllAvatars();
  }

  private getAllAvatars(): void {
    this.avatarService.getAllAvatarsButFireworks().subscribe(
      response => {
        this.avatarList = new Array();
        response.forEach(avatar => this.avatarList?.push(avatar));
      },
      error => console.log(error.message)
    );
  }

  public moveAvators(): void {
    this.avatarService.moveListOfAvatars(this.avatarList).subscribe(
      response => console.log(response),
      error => console.error(error)
    );
  }

  public toggleDayNightMode(): void {
    this.mapService.getMapById(this.mapResponse?.id === 1 ? '1' : '2').subscribe(
      map => this.mapResponse = map,
      error => {
        this.mapResponse = undefined;
        console.log(error.message);
      }
    );
  }

  public triggerManifestation(): void {
    this.avatarService.triggerManifestation().subscribe(
      response => console.log(response),
      error => console.log(error)
    );
  }

  public clearManifestation(): void {
    this.avatarService.clearManifestation().subscribe(
      response => console.log(response),
      error => console.log(error)
    );
  }

  public startAndStopFireworks(): void {
    this.avatarService.startFireworks(this.avatarList).subscribe(
      response => console.log(response),
      error => console.error(error)
    );

    this.callFireworksController(5000);
    this.callFireworksController(10000);

    setTimeout(() => {
      this.avatarService.stopFireworks(this.avatarList).subscribe(
        response => console.log(response),
        error => console.log(error)
      );
    }, 15000);
  }

  private callFireworksController(time: number): void {
    setTimeout(() => {
      this.avatarService.startFireworks(this.avatarList).subscribe(
        response => console.log(response),
        error => console.log(error)
      );
    }, time);
  }

  ngOnDestroy(): void {
    this.obs.unsubscribe();
  }

  /**
   * Subscribe to the client broker.
   * Return the current status of the batch.
   */
  private initProgressWebSocket = () => {
    this.obs = this.progressWebsocketService.getObservable();
    this.obs.subscribe({
      next: this.onNewProgressMsg,
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  /**
   * Apply result of the java server notification to the view.
   */
  private onNewProgressMsg = (receivedMsg: { type: string; message: any; }) => {
    if (receivedMsg.type === 'SUCCESS') {
      if (receivedMsg.message instanceof Object) {
        this.displayAvatar(receivedMsg.message);
      } else {
        this.displayTime(receivedMsg.message);
      }
    }
  }

  display(x: number, y: number, avatar: any): boolean {
    if (avatar.x === x && avatar.y === y) {
      return true;
    }
    return false;
  }

  display2(x: number, y: number, avatars: Avatar[]): string | undefined {
    if (avatars !== undefined) {
      const found = avatars.find(element => element.y === y && element.x === x);

      if (found !== undefined) {
        return found.image;
      }
    }
    return '../assets/images/vide.png';
  }

  displayTime(second: number): void {
    const hours = Math.floor(second / 60 / 60);
    const minutes = Math.floor(second / 60) - (hours * 60);
    const seconds = second % 60;
    this.timer = hours + 'h :' + minutes + 'm :' + seconds + 's';
  }

  displayAvatar(listAvatar: any): void {
    this.avatarList = (listAvatar as Avatar[]);
    console.log(this.avatarList);
  }
}
