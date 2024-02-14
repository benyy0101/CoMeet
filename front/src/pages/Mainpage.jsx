import GUI from "lil-gui";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import particleMask from "assets/texture/particleMask.png";
import SmokeTexture from "assets/texture/smoke.png";
import { useSearchParams } from "react-router-dom";
import tw from "tailwind-styled-components";
import { hexTransparencies } from "constants/HexAlpha";
import mainimg from "../assets/main.svg";
import textlogo from "../assets/textlogo.svg";

const perlin3d = `
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

float perlin3d(vec3 P)
{
    vec3 Pi0 = floor(P); // Integer part for indexing
  vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
  Pi0 = mod(Pi0, 289.0);
  Pi1 = mod(Pi1, 289.0);
  vec3 Pf0 = fract(P); // Fractional part for interpolation
  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 / 7.0;
  vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 / 7.0;
  vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
  return 2.2 * n_xyz;
}
`;

export const Mainpage = () => {
  const canvasRef = useRef();
  const cometCanvasRef = useRef();
  const [searchParams, _] = useSearchParams();

  useEffect(() => {
    async function render() {
      /**
       * 기본 세팅
       */
      let gui;
      if (searchParams.get("debug")) {
        gui = new GUI({ autoPlace: true });
        gui.domElement.id = "gui";
      }
      const canvas = canvasRef.current;
      const cometCanvas = cometCanvasRef.current;

      const scene = new THREE.Scene();

      const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
        pixelRatio: Math.min(Math.max(window.devicePixelRatio, 1), 2),
      };
      cometCanvas.width = sizes.width;
      cometCanvas.height = sizes.height;

      const camera = new THREE.PerspectiveCamera(
        55,
        sizes.width / sizes.height,
        0.01,
        150
      );
      camera.position.z = 5;
      camera.rotation.reorder("YXZ");

      let controls;
      if (searchParams.get("debug")) {
        controls = new OrbitControls(camera, canvas);
        controls.enableDamping = true;
      }

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      const pointLight = new THREE.PointLight(0xff0000, 3);
      scene.add(directionalLight);
      scene.add(pointLight);

      const renderer = new THREE.WebGLRenderer({
        alpha: false,
        antialias: true,
        canvas,
      });
      renderer.setClearColor(0x010101, 1);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(sizes.width, sizes.height);

      /**
       * Gradient
       */
      let gradientDebugFolder;
      if (searchParams.get("debug")) {
        gradientDebugFolder = gui.addFolder("Gradient");
      }

      const gradientColor = {};
      gradientColor.end = {};
      gradientColor.end.value = "#1a2036";
      gradientColor.end.instance = new THREE.Color(gradientColor.end.value);

      gradientColor.start = {};
      gradientColor.start.saturation = 32;
      gradientColor.start.lightness = 38;
      gradientColor.start.value = `hsl(0, ${gradientColor.start.saturation}%, ${gradientColor.start.lightness}%)`;
      gradientColor.start.instance = new THREE.Color(gradientColor.start.value);
      const gradientGeometry = new THREE.PlaneGeometry(2, 2, 1, 1);

      if (searchParams.get("debug")) {
        gradientDebugFolder
          .addColor(gradientColor.end, "value", { view: "color" })
          .name("색상")
          .onChange(() => {
            gradientColor.end.instance.set(gradientColor.end.value);
          });
        gradientDebugFolder.add(gradientColor.start, "saturation", 0, 100);
        gradientDebugFolder.add(gradientColor.start, "lightness", 0, 100);
      }

      const gradientMaterial = new THREE.ShaderMaterial({
        depthWrite: false,
        transparent: true,
        uniforms: {
          uTime: { value: 0 },
          uEndColor: { value: gradientColor.end.instance },
          uStartColor: { value: gradientColor.start.instance },
        },
        vertexShader: `
        varying vec2 vUv;

        void main()
        {
          gl_Position = vec4(position, 1.0);
          
          vUv = uv;
        }
        `,
        fragmentShader: `
        uniform float uTime;
        uniform vec3 uStartColor;
        uniform vec3 uEndColor;
        
        varying vec2 vUv;
        
        float random2d(vec2 n)
        {
          return fract(sin(dot(n, vec2(12.9898, 78.233))) * 43758.5453123);
        }
        
        void main()
        {
          vec3 endColor = uEndColor;
          vec3 finalColor = mix(uStartColor, endColor, vUv.y);
        
          gl_FragColor = vec4(finalColor, 1.0);
        }
        `,
      });
      gradientMaterial.needsUpdate = true;

      const gradientMesh = new THREE.Mesh(gradientGeometry, gradientMaterial);
      scene.add(gradientMesh);

      /**
       * Smoke
       */

      const smokeCount = { value: 10 };
      const smokeGroup = new THREE.Group();
      smokeGroup.position.y = -2;
      scene.add(smokeGroup);

      let smokeDebugFolder;
      if (searchParams.get("debug")) {
        smokeDebugFolder = gui.addFolder("Smoke");
      }

      const smokeColor = {};
      smokeColor.value = "#130819";
      smokeColor.instance = new THREE.Color(smokeColor.value);

      if (searchParams.get("debug")) {
        smokeDebugFolder
          .addColor(smokeColor, "value", { view: "color" })
          .name("색상")
          .onChange(() => {
            smokeColor.instance.set(smokeColor.value);
          });
      }

      const smokeGeometry = new THREE.PlaneGeometry(1, 1);
      let smokeMaterial;

      if (searchParams.get("debug")) {
        // to do
      }

      const smokeItems = [];
      for (let i = 0; i < smokeCount.value; i++) {
        const item = {};

        item.floatingSpeed = Math.random() * 0.1;
        item.rotationSpeed = (Math.random() - 0.5) * Math.random() * 0.3;

        smokeMaterial = new THREE.MeshBasicMaterial({
          depthWrite: false,
          transparent: true,
          alphaMap: new THREE.TextureLoader().load(SmokeTexture),
          opacity: 1,
          // opacity: 0.05 + Math.random() * 0.2,
        });

        smokeMaterial.color = smokeColor.instance;

        item.mesh = new THREE.Mesh(smokeGeometry, smokeMaterial);

        const scale = 3 + Math.random() * 3;
        item.mesh.scale.set(scale, scale, scale);
        item.mesh.position.x = (Math.random() - 0.5) * 10;
        smokeGroup.add(item.mesh);

        smokeItems.push(item);
      }

      /**
       * Vignette
       */
      let vignetteDebugFolder;
      if (searchParams.get("debug")) {
        vignetteDebugFolder = gui.addFolder("Vignette");
      }

      const vignetteColor = {};
      vignetteColor.value = "#130819";
      vignetteColor.instance = new THREE.Color(vignetteColor.value);
      const vignetteGeometry = new THREE.PlaneGeometry(2, 2);

      if (searchParams.get("debug")) {
        vignetteDebugFolder
          .addColor(vignetteColor, "value", { view: "color" })
          .name("색상")
          .onChange(() => {
            vignetteColor.instance.set(vignetteColor.value);
          });
      }

      const vignetteMaterial = new THREE.ShaderMaterial({
        depthWrite: false,
        depthTest: false,
        transparent: true,
        uniforms: {
          uColor: { value: vignetteColor.instance },
          uOffset: { value: 0 },
          uMultiplier: { value: 1.4 },
        },
        vertexShader: `
        varying vec2 vUv;

        void main()
        {
          gl_Position = vec4(position, 1.0);
          
          vUv = uv;
        }
        `,
        fragmentShader: `
        uniform vec3 uColor;
        uniform float uOffset;
        uniform float uMultiplier;

        varying vec2 vUv;
        
        void main()
        {
          float alpha = length(vUv - 0.5);
          alpha += uOffset;
          alpha *= uMultiplier;

          gl_FragColor = vec4(uColor, alpha);
        }
        `,
      });
      vignetteMaterial.needsUpdate = true;

      const vignetteMesh = new THREE.Mesh(vignetteGeometry, vignetteMaterial);
      scene.add(vignetteMesh);

      if (searchParams.get("debug")) {
        vignetteDebugFolder
          .add(vignetteMaterial.uniforms.uOffset, "value", -1, 1, 0.001)
          .name("offset");
        vignetteDebugFolder
          .add(vignetteMaterial.uniforms.uMultiplier, "value", 0, 2, 0.001)
          .name("배율");
      }

      /**
       * Particles
       */

      const particleCount = { value: 2000 };

      let particleDebugFolder;
      if (searchParams.get("debug")) {
        particleDebugFolder = gui.addFolder("Particle");
      }

      let particleGeometry;
      let particlePositionArray;
      let particleProgressArray;
      let particleSizeArray;
      let particleAlphaArray;

      const particleMaterial = new THREE.ShaderMaterial({
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        uniforms: {
          uTime: { value: 0 },
          uSize: { value: 25 },
          uProgressSpeed: { value: 0.015 },
          uPerlinFrequency: { value: 0.17 },
          uPerlinMultiplier: { value: 1 },
          uMask: {
            value: new THREE.TextureLoader().load(particleMask),
          },
        },
        vertexShader: `
          uniform float uTime;
          uniform float uSize;
          uniform float uProgressSpeed;
          uniform float uPerlinFrequency;
          uniform float uPerlinMultiplier;
  
          attribute float aProgress;
          attribute float aSize;
          attribute float aAlpha;
  
          varying float vAlpha;
  
          ${perlin3d}
  
          void main()
          {
            float progress = mod(aProgress + uTime * uProgressSpeed, 1.0);
  
            vec4 modelPosition = modelMatrix * vec4(position, 1.0);
            modelPosition.y += progress * 10.0;
            modelPosition.x += perlin3d((modelPosition.xyz + vec3(0.0, -uTime, 0.0)) * uPerlinFrequency) * uPerlinMultiplier;
  
            vec4 viewPosition = viewMatrix * modelPosition;
            gl_Position = projectionMatrix * viewPosition;
  
            gl_PointSize = uSize * aSize;
            gl_PointSize *= (1.0 / - viewPosition.z);
  
            vAlpha = aAlpha;
          }
          `,
        fragmentShader: `
          uniform sampler2D uMask;
  
          varying float vAlpha;
  
          void main()
          {
            float maskStrength = texture2D(uMask, gl_PointCoord).r;
            gl_FragColor = vec4(1.0, 1.0, 1.0, maskStrength * vAlpha);
          }
          `,
      });
      particleMaterial.needsUpdate = true;

      const particlePoints = new THREE.Points(
        particleGeometry,
        particleMaterial
      );
      particlePoints.position.y = -5;

      function setParticleGeometry() {
        if (particleGeometry) {
          particleGeometry.dispose();
        }
        particleGeometry = new THREE.BufferGeometry();
        particlePositionArray = new Float32Array(particleCount.value * 3);
        particleProgressArray = new Float32Array(particleCount.value);
        particleSizeArray = new Float32Array(particleCount.value);
        particleAlphaArray = new Float32Array(particleCount.value);

        for (let i = 0; i < particleCount.value; i++) {
          particlePositionArray[i * 3] = (Math.random() - 0.5) * 20;
          particlePositionArray[i * 3 + 2] = (Math.random() - 0.5) * 9;

          particleProgressArray[i] = Math.random() + 0.01;
          particleSizeArray[i] = Math.random();
          particleAlphaArray[i] = Math.random();
        }

        particleGeometry.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(particlePositionArray, 3)
        );
        particleGeometry.setAttribute(
          "aProgress",
          new THREE.Float32BufferAttribute(particleProgressArray, 1)
        );
        particleGeometry.setAttribute(
          "aSize",
          new THREE.Float32BufferAttribute(particleSizeArray, 1)
        );
        particleGeometry.setAttribute(
          "aAlpha",
          new THREE.Float32BufferAttribute(particleAlphaArray, 1)
        );
        particleGeometry.verticesNeedUpdate = true;
        particleGeometry.computeBoundingSphere();
        particlePoints.geometry = particleGeometry;
      }
      scene.add(particlePoints);

      if (searchParams.get("debug")) {
        particleDebugFolder
          .add(particleCount, "value", 100, 500000, 100)
          .name("갯수")
          .onChange(setParticleGeometry);
        particleDebugFolder
          .add(particleMaterial.uniforms.uSize, "value", 0, 200, 0.1)
          .name("사이즈");
        particleDebugFolder
          .add(
            particleMaterial.uniforms.uProgressSpeed,
            "value",
            0,
            0.05,
            0.001
          )
          .name("진행속도");
        particleDebugFolder
          .add(
            particleMaterial.uniforms.uPerlinFrequency,
            "value",
            0,
            0.5,
            0.01
          )
          .name("Perlin 주기");
        particleDebugFolder
          .add(particleMaterial.uniforms.uPerlinMultiplier, "value", 0, 2, 0.1)
          .name("Perlin 배율");
      }

      /**
       * Postprocessing
       */
      const renderPass = new RenderPass(scene, camera);
      const finalPass = new ShaderPass({
        vertexShader: `
        varying vec2 vUv;

        void main()
        {
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          
          vUv = uv;
        }
        `,
        fragmentShader: `
        varying vec2 vUv;

        uniform sampler2D tDiffuse;

        void main()
        {
          vec4 color = texture2D(tDiffuse, vUv);
          gl_FragColor = color;
        }
        `,
        uniforms: {
          tDiffuse: { value: null },
        },
      });
      const renderTarget = new THREE.WebGLRenderTarget(
        sizes.width,
        sizes.height,
        {
          generateMipmaps: false,
          minFilter: THREE.LinearFilter,
          magFilter: THREE.LinearFilter,
          encoding: THREE.sRGBEncoding,
        }
      );
      const composer = new EffectComposer(renderer, renderTarget);
      composer.setSize(sizes.width, sizes.height);
      composer.setPixelRatio(sizes.pixelRatio);
      composer.addPass(renderPass);
      composer.addPass(finalPass);

      /**
       * Comet
       */
      let cometDebugFolder;
      if (searchParams.get("debug")) {
        cometDebugFolder = gui.addFolder("Comet");
      }

      let ctx;
      const cometConfig = {
        speedCoeff: 0.05,
        cometCount: 3,
        cometColor: "#e2e1e0",
      };
      let stars = [];

      if (searchParams.get("debug")) {
        cometDebugFolder
          .add(cometConfig, "speedCoeff", 0.01, 0.1, 0.01)
          .name("속도 계수")
          .onChange(createUniverse);
        cometDebugFolder
          .add(cometConfig, "cometCount", 1, 100, 1)
          .name("갯수")
          .onChange(createUniverse);
        cometDebugFolder
          .addColor(cometConfig, "cometColor", { view: "color" })
          .name("색상")
          .onChange(createUniverse);
      }

      createUniverse();

      function createUniverse() {
        ctx = cometCanvas.getContext("2d");

        for (var i = 0; i < cometConfig.cometCount; i++) {
          stars[i] = new Star();
          stars[i].reset();
        }

        draw();
      }

      function draw() {
        ctx.clearRect(0, 0, sizes.width, sizes.height);

        let starsLength = stars.length;

        for (var i = 0; i < starsLength; i++) {
          var star = stars[i];
          star.move();
          star.fadeIn();
          star.fadeOut();
          star.draw();
        }
      }

      function Star() {
        this.reset = function () {
          this.x = getRandInterval(0, sizes.width - 10);
          this.y = getRandInterval(0, sizes.height);
          this.r = getRandInterval(1.1, 2.6);
          this.dx =
            getRandInterval(
              cometConfig.speedCoeff,
              6 * cometConfig.speedCoeff
            ) +
            cometConfig.speedCoeff * getRandInterval(50, 120) +
            cometConfig.speedCoeff * 2;
          this.dy =
            -getRandInterval(
              cometConfig.speedCoeff,
              6 * cometConfig.speedCoeff
            ) -
            cometConfig.speedCoeff * getRandInterval(50, 120);
          this.fadingOut = null;
          this.fadingIn = true;
          this.opacity = 0;
          this.opacityTresh = getRandInterval(0.2, 1 - 0.4);
          this.do = getRandInterval(0.0005, 0.002) + 0.001;
        };

        this.fadeIn = function () {
          if (this.fadingIn) {
            this.fadingIn = this.opacity > this.opacityTresh ? false : true;
            this.opacity += this.do;
          }
        };

        this.fadeOut = function () {
          if (this.fadingOut) {
            this.fadingOut = this.opacity < 0 ? false : true;
            this.opacity -= this.do / 2;
            if (this.x > sizes.width || this.y < 0) {
              this.fadingOut = false;
              this.reset();
            }
          }
        };

        this.draw = function () {
          ctx.beginPath();

          ctx.fillStyle =
            cometConfig.cometColor +
            hexTransparencies[Math.round(this.opacity * 100)];
          ctx.arc(this.x, this.y, 1.5, 0, 2 * Math.PI, false);

          //comet tail
          for (var i = 0; i < 30; i++) {
            const newOpacity = this.opacity - (this.opacity / 20) * i;
            ctx.fillStyle =
              cometConfig.cometColor +
              hexTransparencies[Math.round(newOpacity * 100)];
            ctx.rect(
              this.x - (this.dx / 4) * i,
              this.y - (this.dy / 4) * i - 2,
              1,
              2
            );
            ctx.fill();
          }

          ctx.closePath();
          ctx.fill();
        };

        this.move = function () {
          this.x += this.dx;
          this.y += this.dy;
          if (this.fadingOut === false) {
            this.reset();
          }
          if (this.x > sizes.width - sizes.width / 4 || this.y < 0) {
            this.fadingOut = true;
          }
        };
      }

      function getRandInterval(min, max) {
        return Math.random() * (max - min) + min;
      }

      /**
       * 업데이트 함수
       */
      const clock = new THREE.Clock();

      function tick() {
        const elapsedTime = clock.getElapsedTime();

        // Gradient
        gradientColor.start.value = `hsl(${elapsedTime * 10}, ${gradientColor.start.saturation}%, ${gradientColor.start.lightness}%)`;
        gradientColor.start.instance.set(gradientColor.start.value);
        gradientMaterial.uniforms.uTime.value = elapsedTime;

        // Smokes
        const smokeTime = elapsedTime + 123456789.123;
        smokeColor.instance.copy(gradientColor.start.instance);
        smokeColor.instance.lerp(new THREE.Color("#ffffff"), 0.1);
        for (const item of smokeItems) {
          item.mesh.rotation.z = smokeTime * item.rotationSpeed;
          item.mesh.position.y = Math.sin(smokeTime * item.floatingSpeed);
        }

        // Particles
        particleMaterial.uniforms.uTime.value = elapsedTime;
        if (!particleGeometry) {
          setParticleGeometry();
        }

        composer.render();
        if (searchParams.get("debug")) {
          controls.update();
        }

        // comet
        draw();

        requestAnimationFrame(tick);
      }
      // renderer.render(scene, camera);
      tick();

      /**
       * resize eventlistener
       */
      window.addEventListener("resize", () => {
        // Update sizes
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;

        sizes.pixelRatio = Math.min(Math.max(window.devicePixelRatio, 1), 2);

        // Update camera
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();

        // Update renderer
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        composer.setSize(sizes.width, sizes.height);
        composer.setPixelRatio(sizes.pixelRatio);
      });
    }

    render();
  }, []);

  return (
    <div className="w-screen h-screen fixed top-0 left-0">
      <CustomCamvas className="-z-50" ref={canvasRef} />
      <CustomCamvas className="-z-40" ref={cometCanvasRef} />
      <Title src={textlogo} />
      <img
        className="fixed -bottom-32 w-screen left-1/2 -translate-x-1/2"
        src={mainimg}
        style={{}}
      />
      {/* <div id="footer" className="absolute z-20 w-full bottom-0 h-[300px]">
        <svg
          id="scene"
          x="0px"
          y="0px"
          width="1600px"
          height="315px"
          className="h-full absolute left-1/2 -ml-[800px]"
        >
          <path
            id="ground"
            d="M0,316.4209c0,0,157.7119-35.416,469-56c7.3833-0.4883,23.7876-3.5488,31.3335-4.0166
                    c3.7681-0.2334,19.4302,0.9424,28.3335,0.3506c17.1494-1.1396,30.9072-4.2734,38.333-4.6836
                    c7.5972-0.4189,18.4058,0.3799,27.6665-0.9834c5.7075-0.8408,10.1318-4.042,14.9248-4.2705
                    c7.8369-0.373,24.5693,3.6084,34.4087,4.2705c11.0586,0.7432,15.2656-1.8135,24.3335-2.1523c10.0576-0.376,20.4629,1.3867,28.6665,0
                    c3.5957-0.6074,4.4194,0.4209,7.7227-0.7715c1.4927-0.5391,5.8179-3.5693,6.9438-4.2432c3.8335,0.667,6.1426-1.0732,9.917-1.167
                    c2.2739-0.0566,3.9673-0.9072,6.249-0.9609c2.2725-0.0537,5.5547-1.2383,7.8345-1.2881c2.25-0.0498,3.498,1.0352,5.7554,0.9883
                    c2.9648-0.0615,7.9341,0.3164,10.9111,0.2607c2.2461-0.042,2.4976-0.5195,4.7505-0.5586c2.9663-0.0518,2.1045-0.5615,5.0825-0.6074
                    c1.5811-0.0244,6.9976,0.4131,8.582,0.3896c0.8887-0.0127,2.6113,0.373,3.5015,0.3604c1.5527-0.0215,2.2739-0.4404,3.8296-0.4609
                    c1.416-0.0186,2.0854-0.8555,3.5039-0.873c1.0835-0.0127,2.9155,0.7939,4.0005,0.7813c1.1104-0.0127,3.5542,0.4805,4.666,0.4688
                    c1.3047-0.0137,1.2773-0.5332,2.584-0.5459c1.415-0.0137,1.165-0.4414,2.5825-0.4541c0.916-0.0078,3.499,0.3984,4.416,0.3906
                    c1.499-0.0127,1.833,0.6221,3.3345,0.6104c1.3296-0.0098,3.8267-0.666,5.1587-0.6748c1.3335-0.0088,2.8389-0.6514,4.1743-0.6592
                    c1.3335-0.0078,2.4971,0.6191,3.8325,0.6123c2.5518-0.0127,7.3579,0.3965,9.9175,0.3877c5.3169-0.0176,5.5796-0.4063,10.9297-0.4063
                    c1.8379,0,6.7031,1.3184,8.3203,1.2402c2.1055-0.1016,3.7139-1.6572,5.5283-1.7969c3.9541-0.3037,7.3262-0.5732,10.5986-0.2598
                    c6.248,0.5977,12.1973-0.8125,21.207-0.7539c1.7266,0.0107,15.7813,3.085,17.5,3.0977c3.4014,0.0254,6.6191-1.3398,9.9971-1.3066
                    c4.1221,0.041,8.2275,1.2529,12.3369,1.3066c2.0752,0.0273,4.1543-1.1084,6.2314-1.0771c3.3662,0.0498,4.5547,1.0166,7.9346,1.0771
                    c2.1104,0.0381,6.4063-0.834,8.5264-0.792c2.7021,0.0537,4.4766-1.6729,7.2002-1.6113c2.9277,0.0654,7.6465,3.1641,10.6074,3.2393
                    c4.8359,0.123,8.8809-0.9854,13.832-0.8359c2.5029,0.0752,11.8818,2.0498,14.375,2.1289c1.8398,0.0586,2.499-1.2188,4.334-1.1582
                    c2.1689,0.0713,4.5049,1.209,6.666,1.2832c2.6699,0.0908,4.3398-0.916,6.998-0.8203c3.3379,0.1201,6.0566,1.3193,9.377,1.4453
                    c4.001,0.1514,4.7764-1.1602,8.75-1c3.1836,0.1289,16.834,1.9912,20,2.125c4.0059,0.1699,4.0029-0.9004,7.9814-0.7227
                    c6.8594,0.3076,7.9102,1.7656,14.6855,2.0977c8.916,0.4365,23.5254-0.2432,32.293,0.2344
                    c6.7168,0.3662,13.3896,0.7432,20.0186,1.1318C1458.8545,268.4941,1680,316.4209,1680,316.4209H0z"
          />
          <path
            id="stone1"
            d="M680.3335,250.7549c7.3335,0.333,13.6665-1.2549,6-6.4609s-14.333-7.1221-18.6665,0.8359
                    S680.3335,250.7549,680.3335,250.7549z"
          />
          <path
            id="stone2"
            d="M750.5,243.1709c3.25,0,2.5-3.707-1.75-4.2285s-5,3.7285-3,4.2285S750.5,243.1709,750.5,243.1709z"
          />
          <path
            id="stone3"
            d="M988.4893,243.8242c2.8857,0.3467,4.8438,1.2627,3.0107-2.0703s-7.3955,1.3555-5.2031,1.7129
                    S988.4893,243.8242,988.4893,243.8242z"
          />
          <path
            id="stone4"
            d="M697,248.9355c2.0142-0.2021,2.1665-2.0156,1-2.1816s-9.1543,1.8398-5.9937,2.6699S697,248.9355,697,248.9355z"
          />
          <g id="greens" transform="translate(850, 180)">
            <g>
              <path
                d="M36.3877,59.4268C33.0576,18.9482,6.4658,4.522,6.4658,4.522s22.4834,16.1426,24.4414,54.2251
        C32.8657,96.8311,36.3877,59.4268,36.3877,59.4268z"
              />
              <path
                d="M41.8496,83.1641C31.1572,43.98,2.3711,34.6738,2.3711,34.6738s25.063,11.7471,33.9668,48.8271
        C45.2441,120.5791,41.8496,83.1641,41.8496,83.1641z"
              />
              <path
                d="M31.3955,60.7207C23.7139,25.7979,2.5381,16.9541,2.5381,16.9541s18.4165,10.9277,24.7925,43.9502
        C33.7061,93.9258,31.3955,60.7207,31.3955,60.7207z"
              />
              <path
                d="M40.4517,62.0068C47.9473,21.6187,25.4009,0.1914,25.4009,0.1914s18.0098,21.9634,9.7896,59.6357
        C26.9722,97.499,40.4517,62.0068,40.4517,62.0068z"
              />
              <path
                d="M41.9414,69.4316c13.0313-38.9565-6.3218-63.3062-6.3218-63.3062s14.7856,24.251,1.4141,60.4185
        C23.6621,102.709,41.9414,69.4316,41.9414,69.4316z"
              />
              <path
                d="M29.4976,87.9092c27.4097-30.5938,19.2993-60.6226,19.2993-60.6226s3.958,28.1255-22.6606,56.0249
        C-0.4775,111.2109,29.4976,87.9092,29.4976,87.9092z"
              />
              <animateTransform
                attributeName="transform"
                type="skewX"
                values="0;10;0"
                begin="0s"
                dur="5.5s"
                fill="freeze"
                repeatCount="indefinite"
              />
              <animateMotion
                type="translate"
                values="0,0;-10,0;0,0"
                begin="0s"
                dur="5.5s"
                fill="freeze"
                repeatCount="indefinite"
              />
            </g>
            <g>
              <path
                d="M34.9995,60.4189C56.0713,30.6665,46.1133,5.4014,46.1133,5.4014S52.2559,29.4746,31.6235,56.79
        C10.9917,84.1035,34.9995,60.4189,34.9995,60.4189z"
              />
              <path
                d="M36.3047,64.5391c28.4629-23.4443,25.3262-51.189,25.3262-51.189s-0.293,25.4971-27.6851,46.6538
        C6.5552,81.1631,36.3047,64.5391,36.3047,64.5391z"
              />
              <path
                d="M33.0449,70.502c31.4424-19.2637,32.1875-47.1748,32.1875-47.1748s-3.8291,25.208-33.897,42.3584
        C1.271,82.833,33.0449,70.502,33.0449,70.502z"
              />
              <path
                d="M13.8237,76.0244c36.5039-5.2158,48.2563-30.543,48.2563-30.543S48.5693,67.1045,14.168,70.9248
        C-20.2324,74.749,13.8237,76.0244,13.8237,76.0244z"
              />
              <animateTransform
                attributeName="transform"
                type="skewX"
                values="0;15;0"
                begin="0s"
                dur="5s"
                fill="freeze"
                repeatCount="indefinite"
              />
              <animateMotion
                type="translate"
                values="0,0;-15,0;0,0"
                begin="0s"
                dur="5s"
                fill="freeze"
                repeatCount="indefinite"
              />
            </g>
          </g>
          <g id="sign" transform="translate(700, 180)">
            <polygon
              points="21.2168,1.1143 20.6665,1.5459 19.7593,1.4473 19.229,1.4209 18.9707,1.6274 18.6665,1.9004 17.6865,1.9219
      37.3516,87.8877 40.8828,87.0791 	"
            />
            <polygon
              points="45.4111,9.5537 2.4258,18.7158 1.563,18.498 1.4585,17.2114 0.8291,15.583 0.9165,14.3364 0.0908,12.6548
      0.2085,12.0864 -0.1924,11.5308 -0.3296,9.271 43.3408,-0.0376 43.4766,0.5015 43.334,0.9629 43.6533,1.2046 43.8232,1.8784
      43.8965,2.7754 44.2217,3.459 44.625,5.0576 45.041,7.5459 45.2637,7.5962 45.6191,9.0073 	"
            />
            <polygon
              points="47.0078,20.8545 4.2368,29.5503 3.5933,28.5903 3.3965,26.9746 2.4683,24.5137 2.8398,24.1372 2.2676,23.7847
      1.9834,22.7563 2.2417,22.3394 1.7388,21.8706 1.2627,20.1426 44.8281,11.2852 45.082,12.4014 45.0723,12.9517 45.3281,13.481
      45.752,15.3369 46.0273,17.7524 46.4219,18.2803 	"
            />
            <polygon
              points="47.666,31.168 4.7803,39.4023 4.251,37.4004 4.4429,36.1895 3.6465,35.1123 3.0142,32.7178 3.2754,32.1025
      2.7461,31.7046 2.2676,29.8945 45.9268,21.5107 46.0762,22.2007 45.9512,22.8423 46.2783,23.1372 46.6777,24.9795 46.5234,25.4795
      47.3027,27.8667 47.8086,30.2017 	"
            />
          </g>
          <g id="boy_1_">
            <g id="boy">
              <path
                d="M800.7324,167.6929c0,0-7.9688-6.5039-9.7197-8.041c-1.751-1.5366-7.9331-6.5039-8.7197-13.0435
        c-0.7861-6.5396,6.0752-15.188,17.7969-16.1885c11.7207-1.0005,12.9727,1.0366,14.1514,2.7163
        c1.1787,1.6792,5.7178,11.1494,5.0752,18.6538c-0.6445,7.5049-5.6826,10.1133-9.7559,13.3652
        C805.4863,168.4072,800.7324,167.6929,800.7324,167.6929z"
              />
              <path
                d="M810.7031,169.2109c-1.0723-1.3037-1.3574-2.9556-1.1426-4.0645c0.2139-1.1084-8.041,0.1128-8.8281,2.542
        c1.6445,1.6787,0.751,3.146-0.5,4.1108c-1.25,0.9648-1.6797,1.502-1.9297,1.8237c0.0361,0.5361,0,0.9653,0,0.9653
        s-1.4297,1.7153-2.2871,6.5396s-0.6787,6.79-0.9648,8.3267c-0.2852,1.5366-1.4648,5.9678-1.751,10.292s0,4.5742,0,4.5742
        s1.251,1.7153,1.1436,4.0742s-1.2705,5.6099-1.2705,5.6099s0.2344,1.8945,1.8779,2.252c1.6445,0.3574,2.3594-0.6436,2.3594-0.6436
        s1.0713,1.3223,1.75,4.0742c0.6797,2.752,0.6436,6.79,1.8945,7.9688c1.251,1.1797,1.6074,0.3223,1.6074,0.3223
        s0.4648,3.3975-0.9277,6.6855c-1.3945,3.2881-4.1465,6.7568-4.1465,6.7568h11.0781c0,0,1.5723-3.5234-7.1113-2.2363
        c3.252-4.0742,3.8955-6.1934,4.0391-11.125c1.8223,0.5,4.252,0.6738,4.9316-0.3271c0.5352,1.3223,2.4297,2.1787,3.3584,1.7139
        c-0.2139,3.7168-1.0713,12.1846-1.0713,12.1846l9.0049,0.2852c0,0-0.751-3.2168-6.29-1.4307
        c1.001-6.7891,1.3584-11.5068,1.3584-11.5068s1.3584,0.1074,1.8584-0.3926c0.5-0.501,0.6787-5.3252-0.4648-9.9346
        c-1.1436-4.6104-0.5-4.4678-0.5-4.4678s1.75-0.8213,1.5-2.8584s-0.8574-3.6807-1.5352-5.5391
        c0.4639-0.1074,1-0.7861-0.6797-2.7158c-0.2148-2.5015-0.9648-6.3242-0.6436-7.6465s0.2148-2.8232-0.1787-4.3599
        c0-2.4302,0.7148-13.1509-1.25-17.0103c-1.9658-3.8594-2.5371-3.5737-2.5371-3.5737S812.5977,169.0142,810.7031,169.2109z"
              />
            </g>
            <g transform="translate(783, 122)">
              <g>
                <path
                  d="M35.3506,17.9644c2.9834-3.71,5.9824-15.2095-3.1846-18.3765c2.668,3.833,1.168,5.6665,1.168,5.6665
    S32,1.2549,28.666-0.4121c1.5,3.1665,0,5,0,5S20.5,8.9209,24.5,13.2544S35.3506,17.9644,35.3506,17.9644z"
                />
                <animateTransform
                  attributeName="transform"
                  type="skewX"
                  values="0;30;0"
                  begin="0s"
                  dur="4s"
                  fill="freeze"
                  repeatCount="indefinite"
                />
                <animateMotion
                  type="translate"
                  values="0,0;-10,0;0,0"
                  begin="0s"
                  dur="4s"
                  fill="freeze"
                  repeatCount="indefinite"
                />
              </g>
              <g>
                <path
                  d="M27.125,6.2334c-1.8125-0.625-2.0625-1.9375-4.375-2.25c1,0.8125,1.125,1.6875,1.125,1.6875S21.5,4.3584,19.0625,3.9834
    c1.3125,0.75,2,1.875,2,1.875s-3.25-0.75-5.875-0.75c1.125,0.3125,1.125,0.6875,1.125,0.6875S10.75,5.8584,8.6875,7.4834
    c1,0.125,0.9375,0.6714,0.9375,0.6714s-4.25,1.5786-5.375,3.7661c0.875-0.4375-0.8125,1.8125-0.8125,1.8125s0.75,1.375-0.3125,1.125
    S0.5,14.1084,0.5,12.5459c-0.5,2.1875,0.6924,2.5767,1.4375,3.3125c-0.0625,1-0.9375,2.6494-1.25,2.106s0.8594,0.4282,0.0547,2.4731
    c-0.8047,2.0459-1.1533,3.7432-0.5103,6.5195s2.7056,4.5264,3.5181,6.2139s0.5-1.6875,0.5-1.6875L27.125,6.2334z"
                />
              </g>
            </g>
          </g>
        </svg>
      </div> */}
    </div>
  );
};

const CustomCamvas = tw.canvas`
absolute
w-full
h-full
top-0
left-0
`;

const Title = tw.img`
absolute
left-1/2
-translate-x-1/2
top-1/2
-translate-y-full
text-slate-50/50
text-7xl
font-thin
-z-30
w-40
opacity-50
`;
