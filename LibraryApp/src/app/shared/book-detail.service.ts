import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http"
import { environment } from 'src/environments/environment.development';
import { BookDetail } from './book-detail.model';
import { BookAdd } from './book-add.Model';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class BookDetailService {

  url:string = environment.apiBaseUrl+'/Books'
  list: BookDetail[] = [];
  item: BookDetail
  formData: BookDetail = new BookDetail()
  formSubmitted:boolean = false;
  constructor(private http: HttpClient) { }

  refreshList(){
    this.http.get(this.url).subscribe({next:res=>{
      this.list = res as BookDetail[]
    },error: err => {console.log(err)}})
  }

  postBookDetail(){
    return this.http.post(this.url,this.formData)
  }

  putBookDetail(){
    return this.http.put(this.url+'/'+this.formData.id,this.formData)
  }

  deleteBookDetail(id: number){
    return this.http.delete(this.url+'/'+id)
  }

  resetForm(form:NgForm){
    form.form.reset()
    this.formData = new  BookDetail()
    this.formSubmitted = false;
  }
}
