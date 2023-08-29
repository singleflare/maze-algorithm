var cols,rows
var cellLength=40
var grid=[] //conntains Cell objects
var current

function setup(){
  createCanvas(400,400)
  cols=floor(width/cellLength)
  rows=floor(height/cellLength)

  for(var j=0;j<rows;i++){
    for(var i=0;i<cols;j++){
      var cell=new Cell(i,j)
      grid.push(cell)
    }
  }
  current=grid[0] //current is now a Cell object
}

function draw(){
  background(51)
  for(var i=0;i<grid.length;i++){
    grid[i].show()
  }
  current.visited=true
}

function index(i,j){
  if(i<0||j<0||i>cols-1||j>rows-1) {return -1} //array with index<0 is undefined
  return i+j*cols
}

function Cell(i,j){ //i: column coordinate (to the right), j: row coordinate (go down)
  this.i=i
  this.j=j
  this.wall=[true,true,true,true] //top,right,bot,left wall
  this.visited=false

  this.checkNeighbors=function(){
    var neighbors=[]

    var top=grid[index(i,j-1)]
    var right=grid[index(i+1,j)]
    var bot=grid[index(i,j+1)]
    var left=grid[index(i-1,j)]

    if(top&&!top.visited) neighbors.push(top)
    if(right&&!right.visited) neighbors.push(right)
    if(bot&&!bot.visited) neighbors.push(bot)
    if(left&&!left.visited) neighbors.push(left)
  }

  this.show=function(){
    //define cell size in pixel
    var x=this.i*cellLength
    var y=this.j*cellLength

    //draw walls
    stroke(255)
    if(this.wall[0]) line(x,y,x+cellLength,y)
    if(this.wall[1]) line(x+cellLength,y,x+cellLength,y+cellLength)
    if(this.wall[2]) line(x+cellLength,y+cellLength,x,y+cellLength)
    if(this.wall[3]) line(x,y+cellLength,x,y)
    if(neighbors.length()>0) return neighbors[floor(random(0,neighbors.length))]
    else return undefined
  }
}