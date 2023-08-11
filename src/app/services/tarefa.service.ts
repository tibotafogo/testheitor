import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  private tarefas: Tarefa[] = [];

  constructor() { }

  public getTarefas(): Tarefa[]{
    return this.tarefas;
  }

  public addTarefas(value: string, date: string){
    date = date.replace("-", "/");
    let tarefa: Tarefa = {value: value, date: new Date(date), done: false};
    this.tarefas.push(tarefa);
    this.SetStorage();
    console.log(this.tarefas);
  }
  //
  public removeTarefas( index:number){
    this.tarefas.splice(index, 1 );
    this.SetStorage();
  }
  public alterarTarefas(index:number, value:string, date:string){
  let tarefa: Tarefa = this.tarefas[index]
  tarefa.value = value;
  date = date.replace("-", "/");
  tarefa.date = new Date(date);
  this.tarefas.splice (index, 1, tarefa);
  this.SetStorage();
}

public async SetStorage() {
  await Preferences.set({
    key: 'tarefas',
    value: JSON.stringify(this.tarefas)
  });
  }
  public async getFromStorage(){
    const storeData = await Preferences.get({key: 'tarefas'});
    if(storeData.value){
      this.tarefas = JSON.parse(storeData.value);
    }else{
      this.tarefas = []
    }
  }
}
interface Tarefa{
  value: string;
  date: Date;
  done?:boolean;
}