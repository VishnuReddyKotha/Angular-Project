import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BookDetail } from 'src/app/shared/book-detail.model';
import { BookDetailService } from 'src/app/shared/book-detail.service';

@Component({
  selector: 'app-book-detail-form',
  templateUrl: './book-detail-form.component.html',
  styleUrls: ['./book-detail-form.component.css']
})
export class BookDetailFormComponent {

  constructor(public service: BookDetailService, private toastr:ToastrService){

  }

  onSubmit(form:NgForm){
    this.service.formSubmitted = true;
    if(form.valid){
      if(this.service.formData.id==0)
        this.insertRecord(form)
      else
      this.updateRecord(form)
  }
    
  }

  insertRecord(form: NgForm){
    this.service.postBookDetail().subscribe({ next: res => {
      this.service.list = res as BookDetail[]
      this.service.resetForm(form)
      this.toastr.success('Inserted successfully', 'Library Application')
      this.service.refreshList();
     },
     error: err => {console.log(err)}
   })
   this.service.refreshList();
  }

  updateRecord(form: NgForm)
  {
     this.service.putBookDetail().subscribe({ next: res => {
      this.service.item = res as BookDetail
      this.service.resetForm(form)
      this.toastr.info('Updated successfully', 'Library Application')
      this.service.refreshList();
     },
     error: err => {console.log(err)}
   })
   this.service.refreshList();

  }

  resetPage(form: NgForm)
   {
      this.service.resetForm(form)
   }

}
