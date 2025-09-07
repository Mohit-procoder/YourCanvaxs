import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons/faPencil";
import { faEraser, faShapes } from "@fortawesome/free-solid-svg-icons";
import {
  setisShaping,
  setShapeColor,
  setShapesize,
  setShapeType,
} from "./stores/shapesSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsDrawing,
  setPencilColor,
  setPencilSize,
} from "./stores/pencilSlice";
import { setEraserSize, setIsErasing, setSelection } from "./stores/eraseSlice";
export function Tools() {
  const shapes = useSelector((state) => state.shapes);
  const pencil = useSelector((state) => state.pencil);
  const eraser = useSelector((state) => state.eraser);
  const dispatch = useDispatch();
  return (
    <div className="main">
      <h2>Tools</h2>
      <hr />
      <div className="allTools">
        <div className="penera">
          <div
            className="pencil"
            style={{
              backgroundColor: `${
                pencil.isDrawing === true ? "rgba(128, 128, 128, 1)" : ""
              }`,
            }}
          >
            <span
              onClick={() => {
                dispatch(setIsDrawing(true));
                dispatch(setisShaping(0));
                dispatch(setIsErasing(false));
                dispatch(setSelection(false));
              }}
            >
              <span>
                <FontAwesomeIcon icon={faPencil} />
                Pencil
              </span>

              <div className="color-input-wrapper">
                <input
                  style={{
                    backgroundColor: `${pencil.pencilColor}`,
                  }}
                  type="color"
                  className="color-input"
                  onChange={(e) => {
                    dispatch(setPencilColor(e.target.value));
                  }}
                />
              </div>
            </span>
          </div>
          <div
            className="eraser"
            style={{
              backgroundColor: `${
                eraser.isErasing === true ? "rgba(128, 128, 128, 1)" : ""
              }`,
            }}
          >
            <span
              onClick={() => {
                dispatch(setIsErasing(true));
                dispatch(setisShaping(0));
                dispatch(setIsDrawing(false));
                dispatch(setSelection(false));
              }}
            >
              <FontAwesomeIcon icon={faEraser} />
              Eraser
            </span>
          </div>
          <div
            className="shapesLarge"
            style={{
              backgroundColor: `${
                shapes.isShaping >= 1 ? "rgba(130, 130, 138, 0.4)" : ""
              }`,
            }}
          >
            <div className="shapessmalll1">
              <span
                onClick={(e) => {
                  dispatch(setisShaping(1));
                  dispatch(setIsDrawing(false));
                  dispatch(setIsErasing(false));
                  dispatch(setSelection(false));
                }}
              >
                <FontAwesomeIcon icon={faShapes} />
                Shapes
              </span>
              <div className="color-input-wrapper">
                <input
                  onChange={(e) => {
                    dispatch(setShapeColor(e.target.value));
                  }}
                  style={{
                    backgroundColor: `${
                      shapes.isShaping == 2 ? shapes.shapeColor : "white"
                    }`,
                    border: `3px solid ${shapes.shapeColor}`,
                  }}
                  type="color"
                  className="color-input"
                />
              </div>
            </div>
            <div className="getshape">
              <span
                onClick={() => {
                  if (shapes.isShaping == 1) dispatch(setisShaping(2));
                  else if (shapes.isShaping == 2) dispatch(setisShaping(1));
                }}
                style={{
                  backgroundColor: `${
                    shapes.isShaping == 2 ? "rgba(128, 128, 128, 1)" : ""
                  }`,
                }}
              >
                FILL
              </span>
              <span className="mainShapes">
                <span
                  onClick={() => {
                    dispatch(setShapeType("line"));
                    dispatch(setisShaping(1));
                    dispatch(setIsDrawing(false));
                    dispatch(setIsErasing(false));
                    dispatch(setSelection(false));
                  }}
                  style={{
                    backgroundColor: `${
                      shapes.shapeType == "line" && shapes.isShaping >= 1
                        ? "rgba(128, 128, 128, 1)"
                        : ""
                    }`,
                  }}
                >
                  Line
                </span>
                <span
                  onClick={() => {
                    dispatch(setShapeType("triangle"));
                    dispatch(setisShaping(1));
                    dispatch(setIsDrawing(false));
                    dispatch(setIsErasing(false));
                    dispatch(setSelection(false));
                  }}
                  style={{
                    backgroundColor: `${
                      shapes.shapeType == "triangle" && shapes.isShaping >= 1
                        ? "rgba(128, 128, 128, 1)"
                        : ""
                    }`,
                  }}
                >
                  Triangle
                </span>
                <span
                  onClick={() => {
                    dispatch(setShapeType("circle"));
                    dispatch(setisShaping(1));
                    dispatch(setIsDrawing(false));
                    dispatch(setIsErasing(false));
                    dispatch(setSelection(false));
                  }}
                  style={{
                    backgroundColor: `${
                      shapes.shapeType == "circle" && shapes.isShaping >= 1
                        ? "rgba(128, 128, 128, 1)"
                        : ""
                    }`,
                  }}
                >
                  Circle
                </span>
                <span
                  onClick={() => {
                    dispatch(setShapeType("rectangle"));
                    dispatch(setisShaping(1));
                    dispatch(setIsDrawing(false));
                    dispatch(setIsErasing(false));
                    dispatch(setSelection(false));
                  }}
                  style={{
                    backgroundColor: `${
                      shapes.shapeType == "rectangle" && shapes.isShaping >= 1
                        ? "rgba(128, 128, 128, 1)"
                        : ""
                    }`,
                  }}
                >
                  Rectangle
                </span>
              </span>
            </div>
          </div>
          <div
            className="shapesSmall"
            style={{
              backgroundColor: `${
                shapes.isShaping >= 1 ? "rgba(128, 128, 128, 1)" : ""
              }`,
            }}
          >
            <div className="shapessmalll1">
              <span
                onClick={(e) => {
                  dispatch(setisShaping(1));
                  dispatch(setIsDrawing(false));
                  dispatch(setIsErasing(false));
                  dispatch(setSelection(false));
                }}
              >
                <FontAwesomeIcon icon={faShapes} />
                Shapes
              </span>
              <div className="color-input-wrapper">
                <input
                  onChange={(e) => {
                    dispatch(setShapeColor(e.target.value));
                  }}
                  style={{
                    backgroundColor: `${
                      shapes.isShaping == 2 ? shapes.shapeColor : "white"
                    }`,
                    border: `3px solid ${shapes.shapeColor}`,
                  }}
                  type="color"
                  className="color-input"
                />
              </div>
            </div>
            <div className="fillshapes">
              <select
                onChange={(e) => {
                  dispatch(setShapeType(e.target.value));
                  dispatch(setisShaping(1));
                  dispatch(setIsDrawing(false));
                  dispatch(setIsErasing(false));
                  dispatch(setSelection(false));
                }}
                className="getShapes"
              >
                <option hidden>Select Shape</option>
                <option value="line">Line</option>
                <option value="circle">Circle</option>
                <option value="triangle">Triangle</option>
                <option value="rectangle">Rectangle</option>
              </select>
              <span
                className="getshape"
                onClick={() => {
                  if (shapes.isShaping == 1) dispatch(setisShaping(2));
                  else if (shapes.isShaping == 2) dispatch(setisShaping(1));
                }}
                style={{
                  backgroundColor: `${
                    shapes.isShaping == 2 ? "rgba(128, 128, 128, 1)" : ""
                  }`,
                }}
              >
                Fill
              </span>
            </div>
          </div>
        </div>
        <input
          onChange={(e) => {
            dispatch(setPencilSize(e.target.value));
            dispatch(setShapesize(e.target.value));
            dispatch(setEraserSize(e.target.value));
          }}
          type="range"
          id="pencilRange"
          min="0"
          max="30"
          step="1"
        />
      </div>
    </div>
  );
}
