import { useEffect, useRef } from "react";
import tw from "tailwind-styled-components";

export const Background = () => {
  const canvasRef = useRef();
  const blurTopRef = useRef();
  const blurBottomRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const blurTop = blurTopRef.current;
    const blurBottom = blurBottomRef.current;

    let cloneCtx = blurBottom.getContext("2d");
    let ctx = canvas.getContext("2d");

    let w = blurTop.width;
    let h = blurBottom.height;

    let ww = window.innerWidth;
    let wh = window.innerHeight;

    canvas.width = ww;
    canvas.height = wh;
    var partCount = 100;
    var particles = [];

    function particle() {
      this.color = "rgba(255,255,255," + Math.random() / 3 + ")";
      this.x = randomInt(0, ww);
      this.y = randomInt(0, wh);
      this.direction = {
        x: -1 + Math.random() * 2,
        y: -1 + Math.random() * 2,
      };
      this.vx = 0.3 * Math.random();
      this.vy = 0.3 * Math.random();
      this.radius = randomInt(2, 3);
      this.float = function () {
        this.x += this.vx * this.direction.x;
        this.y += this.vy * this.direction.y;
      };
      this.changeDirection = function (axis) {
        this.direction[axis] *= -1;
      };
      this.boundaryCheck = function () {
        if (this.x >= ww) {
          this.x = ww;
          this.changeDirection("x");
        } else if (this.x <= 0) {
          this.x = 0;
          this.changeDirection("x");
        }
        if (this.y >= wh) {
          this.y = wh;
          this.changeDirection("y");
        } else if (this.y <= 0) {
          this.y = 0;
          this.changeDirection("y");
        }
      };
      this.draw = function () {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
      };
    }
    function clearCanvas() {
      cloneCtx.clearRect(0, 0, ww, wh);
      ctx.clearRect(0, 0, ww, wh);
    }
    function createParticles() {
      for (let i = 0; i < partCount; i++) {
        var p = new particle();
        particles.push(p);
      }
    }
    function drawParticles() {
      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.draw();
      }
    }
    function updateParticles() {
      for (var i = particles.length - 1; i >= 0; i--) {
        let p = particles[i];
        p.float();
        p.boundaryCheck();
      }
    }
    createParticles();
    drawParticles();
    function animateParticles() {
      clearCanvas();
      drawParticles();
      updateParticles();
      cloneCtx.drawImage(canvas, 0, 0);
      requestAnimationFrame(animateParticles);
    }
    requestAnimationFrame(animateParticles);
    cloneCtx.drawImage(canvas, 0, 0);

    window.addEventListener("resize", function () {
      const ww = window.innerWidth;
      const wh = window.innerHeight;
      canvas.width = ww;
      canvas.height = wh;
      clearCanvas();
      particles = [];
      createParticles();
      drawParticles();
    });
    function randomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
    function velocityInt(min, max) {
      return Math.random() * (max - min + 1) + min;
    }
  }, [canvasRef, blurTopRef, blurBottomRef]);

  return (
    <BackgroundContainer>
      <CustomCanvas ref={canvasRef} role="main" />
      <BlurContainer>
        <div className="blur blurTop">
          <canvas className="canvas" ref={blurTopRef} />
        </div>
        <div className="blur blurBottom">
          <canvas className="canvas w-screen h-screen" ref={blurBottomRef} />
        </div>
      </BlurContainer>
    </BackgroundContainer>
  );
};

const BackgroundContainer = tw.div`
fixed
top-0
left-0
w-screen
h-screen
-z-50
bg-gradient-to-br
from-[#1f1227]
from-50%
to-[#191b23]
`;

const CustomCanvas = tw.canvas`
container
w-screen
h-screen
top-1/2
left-1/2
-translate-x-1/2
-translate-y-1/2
fixed
-z-30
`;

const BlurContainer = tw.div`
w-screen
h-screen
fixed
top-0
left-0
-z-40
`;
