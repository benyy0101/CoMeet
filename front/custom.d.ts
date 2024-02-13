declare module "*.png";
declare module "*.jpeg";
declare module "*.svg" {
  const content: any;
  export default content;
}

declare module "*.glsl" {
  const value: string;
  export default value;
}
