import React, { useState, useRef } from 'react';
import styled from 'styled-components'

interface IProps {
  width: number;
  height: number;
  setCanvasUrl: any;
}

interface IRect {
  width: number;
  height: number;
  left: number;
  right: number;
  top: number;
  bottom: number;
}

const Container = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CanvasWrapper = styled.div`
  flex: 1;
  margin-right: 10px;
`;

const Canpas = styled.canvas`
  border: 1px solid #000000;
  background-color: white;
  cursor: crosshair;
`;

const RangeInput = styled.input`
  margin: 10px;
  display: block;
`;

const ClearButton = styled.button`
  background-color: #ffffff;
  color: #000000;
  border: 1px solid #000000;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
`;

const ColorPicker = styled.input.attrs({
  type: "color",
})`
  height: 40px;
  width: 100px;
  margin-left: 10px;
`;

const Canvas: React.FC<IProps> = (props) => {
  const { width, height, setCanvasUrl } = props
  const [color, setColor] = useState<string>("#000000");
  const [lineWidth, setLineWidth] = useState<number>(5);
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  let canvasRef = useRef<HTMLCanvasElement | null>(null);
  let mouseX: number | null = null;
  let mouseY: number | null = null;

  const getContext = (): CanvasRenderingContext2D => {
    const canvas: any = canvasRef.current!;
    return canvas.getContext('2d');
  };
  
  const OnClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (e.button !== 0) { return; }
    const canvas: any = canvasRef.current!;
    const rect: IRect = canvas.getBoundingClientRect();
    const x = ~~(e.clientX - rect.left);
    const y = ~~(e.clientY - rect.top);
    Draw(x, y);
  }
  
  const OnMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (e.buttons !== 1) { return; }
    const canvas: any = canvasRef.current!;
    const rect: IRect = canvas.getBoundingClientRect();
    const x = ~~(e.clientX - rect.left);
    const y = ~~(e.clientY - rect.top);
    Draw(x, y);
  }

  const DrawEnd = (e: React.MouseEvent<HTMLCanvasElement>) => {
    mouseX = null;
    mouseY = null;
  }

  const Draw = (x: number, y: number) => {
    const ctx = getContext();
    ctx.beginPath();
    ctx.globalAlpha = 1.0;
    if (mouseX === null || mouseY === null) {
      ctx.moveTo(x, y);
    } else {
      ctx.moveTo(mouseX, mouseY);
    }
    ctx.lineTo(x, y);
    ctx.lineCap = "round";
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.stroke();
    mouseX = x;
    mouseY = y;
    if (canvasRef.current) {
      setCanvasUrl(canvasRef.current.toDataURL('image/jpeg', 0.1));
    }
  }

  const Reset = () => {
    const ctx = getContext();
    ctx.clearRect(0, 0, width, height);
  }

  const OnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) { return; }
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setImage(img);
    }
    img.src = url;
  }

  const DrawImage = () => {
    if (!image) { return; }
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const ratio = Math.min(canvas.width / image.width, canvas.height / image.height);
    const width = image.width * ratio;
    const height = image.height * ratio;
    ctx.drawImage(image, 0, 0, width, height);
    setCanvasUrl(canvas.toDataURL());
  }
  

  return (
    <Container>
      <CanvasWrapper>
        <Canpas 
          onMouseDown={OnClick}
          onMouseMove={OnMove}
          onMouseUp={DrawEnd}
          onMouseOut={DrawEnd}
          ref={canvasRef}
          width={`${width}px`}
          height={`${height}px`}
        />
      </CanvasWrapper>
      <div>
        <div style={{ color: `white` }}> 色を変更</div>
        <ColorPicker value={color} onChange={(e) => setColor(e.target.value)} />
        <RangeInput
          type="range"
          min="1"
          max="10"
          value={lineWidth} // lineWidthを設定
          onChange={(e) => setLineWidth(Number(e.target.value))}
        />
        <span style={{ color: `white` }}>線の幅：{lineWidth}</span>
        <input type="file" onChange={OnChange} style={{ color: `white` }}/>
        <button onClick={DrawImage}>画像を描画する</button>
      </div>
      <div>
        <ClearButton onClick={Reset}>リセット</ClearButton>
      </div>
    </Container>
  );
}

export default Canvas;