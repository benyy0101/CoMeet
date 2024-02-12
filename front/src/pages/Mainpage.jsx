import GUI from "lil-gui";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import particleMask from "assets/texture/particleMask.png";
import SmokeTexture from "assets/texture/smoke.png";

const DEBUG = true;

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

  useEffect(() => {
    async function render() {
      /**
       * 기본 세팅
       */
      let gui;
      if (DEBUG) {
        gui = new GUI({ autoPlace: true });
        gui.domElement.id = "gui";
      }
      const canvas = canvasRef.current;
      const scene = new THREE.Scene();

      const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      const camera = new THREE.PerspectiveCamera(
        55,
        sizes.width / sizes.height,
        0.1,
        150
      );
      camera.position.z = 5;

      const controls = new OrbitControls(camera, canvas);
      controls.enableDamping = true;

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      const pointLight = new THREE.PointLight(0xff0000, 3);
      scene.add(directionalLight);
      scene.add(pointLight);

      const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
      renderer.setClearColor(0x010101, 1);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(sizes.width, sizes.height);
      renderer.render(scene, camera);

      /**
       * Gradient
       */
      let gradientDebugFolder;
      if (DEBUG) {
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
      const gradientGeometry = new THREE.PlaneGeometry(2, 2);

      if (DEBUG) {
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
          uSaturation: { value: 0.32 },
          uLightness: { value: 0.38 },
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

      if (DEBUG) {
        gradientDebugFolder
          .add(gradientMaterial.uniforms.uSaturation, "value", 0, 1)
          .name("채도");
        gradientDebugFolder
          .add(gradientMaterial.uniforms.uLightness, "value", 0, 1)
          .name("밝기");
      }

      const gradientMesh = new THREE.Mesh(gradientGeometry, gradientMaterial);
      scene.add(gradientMesh);

      /**
       * Particles
       */

      const particleCount = { value: 2000 };

      let particleDebugFolder;
      if (DEBUG) {
        particleDebugFolder = gui.addFolder("Particle");
      }
      let particleGeometry;
      function setParticleGeometry() {
        if (particleGeometry) {
          particleGeometry.dispose();
        }
        particleGeometry = new THREE.BufferGeometry();
        const particlePositionArray = new Float32Array(particleCount.value * 3);
        const particleProgressArray = new Float32Array(particleCount.value);
        const particleSizeArray = new Float32Array(particleCount.value);
        const particleAlphaArray = new Float32Array(particleCount.value);

        for (let i = 0; i < particleCount.value; i++) {
          particlePositionArray[i * 3] = (Math.random() - 0.5) * 20;
          particlePositionArray[i * 3 + 1] = 0;
          particlePositionArray[i * 3 + 2] = (Math.random() - 0.5) * 10;

          particleProgressArray[i] = Math.random();
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
        particleGeometry.needsUpdate = true;
      }
      setParticleGeometry();

      const particleMaterial = new THREE.ShaderMaterial({
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        uniforms: {
          uSize: { value: 25 },
          uTime: { value: 0 },
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
      scene.add(particlePoints);

      if (DEBUG) {
        particleDebugFolder
          .add(particleCount, "value", 100, 500000, 1)
          .name("갯수")
          .onChange(() => {
            setParticleGeometry();
            particlePoints.geometry = particleGeometry;
          });
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
       * Smoke
       */

      const smokeCount = { value: 10 };
      const smokeGroup = new THREE.Group();
      smokeGroup.position.y = -2;
      scene.add(smokeGroup);

      let smokeDebugFolder;
      if (DEBUG) {
        smokeDebugFolder = gui.addFolder("Smoke");
      }

      const smokeColor = {};
      smokeColor.value = "#1a2036";
      smokeColor.instance = new THREE.Color(smokeColor.value);

      if (DEBUG) {
        smokeDebugFolder
          .addColor(smokeColor, "value", { view: "color" })
          .name("색상")
          .onChange(() => {
            smokeColor.instance.set(smokeColor.value);
          });
      }

      const smokeGeometry = new THREE.PlaneGeometry(1, 1);
      let smokeMaterial;

      if (DEBUG) {
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
          opacity: 0.05 + Math.random() * 0.2,
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
      if (DEBUG) {
        vignetteDebugFolder = gui.addFolder("Vignette");
      }

      const vignetteColor = {};
      vignetteColor.value = "#1a2036";
      vignetteColor.instance = new THREE.Color(vignetteColor.value);
      const vignetteGeometry = new THREE.PlaneGeometry(2, 2);

      if (DEBUG) {
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
          uMultiplier: { value: 1 },
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

        varying vec2 vUv;
        
        void main()
        {
          float alpha = length(vUv - 0.5);

          gl_FragColor = vec4(uColor, alpha);
        }
        `,
      });
      vignetteMaterial.needsUpdate = true;

      const vignetteMesh = new THREE.Mesh(vignetteGeometry, vignetteMaterial);
      scene.add(vignetteMesh);

      if (DEBUG) {
        vignetteDebugFolder
          .add(vignetteMaterial.uniforms.uOffset, "value", -1, 1, 0.001)
          .name("offset");
        vignetteDebugFolder
          .add(vignetteMaterial.uniforms.uMultiplier, "value", 0, 2, 0.001)
          .name("배율");
      }

      /**
       * 업데이트 함수
       */
      const clock = new THREE.Clock();
      let previousTime = 0;

      function tick() {
        const elapsedTime = clock.getElapsedTime();
        const deltaTime = elapsedTime - previousTime;
        previousTime = elapsedTime;

        /**
         * Logic
         */

        // Gradient
        gradientColor.start.value = `hsl(${elapsedTime * 10}, ${gradientColor.start.saturation}%, ${gradientColor.start.lightness}%)`;
        gradientColor.start.instance.set(gradientColor.start.value);
        gradientMaterial.uniforms.uTime.value = elapsedTime;

        // Particles
        particleMaterial.uniforms.uTime.value = elapsedTime;

        // Smokes
        const smokeTime = elapsedTime + 123456789.123;
        smokeColor.instance.copy(gradientColor.start.instance.clone());
        smokeColor.instance.lerp(new THREE.Color("#ffffff"), 0.1);
        for (const item of smokeItems) {
          item.mesh.rotation.z = smokeTime * item.rotationSpeed;
          item.mesh.position.y = Math.sin(smokeTime * item.floatingSpeed);
        }

        // Vignette

        renderer.render(scene, camera);
        requestAnimationFrame(tick);
      }
      tick();

      /**
       * resize eventlistener
       */
      window.addEventListener("resize", () => {
        // Update sizes
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;

        // Update camera
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();

        // Update renderer
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      });
    }

    render();
  }, []);

  return (
    <div className="w-screen h-screen absolute top-0 left-0">
      <canvas ref={canvasRef} />
    </div>
  );
};
