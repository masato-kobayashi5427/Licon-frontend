import React, { useRef } from 'react';
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
`;

const ClearButton = styled.button`
  background-color: #ffffff;
  color: #000000;
  border: 1px solid #000000;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
`;

const Canvas: React.FC<IProps> = (props) => {
  const { width, height, setCanvasUrl } = props
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
    ctx.lineWidth = 5;
    ctx.strokeStyle= "#000000";
    ctx.stroke();
    mouseX = x;
    mouseY = y;
    if (canvasRef.current) {
      setCanvasUrl(canvasRef.current.toDataURL());
    }
  }

  const Reset = () => {
    const ctx = getContext();
    ctx.clearRect(0, 0, width, height);
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
        <ClearButton onClick={Reset}>リセット</ClearButton>
      </div>
    </Container>
  );
}

export default Canvas;