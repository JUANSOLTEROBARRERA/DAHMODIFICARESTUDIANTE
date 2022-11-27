import { Injectable } from '@angular/core';
import { Student } from "../models/student";
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore' 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private students: Student[];

  constructor(private firestore: AngularFirestore) {
    this.students = [];
  }

  public getStudents() : Observable<Student[]> {
  //public getStudents() {
    //return this.students;
    return this.firestore.collection('students').snapshotChanges().pipe(
      map(actions => {
        return actions.map (a=>{
            const data = a.payload.doc.data() as Student;
            const id = a.payload.doc.id;
            return { id, ...data };
        });
      })
    );
  }

  public removeStudent(pos: number): Student[]{
    this.students.splice(pos, 1);
    return this.students;
  }

  public getStudentByControlNumber(controlnumber: string): Student {
    let item: Student = this.students.find((student)=> {
      return student.controlnumber===controlnumber;
    });
    return item;
  }

  public newStudent(student: Student): Student[] {
    this.students.push(student);
    return this.students;
  }

}
