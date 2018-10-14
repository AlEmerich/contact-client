import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  public api = '//localhost:8080';
  public contacts_api = this.api + '/contacts';

  constructor(private http: HttpClient)
  {

  }

  getAll(): Observable<any>
  {
    return this.http.get(this.contacts_api + '/all');
  }

  get(id: string)
  {
    return this.http.get(this.contacts_api + '?id=' + id);
  }

  save(contact: any): Observable<any>
  {
    let result: Observable<Object>;
    if(contact['href'])
    {
      result = this.http.put(contact.href, contact);
    }
    else
    {
      result = this.http.post(this.contacts_api, contact);
    }
    return result;
  }

  remove(href: string): Observable<any>
  {
    return this.http.delete(href);
  }
}
