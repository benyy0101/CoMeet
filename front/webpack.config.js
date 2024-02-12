{
  module: {
    loaders: [
      {
        test: /\.(glsl|vs|fs)$/,
        loader: "ts-shader-loader",
      },
    ];
  }
}
