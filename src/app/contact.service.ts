import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  save(contact: any, id: string): Observable<any>
  {
    let result: Observable<Object>;
    let headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200/*',
        'Access-Control-Allow-Methods': 'HEAD,GET,POST,PUT,PATCH,DELETE,OPTIONS'
      }
    );

    console.log(this.contacts_api, contact);
    if(id)
    {
      result = this.http.put(
        this.contacts_api + "?id=" + id,
        contact,
        { headers : headers, observe: "response" });
    }
    else
    {
      result = this.http.post(this.contacts_api,
                              contact,
                              { headers: headers, observe: "response"});
    }
    return result;
  }

  remove(contact: any): Observable<any>
  {
    return this.http.delete(this.contacts_api + "?id=" + contact.id);
  }
}
