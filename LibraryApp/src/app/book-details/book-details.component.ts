import { Component, OnInit } from '@angular/core';
import { BookDetailService } from '../shared/book-detail.service';
import { BookDetail } from '../shared/book-detail.model';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit{

  constructor(public service:BookDetailService, private toastr:ToastrService){}

  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(selectedRecord:BookDetail)
  {
    this.service.formData= Object.assign({},selectedRecord);
  }

  onDelete(id:number){
    if(confirm('Are you sure to delete this record?'))
    this.service.deleteBookDetail(id).subscribe({ next: res => {
      this.service.list = res as BookDetail[]
      this.toastr.error('Deleted successfully', 'Library Application')
     },
     error: err => {console.log(err)}
   })
  }
}
