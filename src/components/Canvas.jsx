import React, { useState, useEffect, useRef} from 'react'
import useWindowSize from './WindowSize'

export default function Canvas(props) {
  const [drawing, setDrawing] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const canvasRef = useRef();
  const ctxRef = useRef();

  const [windowWidth, windowHeight] = useWindowSize(() => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  })
  
  return <canvas
    ref={canvasRef}
    width={this.props.width || this.state.width}
    height={this.props.height || this.state.height}
    onMouseDown={this.startDrawing}
    onMouseUp={this.stopDrawing}
    onMouseOut={this.stopDrawing}
    onMouseMove={this.handleMouseMove}
  />
}

export default function Canvas () {
  constructor(props) {
    super(props)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleResize = this.handleResize.bind(this)
    this.startDrawing = this.startDrawing.bind(this)
    this.stopDrawing = this.stopDrawing.bind(this)
  }
  
  const [windowWidth, windowHeight] = useWindowSize();
  const [windowSize, setWindowSize ] = useState({
    width: windowWidth,
    height: windowHeight
  })
  const [drawing, setDrawing] = useState(false);
  const canvasRef = useRef(null)

  useEffect(() => {
    ctx = canvasRef.current.getContext('2d')
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize)
  }, [])


  handleMouseMove(e) {
    // actual coordinates
    const coords = [
      e.clientX - this.canvasRef.current.offsetLeft,
      e.clientY - this.canvasRef.current.offsetTop
    ]
    if (this.state.drawing) { 
      this.ctx.lineTo(...coords)
      this.ctx.stroke()
    }
    if (this.props.handleMouseMove) {
        this.props.handleMouseMove(...coords)
    }
  }
  handleResize() {
    setWindowSize(())
      ({ width: window.innerWidth, height: window.innerHeight })
  }
  startDrawing(e) {
    this.ctx.lineJoin = 'round'
    this.ctx.lineCap = 'round'
    this.ctx.lineWidth = 10
    this.ctx.strokeStyle = this.props.color
    this.ctx.beginPath();
    // actual coordinates
    this.ctx.moveTo(
      e.clientX - this.canvasRef.current.offsetLeft,
      e.clientY - this.canvasRef.current.offsetTop
    )
    this.setState({ drawing: true })
  }
  stopDrawing() {
    this.ctx.closePath()
    this.setState({ drawing: false })
  }
  render() {
    return (
      <>
        <canvas
          ref={canvasRef}
          width={this.props.width || this.state.width}
          height={this.props.height || this.state.height}
          onMouseDown={this.startDrawing}
          onMouseUp={this.stopDrawing}
          onMouseOut={this.stopDrawing}
          onMouseMove={this.handleMouseMove}
        />
      </>
    )
  }
}