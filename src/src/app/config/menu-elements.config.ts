import {RoutingConfig} from "./routing.config";
import {PathUtils} from "../core/utils/path.utils";
import {MenuElementData} from "../core/data/menu-element.data";

export const menuElements: MenuElementData[] = [
  {name: 'dashboard', href: PathUtils.concatPath(RoutingConfig.home)},
  {name: 'tasks', href: PathUtils.concatPath(RoutingConfig.tasks)},
  {name: 'addTask', href: PathUtils.concatPath(RoutingConfig.tasks, RoutingConfig.create)},
  {name: 'alarms', href: PathUtils.concatPath(RoutingConfig.alarms)},
  {name: 'addAlarm', href: PathUtils.concatPath(RoutingConfig.alarms, RoutingConfig.create)},
  {name: 'notes', href: PathUtils.concatPath(RoutingConfig.notes)},
  {name: 'bookmarks', href: PathUtils.concatPath(RoutingConfig.bookmarks)}
];
