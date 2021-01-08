import { ResourceType } from "./resource-type.enum";

export class ChangeRequest {
  constructor (public username: string, public firstName: string, public lastName: string, public resourceId: number, public reason: string, public type: ResourceType)
  {
  }
}
