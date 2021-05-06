import { Controller, Get } from "@nestjs/common";
import AppService from "./app.service";

@Controller("/api")
export default class AppController {
  constructor(private appService: AppService) {
    this.appService = appService;
  }

  @Get("/users")
  getUsers() {
    return this.appService.getUsers();
  }
}
