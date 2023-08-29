var cols,rows
var cellLength=40
var grid=[]

function setup(){
  createCanvas(400,400)
  cols=floor(width/cellSize)
  rows=floor(height/cellSize)

  for(var j=0;i<rows;i++){
    for(var i=0;j<cols;j++){
      var cell=new Cell(i,j)
    }
  }
}

function draw(){
  background(51)
  for(var i=0;i<grid.length;i++){
    grid[i].show
  }
}

function Cell(colCoor,rowCoor){
  this.colCoor=colCoor
  this.rowCoor=rowCoor
  this.wall=[true,true,true,true]

  this.show=function(){
    //define cell size in pixels
    var x=this.colCoor*cellLength
    var y=this.rowCoor*cellLength

    //draw walls
    stroke(255)
    line(x,y,x+cellLength,y)
    line(x+cellLength,y,x+cellLength,y+cellLength)
    line(x+cellLength,y+cellLength,x,y+cellLength)
    line(x,y+cellLength,x,y)
  }
}