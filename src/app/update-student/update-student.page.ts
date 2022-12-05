import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.page.html',
  styleUrls: ['./update-student.page.scss'],
})
export class UpdateStudentPage implements OnInit {

  public student: Student;
  public myForm: FormGroup;
  public validationMessages: object;
  public updatedstudent: Student;
  public currentID: string;

  constructor(private router:Router, private fb: FormBuilder, private studentService: StudentService, private activatedRoute: ActivatedRoute) {
    this.student = {
      name: "",
      age: 0,
      career: "",
      controlnumber: "",
      email: "",
      photo: "",
      nip: 0,
      curp: "",
      id: ""
    };
  }

  public updateStudent(){
    this.updatedstudent = {
      controlnumber: this.myForm.controls.controlnumber.value,
      name: this.myForm.controls.name.value,
      curp: this.myForm.controls.curp.value,
      age: this.myForm.controls.age.value,
      nip: this.myForm.controls.nip.value,
      email: this.myForm.controls.email.value,
      career: this.myForm.controls.career.value,
      photo: this.myForm.controls.photo.value,
    }

    this.studentService.updateStudent(this.updatedstudent,this.currentID);

    this.router.navigate(['..']);
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.studentService.getStudentById(params.id).subscribe(item => {
        this.student = item as Student;
        console.log(item);
        this.currentID = params.id;

        this.myForm.controls.controlnumber.setValue(this.student.controlnumber)
        this.myForm.controls.name.setValue(this.student.name)
        this.myForm.controls.curp.setValue(this.student.curp)
        this.myForm.controls.age.setValue(this.student.age)
        this.myForm.controls.nip.setValue(this.student.nip)
        this.myForm.controls.email.setValue(this.student.email)
        this.myForm.controls.career.setValue(this.student.career)
        this.myForm.controls.photo.setValue(this.student.photo)
      });
    });


    this.myForm = this.fb.group({
      controlnumber:["", Validators.compose([Validators.minLength(8), Validators.required, Validators.pattern('^[0-9]+$')])],
      name:["", Validators.required],
      curp:["", Validators.compose([Validators.required, Validators.pattern('^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$')])],
      age:[0, Validators.compose([Validators.required, Validators.min(17)])],
      nip:[0, Validators.compose([Validators.required, Validators.min(10)])],
      email:["", Validators.compose([Validators.required, Validators.email])],
      career:["", Validators.required],
      photo:["", Validators.compose([Validators.required])]
    });

    this.validationMessages = {
      'controlnumber': [
        { type: 'required', message: "Debe capturar el número de control"},
        { type: 'minlength', message: "El número de control parece estar mal formado"},
        { type: 'pattern', message: "El número de control debe contener sólo números"}
      ],
      'name': [
        { type: 'required', message: "Debe capturar el nombre"}
      ],
      'curp': [
        { type: 'required', message: "Debe capturar la CURP"},
        { type: 'pattern', message: "La CURP parece estar mal formada"}
      ],
      'age': [
        { type: 'required', message: "Debe capturar la edad"},
        { type: 'min', message: "La edad es incorrecta"}
      ],
      'nip': [
        { type: 'required', message: "Debe capturar el NIP"},
        { type: 'min', message: "El NIP debe ser mayor a 9"}
      ],
      'email': [
        { type: 'required', message: "Debe capturar el email"},
        { type: 'email', message: "El email parece estar mal formado"}
      ],
      'career': [
        { type: 'required', message: "Debe capturar la carrera"}
      ],
      'photo': [
        { type: 'required', message: "Debe capturar la url de la fotografía"}
      ]
    }
  }

}
