import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
let axis = 50;
const convertStyle = () => {
  const height = window.innerHeight;
  document.getElementById('main').style.height = `${height}px`
  document.getElementById('gameBoard').style.height = `${height}px`;
  document.getElementById('controls').style.height = `${height}px`
  let piecesArr = document.getElementsByClassName('pieces')
  for(let p = 0; p < piecesArr.length; p++){
    piecesArr[p].style.height = `${height / axis}px`
    piecesArr[p].style.width = `${height / axis}px`
  }
  piecesArr = []
}
  
window.addEventListener("resize", convertStyle);
window.addEventListener("DOMContentLoaded", convertStyle);
class Square extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this)
  }
  
  handleClick(e){
    
    let changeMe = e.target.value 
    this.props.onClick(changeMe)
    console.log(changeMe)
  }
  render() {
   
    return (
      <button value={this.props.value} onClick={this.handleClick} className={this.props.className} style={{backgroundColor: this.props.myBackground}}></button>
    )
  }
}

class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      myArray: [],
      myBackground: [],
      myColor: 'black',
      mySize: 50,
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleTouch = this.handleTouch.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleChecked = this.handleChecked.bind(this)
    this.handleGrid = this.handleGrid.bind(this)
    this.handleClear = this.handleClear.bind(this)
  }
  handleClick(changeMe){
    let myBackground = this.state.myBackground.slice(0,this.state.mySize * this.state.mySize);
    myBackground[changeMe] = this.state.myColor
    let myArray = this.state.myArray.slice(0,this.state.mySize * this.state.mySize)
    this.setState({
      myBackground: myBackground,
      myArray: myArray,
      
    })
  }
  renderSquare(i){
    return <Square onClick={this.handleClick} myBackground={this.state.myBackground[i]} className="pieces" value={i} />
  }

  renderBoard(){
    
    for(let i = this.state.mySize * this.state.mySize -1; i >= 0; i--){
      this.state.myArray.unshift(this.renderSquare(i))
    }
    console.log(this.state.myArray)
    console.log(this.state.myBackground)
  }
  handleTouch(e){
    e.preventDefault()
    let touch = e.changedTouches[0]
    let startx
    let starty
    startx = touch.clientX
    starty = touch.clientY
    var zzz = document.elementFromPoint(startx, starty)
    this.handleClick(zzz.value)
    console.log(zzz.value)
  }
  handleChange(newColor) {
    this.setState({
      myColor: newColor
    })
  }
  handleChecked(gridStatus){
    if(gridStatus === 'gridOn'){
      let addBorder = document.getElementsByClassName('pieces')
      for(let i = 0; i < addBorder.length; i++){
        addBorder[i].style.border = '.5px dashed black'
      }
    } else if(gridStatus === 'gridOff'){
      let addBorder = document.getElementsByClassName('pieces')
      for(let i = 0; i < addBorder.length; i++){
        addBorder[i].style.border = 'none'
      }
    }
  }
  handleGrid(gridSize){
    let r = document.querySelector(':root')
    r.style.setProperty('--size', gridSize)
    axis = gridSize
    convertStyle()
    this.setState({
      mySize: gridSize
    })
    
  }
  handleClear() {
    let myBackground = this.state.myBackground.slice(0, this.state.mySize * this.state.mySize)
    for (let i = 0; i < this.state.mySize * this.state.mySize; i++){
      myBackground[i] = 'white'
    }
    this.setState({
      myBackground: myBackground
    })
  }
  render() {
    this.renderBoard()
    return (
      <div id="main">
        
      <div onTouchMove={this.handleTouch} id="gameBoard">
        {this.state.myArray.slice(0,this.state.mySize * this.state.mySize)}
      </div>
      <div id="controls">
      <Select  myColor={this.state.myColor} handleChange={this.handleChange} />
        <Sizing handleGrid={this.handleGrid} />
        <Grid handleChecked={this.handleChecked}/>
        <Clear handleClick={this.handleClear}/>
      </div>
      </div>
    )
  }
}

