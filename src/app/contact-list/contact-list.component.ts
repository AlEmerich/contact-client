import { ContactService } from '../contact.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  contacts: Array<any>;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contactService.getAll().subscribe(data => {
      this.contacts = data;
    })
  }

}
