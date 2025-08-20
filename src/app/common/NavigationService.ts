export class NavigationService<T>{
   
   itemsArr:Array<T>
   selectedPage:number
   pageSize:number

   constructor(arr:Array<T>){
     this.itemsArr=arr
     this.selectedPage=1
     this.pageSize=5
   }
   
   getMaxPageNumber():number{

    if(this.itemsArr.length % this.pageSize==0)
      return Math.trunc(this.itemsArr.length/this.pageSize)
    else
      return Math.trunc(this.itemsArr.length/this.pageSize)+1
  }

  pageForward(){
    if(this.selectedPage<=this.getMaxPageNumber()-1)
      this.selectedPage=this.selectedPage+1
  }

  pageBackward(){
    if(this.selectedPage>1)
      this.selectedPage=this.selectedPage-1
  }

  isRowVisible(index:number):boolean{
    
    if(Math.trunc(index/this.pageSize)==this.selectedPage-1)
      return true
    else
      return false
  }
}