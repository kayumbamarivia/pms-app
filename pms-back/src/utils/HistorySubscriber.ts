import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
  RemoveEvent,
  EntityManager,
} from "typeorm";
import { History } from "../models/History.ts";
import { User } from "../models/User.ts";
import { Action } from "../enums/Action.ts";

interface RequestContext {
  currentUserEmail?: string;
  actionEmail?: string;
  actionType?: string;
}

const requestContext: RequestContext = {};

@EventSubscriber()
export class HistorySubscriber implements EntitySubscriberInterface {
  listenTo() {
    return User;
  }

  async afterInsert(event: InsertEvent<any>) {
    await this.logHistory(event.manager, {
      entityType: event.metadata.name,
      entityId: event.entity?.id?.toString() ?? "unknown",
      action: Action.CREATE
    });
  }

  async afterUpdate(event: UpdateEvent<any>) {
    await this.logHistory(event.manager, {
      entityType: event.metadata.name,
      entityId: event.entity?.id?.toString() ?? "unknown",
      action: Action.UPDATE
    });
  }

  async afterRemove(event: RemoveEvent<any>) {
    await this.logHistory(event.manager, {
      entityType: event.metadata.name,
      entityId: event.entityId?.toString() ?? "unknown",
      action: Action.DELETE
    });
  }

  private async logHistory(manager: EntityManager, data: Partial<History>) {
    const history = new History();
    history.entityType = data.entityType ?? "unknown";
    history.entityId = data.entityId ?? "unknown";
    history.action = data.action ?? Action.CREATE;
    history.actorEmail =
      requestContext.actionEmail ??
      requestContext.currentUserEmail ??
      (requestContext.actionType ? `${requestContext.actionType}_anonymous` : "anonymous");

    await manager.save(History, history);
  }

  static setCurrentUserEmail(email: string) {
    requestContext.currentUserEmail = email;
  }

  static setActionContext(email: string, actionType: string) {
    requestContext.actionEmail = email;
    requestContext.actionType = actionType;
  }

  static clearActionContext() {
    requestContext.actionEmail = undefined;
    requestContext.actionType = undefined;
  }
}