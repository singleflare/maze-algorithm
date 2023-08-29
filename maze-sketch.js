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

function Cell(colLocation,rowLocation){
  this.colLocation=colLocation
  this.rowLocation=rowLocation
  this.wall=[true,true,true,true]

  this.show=function(){
    var x=this.colLocation*cellLength
    var y=this.rowLocation*cellLength
    stroke(255)
    line(x,y,x+cellLength,y)
    line(x+cellLength,y,x+cellLength,y+cellLength)
    line(x+cellLength,y+cellLength,x,y+cellLength)
    line(x,y+cellLength,x,y)
  }
}