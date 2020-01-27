import { Component, OnInit, OnDestroy } from '@angular/core';
import { Contact} from '../contact.model';
import { ContactsService } from '../contacts.service';
import { Subscription } from 'rxjs';
// import { Router } from '@angular/router';
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit , OnDestroy {
  contacts: Contact[] = [];
  isLoading = false;
  private contactsSub: Subscription;

  constructor(private contactsService: ContactsService) { }

  ngOnInit() {
    this.isLoading = true;
    this.contactsService.getContacts();
    this.contactsSub = this.contactsService.getContactUpdateListener()
      .subscribe((contacts: Contact[]) => {
        this.isLoading = false;
        this.contacts = contacts;
      });
  }

  onDelete(contId: string) {
   // this.isLoading = true;
    this.contactsService.deleteContact(contId);
  // this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.contactsSub.unsubscribe();
  }
}