class Clear extends React.Component {
  render() {
    return (
      <button onClick={this.props.handleClick}>Clear</button>
    )
  }
}
class Sizing extends React.Component {
  constructor(props){
    super(props);
  this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e){
    let gridSize = e.target.value;
    console.log(gridSize)
    this.props.handleGrid(gridSize)
  }
  render() {
    return (
      <div>
        <h4>Grid Size:</h4>
      <div>
        <select onChange={this.handleChange}>
        <option value={50}>50x50</option>
          <option  value={10}>10x10</option>
          <option  value={20}>20x20</option>
          
        </select>
      </div>
      </div>
    )
  }
}

class Select extends React.Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this)
   
  }
  handleChange(e) {
    let newColor = e.target.value;
    this.props.handleChange(newColor)
  }
  
  render() {
    return (
      <div>
       
      <input id="select" type="color" value={this.props.myColor} onChange={this.handleChange} />
      
      </div>
      /*<select onChange={this.handleChange}>
        <option value="yellow">Yellow</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
      </select>*/
    )
  }
}

class Grid extends React.Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.handleChecked = this.handleChecked.bind(this)
  }
  handleChange(e) {
    let newColor = e.target.value;
    this.props.handleChange(newColor)
  }
  handleChecked(e){
    
    if(e.target.value === 'gridOn'){
      e.target.value = 'gridOff'
      e.target.style.border = '3px solid lightgrey'
      e.target.style.borderRadius = '10px'
      e.target.style.color = 'grey'
    } else {
      e.target.value = 'gridOn'
      e.target.style.border = '3px solid black'
      e.target.style.borderRadius = '10px'
      e.target.style.color = 'black'
    }
    let toggle = e.target.value;
    console.log(toggle)
    this.props.handleChecked(toggle)
    
  }
  render() {
    return (
      <div>
      <button id="gridToggle" value="gridOn" onClick={this.handleChecked}>Grid Toggle</button>
      </div>
      /*<select onChange={this.handleChange}>
        <option value="yellow">Yellow</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
      </select>*/
    )
  }
}




































/*class Square extends React.Component {
  render() {
    return (
      <button onTouchMove={this.props.onClick} style={{backgroundColor: this.props.myBackground[this.props.value]}} className={this.props.className} >{this.props.myBackground[this.props.value]}</button>
    )
  }
}
class Button extends React.Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e){
    let color = e.target.value
    console.log(e.target.value)
    this.props.onChange(color)
  }
  render() {
    return (
      <select className="noChange" onChange={this.handleChange}>
        <option value='green'>Green</option>
        <option value='yellow'>Yellow</option>
      </select>
    )
  }
}

class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      myArray: [],
      myBackground: [],
      newColor: 'green',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  myArray = []
  handleClick(i){
    this.state.myBackground[i] = this.state.newColor
    let myBackground = this.state.myBackground.slice(0, 400)
    let myArray = this.state.myArray.slice(400,800)
    
    this.setState({
      myBackground: myBackground,
      myArray: myArray,
    })
  }
  renderSquare(i){
    return (
      <Square onClick={() => this.handleClick(i)} myBackground={this.state.myBackground} className='piece' value={i}/>
    )
  }
 
  
  
  renderBoard(){
    
    for (let z = 0; z < 400; z++){
      this.state.myArray.push(this.renderSquare(z))
      this.state.myBackground.push('red')
     
    }
   console.log(this.state.myArray.slice(0,400))
   console.log(this.state.myArray)
    return this.state.myArray.slice(0,400)
}
handleChange(color) {
    this.setState({
      newColor: color,
    })

}
handleTouch(e){
  e.preventDefault()
let touch = e.changedTouches[0]
let startx
let starty
startx = touch.clientX
starty = touch.clientY
var zzz = document.elementFromPoint(startx, starty)
zzz.style.backgroundColor = 'yellow'
console.log(zzz)
var noChange = document.getElementsByClassName('noChange')
for(let c = 0; c < noChange.length; c++){
  if(noChange[c].style.backgroundColor !== 'white'){
    noChange[c].style.backgroundColor = 'white'
  }
}

}
  render() {
    {this.renderBoard()}
    return (
      <div className="noChange" id="surround">
        <Button onChange={this.handleChange}/>
      <div onTouchMove={this.handleTouch} id="gameBoard">
       {this.state.myArray.slice(0,400)}
      </div>
      </div>
      
    )
  }
  componentDidMount() {
    
  }
}
*/
ReactDOM.render(<Board />, document.getElementById('root'))
