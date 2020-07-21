import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
  RouteReuseStrategy
} from '@angular/router';

@Injectable()
export class RouteReuseService implements RouteReuseStrategy {
  private storedRoutes = new Map<string, DetachedRouteHandle>();

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return route.routeConfig?.data?.reuse;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    this.storedRoutes.set(this.getUrl(route), handle);
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return this.storedRoutes.has(this.getUrl(route));
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    return this.storedRoutes.get(this.getUrl(route));
  }

  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    current: ActivatedRouteSnapshot
  ): boolean {
    return future.routeConfig === current.routeConfig;
  }

  private getUrl(route: ActivatedRouteSnapshot) {
    return route.pathFromRoot.map(path => path.routeConfig?.path).join('-');
  }
}
