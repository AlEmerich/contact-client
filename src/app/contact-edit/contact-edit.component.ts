import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../contact.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})

export class ContactEditComponent implements OnInit, OnDestroy {

  contact: any = {};

  sub: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private contactService: ContactService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params["id"];
      if(id) {
        this.contactService.get(id).subscribe((contact: any) => {
          if(contact)
          {
            this.contact = contact;
            this.contact.href = contact._links.self.href;
          }
          else
          {
            console.log("Contact with '${id}' not found, returning to list");
            this.goToList();
          }
        })
      }
    })
  }

  ngOnDestroy()
  {
    this.sub.unsubscribe();
  }

  goToList()
  {
    this.router.navigate(['contact-list']);
  }

  save(form: NgForm)
  {
    this.contactService.save(form).subscribe(result => {
      this.goToList();
    }, error => console.error(error));
  }

  remove(href)
  {
    this.contactService.remove(href).subscribe(result => {
      this.goToList();
    }, error => console.error(error));
  }
}
