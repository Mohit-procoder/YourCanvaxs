import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRotateLeft,
  faBan,
  faFilePdf,
  faHandPointer,
  faUpDownLeftRight,
  faUpRightAndDownLeftFromCenter,
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelection } from "./stores/eraseSlice";

export function Canvas() {
  const shapes = useSelector((state) => state.shapes);
  const pencil = useSelector((state) => state.pencil);
  const eraser = useSelector((state) => state.eraser);
  const [sDrawing, setSdrawing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [snapshot, setSnapshot] = useState([]);
  const [index, setIndex] = useState(-1);
  const [draw, setDraw] = useState({});
  const [canvasref, setCanvasRef] = useState(useRef(null));
  const [allObjects, setAllObjects] = useState([]);
  const [selIndex, setSelIndex] = useState(-1);
  const [initialState, setInitilalStaee] = useState({});
  const [selctionAction, setSelctionAction] = useState(false);
  const [Resize, setResize] = useState(null);
  const [toRemove, setToremove] = useState([]);
  const dispatch = useDispatch();
  const stopDraw = (e) => {
    setSdrawing(false);
    setSelctionAction(false);
  };
  const isPointOnLine = (obj, x, y) => {
    return (
      Math.abs(
        (obj.endy - obj.starty) * (x - obj.startx) -
          (obj.endx - obj.startx) * (y - obj.starty)
      ) <= 2000 &&
      x <= Math.max(obj.startx, obj.endx) &&
      x >= Math.min(obj.startx, obj.endx) &&
      y <= Math.max(obj.starty, obj.endy) &&
      y >= Math.min(obj.starty, obj.endy)
    );
  };
  const isPointInTriangle = (p, a, b, c) => {
    const area = (a, b, c) => {
      return Math.abs(
        (a[0] * (b[1] - c[1]) + b[0] * (c[1] - a[1]) + c[0] * (a[1] - b[1])) /
          2.0
      );
    };
    const A = area(a, b, c);
    const A1 = area(p, b, c);
    const A2 = area(a, p, c);
    const A3 = area(a, b, p);
    return A === A1 + A2 + A3;
  };
  const getSelectedObjectIndex = (x, y) => {
    var latestIndex = -1;
    for (let i = 0; i < allObjects.length; i++) {
      const obj = allObjects[i];
      if (obj.type === "line") {
        if (isPointOnLine(obj, x, y)) {
          latestIndex = i;
        }
      } else if (obj.type === "triangle") {
        const triangleVertices = [
          [obj.startx, obj.starty],
          [obj.endx, obj.endy],
          [2 * obj.startx - obj.endx, obj.endy],
        ];
        if (isPointInTriangle([x, y], ...triangleVertices)) {
          latestIndex = i;
        }
      } else if (obj.type === "circle") {
        const dx = x - obj.startx;
        const dy = y - obj.starty;
        if (Math.sqrt(dx * dx + dy * dy) <= obj.radius) {
          latestIndex = i;
        }
      } else if (obj.type === "rectangle") {
        const rectVertices = [
          [obj.startx, obj.starty],
          [obj.endx, obj.endy],
          [obj.startx, obj.endy],
          [obj.endx, obj.starty],
        ];
        if (
          x >= Math.min(obj.startx, obj.endx) &&
          x <= Math.max(obj.startx, obj.endx) &&
          y >= Math.min(obj.starty, obj.endy) &&
          y <= Math.max(obj.starty, obj.endy)
        ) {
          latestIndex = i;
        }
      } else if (obj.type === "pencil") {
        for (let j = 0; j < obj.pos.length; j++) {
          if (
            Math.abs(obj.pos[j][0] - x) <= 10 &&
            Math.abs(obj.pos[j][1] - y) <= 10
          ) {
            latestIndex = i;
          }
        }
      }
    }
    return latestIndex;
  };
  const drawAllobj = (e) => {
    if (eraser.selection == true && selIndex >= 0 && Resize == false) {
      if (allObjects[selIndex].type === "line") {
        allObjects[selIndex] = {
          ...allObjects[selIndex],
          startx:
            initialState.startx +
            (!e.touches
              ? e.clientX - e.target.offsetLeft - startX
              : e.touches[0].clientX - e.target.offsetLeft - startX),
          starty:
            initialState.starty +
            (!e.touches
              ? e.clientY - e.target.offsetTop - startY
              : e.touches[0].clientY - e.target.offsetTop - startY),
          endx:
            initialState.endx +
            (!e.touches
              ? e.clientX - e.target.offsetLeft - startX
              : e.touches[0].clientX - e.target.offsetLeft - startX),
          endy:
            initialState.endy +
            (!e.touches
              ? e.clientY - e.target.offsetTop - startY
              : e.touches[0].clientY - e.target.offsetTop - startY),
        };
      } else if (allObjects[selIndex].type === "triangle") {
        allObjects[selIndex] = {
          ...allObjects[selIndex],
          startx:
            initialState.startx +
            (!e.touches
              ? e.clientX - e.target.offsetLeft - startX
              : e.touches[0].clientX - e.target.offsetLeft - startX),
          starty:
            initialState.starty +
            (!e.touches
              ? e.clientY - e.target.offsetTop - startY
              : e.touches[0].clientY - e.target.offsetTop - startY),
          endx:
            initialState.endx +
            (!e.touches
              ? e.clientX - e.target.offsetLeft - startX
              : e.touches[0].clientX - e.target.offsetLeft - startX),
          endy:
            initialState.endy +
            (!e.touches
              ? e.clientY - e.target.offsetTop - startY
              : e.touches[0].clientY - e.target.offsetTop - startY),
        };
      } else if (allObjects[selIndex].type === "circle") {
        allObjects[selIndex] = {
          ...allObjects[selIndex],
          startx:
            initialState.startx +
            (!e.touches
              ? e.clientX - e.target.offsetLeft - startX
              : e.touches[0].clientX - e.target.offsetLeft - startX),
          starty:
            initialState.starty +
            (!e.touches
              ? e.clientY - e.target.offsetTop - startY
              : e.touches[0].clientY - e.target.offsetTop - startY),
        };
      } else if (allObjects[selIndex].type === "rectangle") {
        allObjects[selIndex] = {
          ...allObjects[selIndex],
          startx:
            initialState.startx +
            (!e.touches
              ? e.clientX - e.target.offsetLeft - startX
              : e.touches[0].clientX - e.target.offsetLeft - startX),
          starty:
            initialState.starty +
            (!e.touches
              ? e.clientY - e.target.offsetTop - startY
              : e.touches[0].clientY - e.target.offsetTop - startY),
          endx:
            initialState.endx +
            (!e.touches
              ? e.clientX - e.target.offsetLeft - startX
              : e.touches[0].clientX - e.target.offsetLeft - startX),
          endy:
            initialState.endy +
            (!e.touches
              ? e.clientY - e.target.offsetTop - startY
              : e.touches[0].clientY - e.target.offsetTop - startY),
        };
      } else if (allObjects[selIndex].type === "pencil") {
        const gotPos = initialState.pos.map((pos) => {
          return [
            pos[0] +
              (!e.touches
                ? e.clientX - e.target.offsetLeft - startX
                : e.touches[0].clientX - e.target.offsetLeft - startX),
            pos[1] +
              (!e.touches
                ? e.clientY - e.target.offsetTop - startY
                : e.touches[0].clientY - e.target.offsetTop - startY),
          ];
        });
        allObjects[selIndex] = {
          ...allObjects[selIndex],
          pos: gotPos,
        };
      }
    }
    if (eraser.selection == true && selIndex >= 0 && Resize == true) {
      if (allObjects[selIndex].type === "line") {
        allObjects[selIndex] = {
          ...allObjects[selIndex],
          endx:
            initialState.endx +
            (!e.touches
              ? e.clientX - e.target.offsetLeft - startX
              : e.touches[0].clientX - e.target.offsetLeft - startX),
          endy:
            initialState.endy +
            (!e.touches
              ? e.clientY - e.target.offsetTop - startY
              : e.touches[0].clientY - e.target.offsetTop - startY),
        };
      } else if (allObjects[selIndex].type === "triangle") {
        allObjects[selIndex] = {
          ...allObjects[selIndex],
          endx:
            initialState.endx +
            (!e.touches
              ? e.clientX - e.target.offsetLeft - startX
              : e.touches[0].clientX - e.target.offsetLeft - startX),
          endy:
            initialState.endy +
            (!e.touches
              ? e.clientY - e.target.offsetTop - startY
              : e.touches[0].clientY - e.target.offsetTop - startY),
        };
      } else if (allObjects[selIndex].type === "circle") {
        allObjects[selIndex] = {
          ...allObjects[selIndex],
          radius:
            initialState.radius +
            (!e.touches
              ? e.clientX - e.target.offsetLeft - startX
              : e.touches[0].clientX - e.target.offsetLeft - startX),
        };
      } else if (allObjects[selIndex].type === "rectangle") {
        allObjects[selIndex] = {
          ...allObjects[selIndex],
          endx:
            initialState.endx +
            (!e.touches
              ? e.clientX - e.target.offsetLeft - startX
              : e.touches[0].clientX - e.target.offsetLeft - startX),
          endy:
            initialState.endy +
            (!e.touches
              ? e.clientY - e.target.offsetTop - startY
              : e.touches[0].clientY - e.target.offsetTop - startY),
        };
      }
    }
    draw.clearRect(0, 0, canvasref.current.width, canvasref.current.height);
    allObjects.forEach((obj) => {
      if (obj.type === "line") {
        draw.beginPath();
        draw.moveTo(obj.startx, obj.starty);
        draw.lineTo(obj.endx, obj.endy);
        draw.strokeStyle = obj.strokeStyle;
        draw.lineWidth = obj.lineWidth;
        draw.stroke();
      } else if (obj.type === "triangle") {
        draw.beginPath();
        draw.moveTo(obj.startx, obj.starty);
        draw.lineTo(obj.endx, obj.endy);
        draw.lineTo(2 * obj.startx - obj.endx, obj.endy);
        draw.closePath();
        if (obj.isShaping == 1) {
          draw.strokeStyle = obj.strokeStyle;
          draw.lineWidth = obj.lineWidth;
          draw.stroke();
        } else if (obj.isShaping == 2) {
          draw.fillStyle = obj.strokeStyle;
          draw.fill();
        }
      } else if (obj.type === "circle") {
        var currRadius = Math.abs(obj.radius);
        draw.beginPath();
        draw.arc(obj.startx, obj.starty, currRadius, 0, Math.PI * 2, false);
        if (obj.isShaping == 1) {
          draw.strokeStyle = obj.strokeStyle;
          draw.lineWidth = obj.lineWidth;
          draw.stroke();
        } else if (obj.isShaping == 2) {
          draw.fillStyle = obj.strokeStyle;
          draw.fill();
        }
      } else if (obj.type === "rectangle") {
        draw.beginPath();
        draw.moveTo(obj.startx, obj.starty);
        draw.lineTo(obj.endx, obj.starty);
        draw.lineTo(obj.endx, obj.endy);
        draw.lineTo(obj.startx, obj.endy);
        draw.closePath();
        if (obj.isShaping == 1) {
          draw.strokeStyle = obj.strokeStyle;
          draw.lineWidth = obj.lineWidth;
          draw.stroke();
        } else if (obj.isShaping == 2) {
          draw.fillStyle = obj.strokeStyle;
          draw.fill();
        }
      } else if (obj.type == "pencil") {
        draw.beginPath();
        draw.strokeStyle = obj.StrokeStyle;
        draw.lineWidth = obj.lineWidth;
        for (let j = 0; j < obj.pos.length; j++) {
          if (j == 0) draw.moveTo(obj.pos[j][0], obj.pos[j][1]);
          else draw.lineTo(obj.pos[j][0], obj.pos[j][1]);
        }
        draw.stroke();
      }
    });
  };
  const updateobj = (e) => {
    drawAllobj(e);
  };
  const startDrawing = (e) => {
    setDraw(canvasref.current.getContext("2d"));
    const draww = canvasref.current.getContext("2d");
    if (typeof draww.getImageData == "function") {
      setSnapshot((snapshot) => [
        ...snapshot,
        draww.getImageData(0, 0, e.target.width, e.target.height),
      ]);
      setIndex((index) => index + 1);
    }
    if (e.touches) {
      setStartX(e.touches[0].clientX - e.target.offsetLeft);
      setStartY(e.touches[0].clientY - e.target.offsetTop);
    } else {
      setStartX(e.clientX - e.target.offsetLeft);
      setStartY(e.clientY - e.target.offsetTop);
    }
    if (eraser.selection == true) {
      setToremove((e) => [...e, 1]);
      const inddexx = !e.touches
        ? getSelectedObjectIndex(
            e.clientX - e.target.offsetLeft,
            e.clientY - e.target.offsetTop
          )
        : getSelectedObjectIndex(
            e.touches[0].clientX - e.target.offsetLeft,
            e.touches[0].clientY - e.target.offsetTop
          );
      setSelIndex(inddexx);
      if (inddexx >= 0) {
        setInitilalStaee(allObjects[inddexx]);
        setSelctionAction(true);
      }
      return;
    }
    setToremove((e) => [...e, 0]);
    if (shapes.isShaping >= 1)
      setAllObjects((prev) => [
        ...prev,
        {
          type: shapes.shapeType,
          startx: !e.touches
            ? e.clientX - e.target.offsetLeft
            : e.touches[0].clientX - e.target.offsetLeft,
          starty: !e.touches
            ? e.clientY - e.target.offsetTop
            : e.touches[0].clientY - e.target.offsetTop,
        },
      ]);
    else
      setAllObjects((prev) => [
        ...prev,
        {
          type: "pencil",
          pos: [],
        },
      ]);
    setSdrawing(true);
    draw.beginPath?.();
  };
  const drawpencil = (e) => {
    if (e.touches) {
      allObjects[allObjects.length - 1] = {
        ...allObjects[allObjects.length - 1],
        pos: [
          ...allObjects[allObjects.length - 1].pos,
          [
            e.touches[0].clientX - e.target.offsetLeft,
            e.touches[0].clientY - e.target.offsetTop,
          ],
        ],
        lineWidth: pencil.pencilSize,
        StrokeStyle: pencil.pencilColor,
      };
    } else
      allObjects[allObjects.length - 1] = {
        ...allObjects[allObjects.length - 1],
        pos: [
          ...allObjects[allObjects.length - 1].pos,
          [e.clientX - e.target.offsetLeft, e.clientY - e.target.offsetTop],
        ],
        lineWidth: pencil.pencilSize,
        StrokeStyle: pencil.pencilColor,
      };
    draw.strokeStyle = pencil.pencilColor;
    draw.lineWidth = pencil.pencilSize;
    if (pencil.pencilSize != 0 && e.touches)
      draw.lineTo(
        e.touches[0].clientX - e.target.offsetLeft,
        e.touches[0].clientY - e.target.offsetTop
      );
    else if (pencil.pencilSize != 0)
      draw.lineTo(
        e.clientX - e.target.offsetLeft,
        e.clientY - e.target.offsetTop
      );
    draw.stroke();
  };
  const eraseit = (e) => {
    draw.strokeStyle = "whitesmoke";
    draw.lineWidth = eraser.eraserSize;
    if (e.touches)
      draw.lineTo(
        e.touches[0].clientX - e.target.offsetLeft,
        e.touches[0].clientY - e.target.offsetTop
      );
    else
      draw.lineTo(
        e.clientX - e.target.offsetLeft,
        e.clientY - e.target.offsetTop
      );

    draw.stroke();
  };
  const drawLine = (e) => {
    if (e.touches)
      allObjects[allObjects.length - 1] = {
        ...allObjects[allObjects.length - 1],
        endx: e.touches[0].clientX - e.target.offsetLeft,
        endy: e.touches[0].clientY - e.target.offsetTop,
        lineWidth: shapes.shapeSize,
        strokeStyle: shapes.shapeColor,
      };
    else
      allObjects[allObjects.length - 1] = {
        ...allObjects[allObjects.length - 1],
        endx: e.clientX - e.target.offsetLeft,
        endy: e.clientY - e.target.offsetTop,
        lineWidth: shapes.shapeSize,
        strokeStyle: shapes.shapeColor,
      };
    draw.putImageData(snapshot[index], 0, 0);
    draw.lineWidth = shapes.shapeSize;
    draw.moveTo(startX, startY);
    if (e.touches)
      draw.lineTo(
        e.touches[0].clientX - e.target.offsetLeft,
        e.touches[0].clientY - e.target.offsetTop
      );
    else
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
    if (e.touches)
      allObjects[allObjects.length - 1] = {
        ...allObjects[allObjects.length - 1],
        endx: 2 * startX - (e.touches[0].clientX - e.target.offsetLeft),
        endy: e.touches[0].clientY - e.target.offsetTop,
        lineWidth: shapes.shapeSize,
        strokeStyle: shapes.shapeColor,
        isShaping: shapes.isShaping,
      };
    else
      allObjects[allObjects.length - 1] = {
        ...allObjects[allObjects.length - 1],
        endx: 2 * startX - (e.clientX - e.target.offsetLeft),
        endy: e.clientY - e.target.offsetTop,
        lineWidth: shapes.shapeSize,
        strokeStyle: shapes.shapeColor,
        isShaping: shapes.isShaping,
      };
    draw.putImageData(snapshot[index], 0, 0);
    draw.lineWidth = shapes.shapeSize;
    draw.moveTo(startX, startY);
    if (e.touches)
      draw.lineTo(
        e.touches[0].clientX - e.target.offsetLeft,
        e.touches[0].clientY - e.target.offsetTop
      );
    else
      draw.lineTo(
        e.clientX - e.target.offsetLeft,
        e.clientY - e.target.offsetTop
      );
    if (e.touches)
      draw.lineTo(
        2 * startX - (e.touches[0].clientX - e.target.offsetLeft),
        e.touches[0].clientY - e.target.offsetTop
      );
    else
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
    draw.putImageData(snapshot[index], 0, 0);
    draw.beginPath();
    var currRadius =
      Math.abs(e.clientX - e.target.offsetLeft - startX) >
      Math.abs(e.clientY - e.target.offsetTop - startY)
        ? Math.abs(e.clientX - e.target.offsetLeft - startX)
        : Math.abs(e.clientY - e.target.offsetTop - startY);
    if (e.touches) {
      currRadius =
        Math.abs(e.touches[0].clientX - e.target.offsetLeft - startX) >
        Math.abs(e.touches[0].clientY - e.target.offsetTop - startY)
          ? Math.abs(e.touches[0].clientX - e.target.offsetLeft - startX)
          : Math.abs(e.touches[0].clientY - e.target.offsetTop - startY);
    }
    allObjects[allObjects.length - 1] = {
      ...allObjects[allObjects.length - 1],
      radius: currRadius,
      lineWidth: shapes.shapeSize,
      strokeStyle: shapes.shapeColor,
      isShaping: shapes.isShaping,
    };
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
    if (e.touches)
      allObjects[allObjects.length - 1] = {
        ...allObjects[allObjects.length - 1],
        endx: e.touches[0].clientX - e.target.offsetLeft,
        endy: e.touches[0].clientY - e.target.offsetTop,
        lineWidth: shapes.shapeSize,
        strokeStyle: shapes.shapeColor,
        isShaping: shapes.isShaping,
      };
    else
      allObjects[allObjects.length - 1] = {
        ...allObjects[allObjects.length - 1],
        endx: e.clientX - e.target.offsetLeft,
        endy: e.clientY - e.target.offsetTop,
        lineWidth: shapes.shapeSize,
        strokeStyle: shapes.shapeColor,
        isShaping: shapes.isShaping,
      };
    draw.putImageData(snapshot[index], 0, 0);
    draw.lineWidth = shapes.shapeSize;
    draw.moveTo(startX, startY);
    if (e.touches)
      draw.lineTo(e.touches[0].clientX - e.target.offsetLeft, startY);
    else draw.lineTo(e.clientX - e.target.offsetLeft, startY);
    if (e.touches)
      draw.lineTo(
        e.touches[0].clientX - e.target.offsetLeft,
        e.touches[0].clientY - e.target.offsetTop
      );
    else
      draw.lineTo(
        e.clientX - e.target.offsetLeft,
        e.clientY - e.target.offsetTop
      );
    if (e.touches)
      draw.lineTo(startX, e.touches[0].clientY - e.target.offsetTop);
    else draw.lineTo(startX, e.clientY - e.target.offsetTop);
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
  const  Drawing = (e) => {
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
    if (selctionAction == true && eraser.selection == true && selIndex >= 0) {
      updateobj(e);
    }
  }
  return (
    <div className="main2">
      <div className="tool2">
        <div>
          <div
            className="selection"
            onClick={() => {
              dispatch(setSelection(true));
            }}
          >
            <span className="selmainn">
              <FontAwesomeIcon icon={faHandPointer} />
              <span>Selection Tools</span>
              <hr />
            </span>
            <div>
              <span
                className="sel1"
                onClick={() => {
                  setResize(true);
                  setSelIndex(-1);
                  setSdrawing(false);
                }}
                style={{
                  backgroundColor: `${Resize == true ? "gray" : ""}`,
                }}
              >
                <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} />
                <span>Resize</span>
              </span>
              <span
                className="sel1"
                onClick={() => {
                  setResize(false);
                  setSelIndex(-1);
                  setSdrawing(false);
                }}
                style={{
                  backgroundColor: `${Resize == false ? "gray" : ""}`,
                }}
              >
                <FontAwesomeIcon icon={faUpDownLeftRight} />
                <span>Move</span>
              </span>
            </div>
          </div>
          <div
            className="undo"
            onClick={() => {
              if (index >= 0) {
                draw.putImageData(snapshot[index], 0, 0);
                setIndex((index) => index - 1);
                setSnapshot((snapshot) => snapshot.slice(0, -1));
                if (toRemove[toRemove.length - 1] == 0) {
                  setAllObjects((allObjects) => allObjects.slice(0, -1));
                  setToremove((e) => e.slice(0, -1));
                }
              }
            }}
            style={{
              backgroundColor: `${
                index >= 0 ? "gray" : "rgba(128, 128, 128, 0.17)"
              }`,
              color: `${index >= 0 ? "black" : "rgba(128, 128, 128, 1)"}`,
              cursor: `${index >= 0 ? "pointer" : "not-allowed"}`,
              border: `${"1px solid black"}`,
            }}
          >
            <FontAwesomeIcon icon={faArrowRotateLeft} />
            <span>Undo</span>
          </div>
        </div>
        <div>
          <div
            className="clear"
            onClick={() => {
              draw.clearRect(
                0,
                0,
                canvasref.current.width,
                canvasref.current.height
              );
              setAllObjects([]);
            }}
            style={{
              border: `${"1px solid black"}`,
            }}
          >
            <FontAwesomeIcon icon={faBan} />
            <span>clear</span>
          </div>
          <div
            className="saveimg"
            onClick={() => {
              const canvass = canvasref.current;
              const link = document.createElement("a");
              link.download = "canvass-image.png";
              link.href = canvass.toDataURL();
              link.click();
            }}
            style={{
              border: `${"1px solid black"}`,
            }}
          >
            <FontAwesomeIcon icon={faFilePdf} />
            <span>Save</span>
          </div>
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
        height={
          window.innerWidth >= 900
            ? (window.innerHeight * 8) / 10
            : (window.innerHeight * 6) / 10
        }
        onMouseDown={startDrawing}
        onMouseUp={stopDraw}
        onMouseMove={Drawing}
        onTouchStart={startDrawing}
        onTouchEnd={stopDraw}
        onTouchMove={Drawing}
        style={{
          border: "1px solid black",
          cursor: `${eraser.selection == true ? "pointer" : "crosshair"}`,
        }}
      >
        "canavas not supported"
      </canvas>
    </div>
  );
}
