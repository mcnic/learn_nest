import { Injectable } from "@nestjs/common";

@Injectable()
export default class AppService {
  getUsers() {
    return [
      { id: 1, b: 22 },
      { id: 2, b: 33 },
    ];
  }
}
