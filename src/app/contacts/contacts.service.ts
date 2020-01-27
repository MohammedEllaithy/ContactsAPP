import { Injectable } from '@angular/core';
import { Contact } from '../contacts/contact.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private http: HttpClient, private router: Router) {}

  private contacts: Contact[] = [];
  private contactsUpdated = new Subject<Contact[]>();

  getContacts() {
    this.http
      .get<{ message: string; conts: any }>('http://localhost:5000/contacts/mycont')
      .pipe(
        map(contactData => {
          return contactData.conts.map(cont => {
            return {
              name: cont.name,
              email: cont.email,
              phone: cont.phone,
              id: cont._id
            };
          });
        })
      )
      .subscribe(transformedData => {
        this.contacts = transformedData;
        this.contactsUpdated.next([...this.contacts]);
      });
  }

  getContact(id: string) {
    return this.http.get<{ _id: string; name: string; email: string, phone: string }>(
      'http://localhost:5000/contacts/' + id
    );
  }
  getContactUpdateListener() {
    return this.contactsUpdated.asObservable();
  }

  addContact( name: string, email: string , phone: string) {

    // tslint:disable-next-line: object-literal-shorthand
    const cont: Contact = {id: null , name: name, email: email , phone: phone};
    this.http
  .post<{ message: string; contId: string }>(
    'http://localhost:5000/contacts/add', cont)
  .subscribe(responseData => {
    const id = responseData.contId;
    cont.id = id;
    this.contacts.push(cont);
    this.contactsUpdated.next([...this.contacts]);
    this.router.navigate(['/']);
  });





  }
  // Update Contact
  updateContact(id: string, name: string, email: string , phone: string) {
    // tslint:disable-next-line: object-literal-shorthand
    const contact: Contact = { id: id, name : name, email : email, phone: phone };
    this.http
      .put('http://localhost:3000/contacts/' + id, contact)
      .subscribe(response => {
        const updatedContacts = [...this.contacts];
        const oldPostIndex = updatedContacts.findIndex(p => p.id === contact.id);
        updatedContacts[oldPostIndex] = contact;
        this.contacts = updatedContacts;
        this.contactsUpdated.next([...this.contacts]);
        this.router.navigate(['/']);
      });
  }

  // Delete Contact

  deleteContact(contactId: string) {
    return  this.http
        .delete('http://localhost:5000/contacts/cont/' + contactId)
        .subscribe(() => {
          const updatedContacts = this.contacts.filter(contact => contact.id !== contactId);
          this.contacts = updatedContacts;
          this.contactsUpdated.next([...this.contacts]);
          this.router.navigate(['/']);

        });
    // this.getContacts();
  }
}
