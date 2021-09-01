import React, { useState, useEffect, useRef} from 'react'
import useWindowSize from './WindowSize'

export default function Canvas(props) {
  const [drawing, setDrawing] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const canvasRef = useRef();
  const ctxRef = useRef();

  useEffect(() => {
    ctxRef.current = canvasRef.current.getContext('2d')
  }, [])

  const [windowWidth, windowHeight] = useWindowSize(() => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  })
  
  function handleMouseMove(e) {
    // actual coordinates
    const coords = [
      e.clientX - canvasRef.current.offsetLeft,
      e.clientY - canvasRef.current.offsetTop
    ]
    if (drawing) { 
      ctxRef.current.lineTo(...coords)
      ctxRef.current.stroke()
    }
    if (props.handleMouseMove) {
        props.handleMouseMove(...coords)
    }
  }
  function startDrawing(e) {
    ctxRef.current.lineJoin = 'round'
    ctxRef.current.lineCap = 'round'
    ctxRef.current.lineWidth = 10
    ctxRef.current.strokeStyle = props.color
    ctxRef.current.beginPath();
    // actual coordinates
    ctxRef.current.moveTo(
      e.clientX - canvasRef.current.offsetLeft,
      e.clientY - canvasRef.current.offsetTop
    )
    setDrawing(true)
  }
  function stopDrawing() {
    ctxRef.current.closePath()
    setDrawing(false)
  }
  
  return <canvas
    ref={canvasRef}
    width={props.width || width}
    height={props.height || height}
    onMouseDown={startDrawing}
    onMouseUp={stopDrawing}
    onMouseOut={stopDrawing}
    onMouseMove={handleMouseMove}
  />
}