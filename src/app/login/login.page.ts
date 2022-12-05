import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public numcontrol: string;
  public nip: string;
  public students: Student[];

  constructor(private router: Router, private studentService: StudentService, private alertController: AlertController) {

    this.studentService.getStudents().subscribe(res => {
      this.students = res;
      console.log(this.students);
    });

    this.numcontrol = ""
    this.nip = ""
  }

  ngOnInit() {
  }

  public letmein() {
    let item: Student;
    item = this.students.find((students) => {
      return students.controlnumber == this.numcontrol;
    });

    if(item === undefined){
      this.presentAlert();
      return
    }
    
    if (this.nip != '') {
      let nip2: number;
      nip2 = parseInt(this.nip)

      
      if (item.nip == nip2 && item.controlnumber === 'ADMIN') {
        this.router.navigate(
          ['/home']
        );
        return
      }
      
      if (item.nip == nip2) {
        this.getStudentByControlNumber(item.id)
      } else {
        this.presentAlert();
      }

    } else {
      this.presentAlert();
    }
  }

  public getStudentByControlNumber(cn: string): void {
    this.router.navigate(
      ['/view-student'],
      {
        queryParams: { id: cn }
      }
    );

  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Atención!',
      subHeader: 'Usuario y/o contraseña incorrectas.',
      message: 'Favor de ingresar un usuario existente.',
      buttons: ['OK'],
    });

    await alert.present();
  }
}


