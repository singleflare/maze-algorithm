var cols,rows
var cellLength=50
var grid=[] //conntains Cell objects
var current
var stack=[]

function setup(){
  createCanvas(900,900)
  cols=floor(width/cellLength)
  rows=floor(height/cellLength)
  console.log(width+' '+height+' '+cols+' '+rows+' ')
  frameRate(10)
  for(var j=0;j<rows;j++){
    for(var i=0;i<cols;i++){
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
  current.highlight()
  // start=Cell(0,0)
  // end=Cell(width/cellLength,height/cellLength)
  // start.highlight()
  // end.highlight()
  console.log(current.i+' '+current.j)
  var next=current.checkNeighbors()
  if(next){
    next.visited=true
    stack.push(current)
    removeWall(current,next)
    current=next
  }
  else if(stack.length>0) current=stack.pop()
}

function index(i,j){
  if(i<0||j<0||i>cols-1||j>rows-1) return -1 //array with index<0 is undefined
  return i+j*cols
}

function removeWall(current,next){//parameters: Cell
  var x=current.i-next.i
  if(x==1){//current is on the right: remove current's left wall and next's right wall
    current.wall[3]=false
    next.wall[1]=false
  }
  else if(x==-1){//current is on the left: remove current's right wall and next's left wall
    current.wall[1]=false
    next.wall[3]=false
  }
  var y=current.j-next.j
  if(y==1){//current is below: remove current's top wall and next's bot wall
    current.wall[0]=false
    next.wall[2]=false
  }
  else if(y==-1){//current is above: remove current's bot wall and next's top wall
    current.wall[2]=false
    next.wall[0]=false
  }
}

function Cell(i,j){ //i: column coordinate (to the right), j: row coordinate (go down)
  this.i=i
  this.j=j
  this.wall=[true,true,true,true] //top,right,bot,left wall
  this.visited=false

  this.checkNeighbors=function(){//return a random neighbor
    var neighbors=[]

    var top=grid[index(i,j-1)]
    var right=grid[index(i+1,j)]
    var bot=grid[index(i,j+1)]
    var left=grid[index(i-1,j)]

    if(top&&!top.visited) neighbors.push(top)
    if(right&&!right.visited) neighbors.push(right)
    if(bot&&!bot.visited) neighbors.push(bot)
    if(left&&!left.visited) neighbors.push(left)

    if(neighbors.length>0) return neighbors[floor(random(0,neighbors.length))]
    else return undefined
  }

  this.highlight=function(){
    var x=this.i*cellLength
    var y=this.j*cellLength
    noStroke()
    fill(255,0,0,100)
    rect(x,y,cellLength,cellLength)
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
    
    if(this.visited){
      noStroke()
      fill(255,0,255,100)
      rect(x,y,cellLength,cellLength)
    }
  }
}