import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent {


  public customerForm: FormGroup = new FormGroup({})

  constructor(private fb: FormBuilder, private router: Router, private alertController: AlertController
    , private toastController: ToastController
  ) {
    this.customerForm = this.fb.group({
      dob: ['']
    });
  }

  formatDate(isoDate: string): string {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  isDatePickerOpen = false;
  formattedDate = '';

  openDatePicker() {
    this.isDatePickerOpen = true;
  }

  closeDatePicker() {
    this.isDatePickerOpen = false;
  }

  onDateSelected(event: any) {
    this.formattedDate = this.formatDate(event.detail.value);
    this.customerForm.get('dob')?.setValue(this.formattedDate);
    this.closeDatePicker()
  }

  logout() {
    this.router.navigate(['']);
  }

  ngOnInit() {
    this.customerForm = this.setForm({});
  }

  public mobileRegex = new RegExp(/^((\\+91-?)|0)?[0-9]{1,10}$/);
  public emailRegex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
  setForm(customerRequest: any) {
    return new FormGroup({
      name: new FormControl(customerRequest.name, Validators.compose([Validators.required])),
      phone: new FormControl(customerRequest.phone, [Validators.required, Validators.pattern(this.mobileRegex)]),
      email: new FormControl(customerRequest.email, Validators.pattern(this.emailRegex)),
      state: new FormControl(customerRequest.state),
      dob: new FormControl(customerRequest.dob),
      gender: new FormControl(customerRequest.gender),
      isLive: new FormControl(customerRequest.isLive)

    })

  }

  states = ['Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar',
    'Chandigarh', 'Chhattisgarh', 'Delhi (NCR)', 'Dadra and Nagar Haveli and Daman and Diu',
    'Gujarat', 'Goa', 'Haryana', 'Himachal Pradesh', 'J&K', 'Jharkhand', 'Karnataka', 'Kerala',
    'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Nagaland', 'Orissa', 'Punjab',
    'Rajasthan', 'Tamilnadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ]
  genders = ['Male', 'Fmale', 'Others']
  records: any[] = [];
  showDatePicker = false; // Control visibility of the date picker

  toggleDatePicker() {
    this.showDatePicker = !this.showDatePicker;
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color, // 'success' color for success messages
    });
    toast.present();
  }

  async onSubmit() {

    const data = {
      name: this.customerForm.value['name'],
      phone: this.customerForm.value['phone'],
      email: this.customerForm.value['email'],
      state: this.customerForm.value['state'],
      dob: this.customerForm.value['dob'],
      gender: this.customerForm.value['gender'],
      isLive: this.customerForm.value['isLive']
    }

    this.records.push(data);
    this.customerForm = this.setForm({});
    await this.presentToast('Record successfully saved', 'success');
  }



  updateFlag: boolean = false
  index: number = 0

  editRecord(index: number, record: any) {
    this.updateFlag = true
    this.index = index
    console.log(this.index)
    this.customerForm = this.setForm(record);
  }

  async update() {
    const data = {
      name: this.customerForm.value['name'],
      phone: this.customerForm.value['phone'],
      email: this.customerForm.value['email'],
      state: this.customerForm.value['state'],
      dob: this.customerForm.value['dob'],
      gender: this.customerForm.value['gender'],
      isLive: this.customerForm.value['isLive']
    };
    this.records[this.index] = data;
    this.updateFlag = false;
    this.customerForm = this.setForm({});
    await this.presentToast('Record successfully updated', 'success');
  }

  filteredStates = [...this.states]; // Copy of states for filtering

  filterStates(event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredStates = this.states.filter((state) =>
      state.toLowerCase().includes(query)
    );
  }

  filteredGender = [...this.genders]; // Copy of states for filtering

  filterGenders(event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredGender = this.genders.filter((gender) =>
      gender.toLowerCase().includes(query)
    );
  }

  onStateChange(event: any) {
    if (this.customerForm.value['state'] === event.detail.value) {
      this.customerForm.value['state'] = ''; // Deselect if clicked again
    }
  }


  onGenderChange(event: any) {
    if (this.customerForm.value['gender'] === event.detail.value) {
      this.customerForm.value['gender'] = ''; // Deselect if clicked again
    }
  }



  // Function to handle delete action
  async deleteRecord(index: any) {
    this.records.splice(index, 1);  // Remove the record from the array
    await this.presentToast('Record successfully Deleted', 'success');
  }

  async confirmDelete(index: number) {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this record?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Delete cancelled');
          },
        },
        {
          text: 'Yes',
          handler: () => {
            this.deleteRecord(index);
          },
        },
      ],
    });

    await alert.present();
  }



}
