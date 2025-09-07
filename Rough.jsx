import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faFilePdf
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import {  useSelector } from "react-redux";
import { width } from "@fortawesome/free-solid-svg-icons/faPencil";

export function Canvas() {
  const shapes = useSelector((state) => state.shapes);
  const pencil = useSelector((state) => state.pencil);
  const eraser = useSelector((state) => state.eraser);
  const [sDrawing, setSdrawing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [snapshot, setSnapshot] = useState(null);
  const [draw, setDraw] = useState({});
  const [dim , setDimention] = useState({width:0 ,height:0})
  const canvasref = useRef(null)
  console.log(canvasref)
  const stopDraw = (e) => {
    setSdrawing(false);
  };
  const startDrawing = (e) => {
    setDraw(e.target.getContext("2d"));
    if (typeof draw.getImageData == "function") {
      setSnapshot(draw.getImageData(0, 0, e.target.width, e.target.height));
    }
    setDimention({width:e.target.width , height:e.target.height})
    setSdrawing(true);
    setStartX(e.clientX - e.target.offsetLeft);
    setStartY(e.clientY - e.target.offsetTop);
    draw.beginPath?.();
  };
  const drawpencil = (e) => {
    draw.strokeStyle = pencil.pencilColor;
    draw.lineWidth = pencil.pencilSize;
    if (pencil.pencilSize != 0)
      draw.lineTo(
        e.clientX - e.target.offsetLeft,
        e.clientY - e.target.offsetTop
      );
    draw.stroke();
  };
  const eraseit = (e) => {
    draw.strokeStyle = "gray";
    draw.lineWidth = eraser.eraserSize;

    draw.lineTo(
      e.clientX - e.target.offsetLeft,
      e.clientY - e.target.offsetTop
    );
    draw.stroke();
  };
  const drawLine = (e) => {
    draw.putImageData(snapshot, 0, 0);
    draw.lineWidth = shapes.shapeSize;
    draw.moveTo(startX, startY);
    draw.lineTo(
      e.clientX - e.target.offsetLeft,
      e.clientY - e.target.offsetTop
    );
    draw.strokeStyle = shapes.shapeColor;
    draw.lineWidth = shapes.shapeSize;
    draw.stroke();
    draw.beginPath();
  };
  const drawTriangle = (e) => {
    draw.putImageData(snapshot, 0, 0);
    draw.lineWidth = shapes.shapeSize;
    draw.moveTo(startX, startY);
    draw.lineTo(
      e.clientX - e.target.offsetLeft,
      e.clientY - e.target.offsetTop
    );
    draw.lineTo(
      2 * startX - (e.clientX - e.target.offsetLeft),
      e.clientY - e.target.offsetTop
    );
    draw.closePath();
    if (shapes.isShaping == 1) {
      draw.strokeStyle = shapes.shapeColor;
      draw.lineWidth = shapes.shapeSize;
      draw.stroke();
    } else if (shapes.isShaping == 2) {
      draw.fillStyle = shapes.shapeColor;
      draw.fill();
    }
    draw.beginPath();
  };
  const drawcircle = (e) => {
    draw.putImageData(snapshot, 0, 0);
    draw.beginPath();
    var currRadius =
      Math.abs(e.clientX - e.target.offsetLeft - startX) >
      Math.abs(e.clientY - e.target.offsetTop - startY)
        ? Math.abs(e.clientX - e.target.offsetLeft - startX)
        : Math.abs(e.clientY - e.target.offsetTop - startY);
    draw.arc(startX, startY, currRadius, 0, Math.PI * 2, false);
    if (shapes.isShaping == 1) {
      draw.strokeStyle = shapes.shapeColor;
      draw.lineWidth = shapes.shapeSize;
      draw.stroke();
    } else if (shapes.isShaping == 2) {
      draw.fillStyle = shapes.shapeColor;
      draw.fill();
    }
  };
  const drawrec = (e) => {
    draw.putImageData(snapshot, 0, 0);
    console.log(typeof snapshot)
    draw.lineWidth = shapes.shapeSize;
    draw.moveTo(startX, startY);
    draw.lineTo(e.clientX - e.target.offsetLeft, startY);
    draw.lineTo(
      e.clientX - e.target.offsetLeft,
      e.clientY - e.target.offsetTop
    );
    draw.lineTo(startX, e.clientY - e.target.offsetTop);
    draw.closePath();
    if (shapes.isShaping == 1) {
      draw.strokeStyle = shapes.shapeColor;
      draw.lineWidth = shapes.shapeSize;
      draw.stroke();
    } else if (shapes.isShaping == 2) {
      draw.fillStyle = shapes.shapeColor;
      draw.fill();
    }
    draw.beginPath();
  };
  function Drawing(e) {
    if (sDrawing == true) {
      if (pencil.isDrawing == true) drawpencil(e);
      else if (eraser.isErasing == true) eraseit(e);
      else if (shapes.isShaping >= 1) {
        if (shapes.shapeType == "line") drawLine(e);
        else if (shapes.shapeType == "triangle") drawTriangle(e);
        else if (shapes.shapeType == "circle") drawcircle(e);
        else if (shapes.shapeType == "rectangle") drawrec(e);
      }
    }
  }
  return (
    <div className="main2">
      <div className="tool2">
        <div className="clear" onClick={()=>{
          draw.clearRect(0,0,dim.width,dim.height)
        }}>
          <FontAwesomeIcon icon={faBan} />
          <span>clear Canvas</span>
        </div>
        <div className="saveimg" onClick={()=>{
          const canvass = canvasref.current
          const link = document.createElement('a')
          link.download = 'canvass-image.png'
          link.href = canvass.toDataURL()
          link.click()
        }}>
        <FontAwesomeIcon icon={faFilePdf} />
        <span>Save Canvas</span>
        </div>
      </div>
      <canvas
      ref={canvasref}
        id="canvas"
        width={
          window.innerWidth >= 900
            ? (window.innerWidth * 8) / 10
            : (window.innerWidth * 9) / 10
        }
        height={(window.innerHeight * 7) / 10}
        onMouseDown={startDrawing}
        onMouseUp={stopDraw}
        onMouseMove={Drawing}
      ></canvas>
    </div>
  );
}
