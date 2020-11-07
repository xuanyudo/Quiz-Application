import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Question, QuestionService } from '../question.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  public idx:number;
  public cur_question:Question;
  public hasNextQuestion:boolean;
  public finished:boolean;
  public checked:string="checked";
  public invalid:boolean = false;
  public correct:number = 0;

  constructor(private questionService:QuestionService) { }
  questions:Question[] = [];
  ngOnInit(): void {
    this.questionService.loadQuestion().subscribe(data=>{
      this.questions=data;
      console.log(this.questions);
      this.idx = -1;
      this.hasNextQuestion=true;
      this.finished = false;
      this.nextQuestion();
    });
  }
  nextQuestion():void{
    if(this.idx<this.questions.length-1){
      this.cur_question = this.questions[++this.idx];
      if(this.idx==this.questions.length-1){
        this.hasNextQuestion=false;
      }
    }else{
      this.finished = true;
    }
    return;
  }
  previous():void{
      this.invalid = false;
      this.cur_question = this.questions[--this.idx];
      this.correct--;
    
  }
  checkAns(obj):void{
    if(obj[this.cur_question.id]!="" && obj[this.cur_question.id]!=undefined){
      this.cur_question.selected = obj[this.cur_question.id];
      if(`${this.cur_question.selected}`==`${this.cur_question.answer}`){
        this.correct++;
      }
      this.nextQuestion();
      this.invalid = false;
    }else{
      this.invalid = true;
    }
    console.log(obj);
  }
  verSelect(idx):boolean{
    console.log(this.cur_question.selected)
    return this.cur_question.selected==idx;
  }
  resetAll():void{
    this.finished = false;
    this.idx = -1;
    this.hasNextQuestion = true;
    for(let question of this.questions){
      question.selected = 0;
    }
    this.nextQuestion();
  }
  

}
