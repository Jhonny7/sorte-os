import { Observable, Subject } from "rxjs";

export let subjects:any = {};
export let subscriptions:any = {};

export class EventService {
  static send = (topic:string, data:any) => {
    if (!subjects[topic]) {
      subjects[topic] = new Subject();
      window.addEventListener(topic, (data:any) => {
        subjects[topic].next(data.detail);
      });
    }
    window.dispatchEvent(new CustomEvent(topic, { detail: data }));
  };

  static get(topic:string): Observable<any> {
    if (!subjects[topic]) {
      subjects[topic] = new Subject();
      window.addEventListener(topic, (data:any) => {
        subjects[topic]?.next(data.detail);
      });
    }
    return subjects[topic].asObservable();
  };

  static clearSubjects = (properties:any) => {
    if (properties) {
      let propertyTags = Object.keys(properties);
      for (let property of propertyTags) {
        if (subscriptions[property]) {
          subscriptions[property].unsubscribe();
        }
      }
    }
  };
}

export default EventService;
