import { Observable } from 'tns-core-modules/data/observable';
import { KinveyList } from 'nativescript-kinvey-list';

export class HelloWorldModel extends Observable {
  public message: string;
  private kinveyList: KinveyList;

  constructor() {
    super();

    this.kinveyList = new KinveyList();
    this.message = this.kinveyList.message;
  }
}
