import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactsService } from '../contacts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.css']
})
export class ContactCreateComponent implements OnInit {
  contact: Contact;
  isLoading = false;
  private mode = 'create';
  private contId: string;
  AddContForm: FormGroup;
  submitted = false;

  // tslint:disable-next-line: typedef-whitespace
  constructor(private formBuilder: FormBuilder , private contactsService : ContactsService ,  public route: ActivatedRoute ) { }

  ngOnInit() {
  // Form Validation
    this.AddContForm = this.formBuilder.group({
      name:  ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]]
 });
    // Load when Update Record
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('contId')) {
        this.mode = 'edit';
        this.contId = paramMap.get('contId');
        this.isLoading = true;
        this.contactsService.getContact(this.contId).subscribe(contData => {
          this.isLoading = false;
          this.contact = {id: contData._id, name: contData.name, email: contData.email, phone: contData.phone};
        });
      } else {
        this.mode = 'create';
        this.contId = null;
      }
    });
    // this.route.paramMap.subscribe((paramMap: ParamMap) => {
    //   if (paramMap.has('contId')) {
    //     this.mode = 'edit';
    //     this.contId = paramMap.get('postId');
    //     this.isLoading = true;
    //     this.contactsService.getContact(this.contId).subscribe(contData => {
    //       this.isLoading = false;
    //       this.contact = {
    //         id: contData._id,
    //         name: contData.name,
    //         email: contData.email,
    //         phone: contData.phone,
    //         // creator: contData.creator
    //       };
    //       this.AddContForm.setValue({
    //         name: this.contact.name,
    //         email: this.contact.email,
    //         phone: this.contact.phone
    //       });
    //     });
    //   } else {
    //     this.mode = 'create';
    //     this.contId = null;
    //   }
    // });

  }

      // convenience getter for easy access to form fields
      get f() { return this.AddContForm.controls; }
  onAddContact() {
    if (this.AddContForm.invalid) {
      return;
    }
    this.isLoading = true;
    // tslint:disable-next-line: no-conditional-assignment
    if (this.mode = 'create') {
      this.contactsService.addContact(this.AddContForm.value.name, this.AddContForm.value.email, this.AddContForm.value.phone );
    } else {
      this.contactsService.updateContact(
        this.contId,
        this.AddContForm.value.name,
        this.AddContForm.value.email,
        this.AddContForm.value.phone

      );
    }
    this.AddContForm.value.resetForm();
  }

  }








/////////////////
// onAddContact() {

// this.submitted = true;
//     this.isLoading = true;
//     // stop here if form is invalid
//     if (this.AddContForm.invalid) {
//         return;
//     }
//     if (this.mode === 'create') {
//       this.contactsService.addContact(this.AddContForm.value.name,
//          this.AddContForm.value.email,
//          this.AddContForm.value.phone);
//     } else {
//       this.contactsService.updateContact(
//         this.contId,
//         this.AddContForm.value.name,
//         this.AddContForm.value.email,
//         this.AddContForm.value.phone
//       );
//     }
   // this.AddContForm.value.resetForm();
   // }
////////////////
