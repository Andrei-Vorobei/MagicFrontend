declare module '*.module.scss' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames;
  export = classNames;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module "*.svg" {
    import React from "react";
    const SVG: React.FC<React.SVGProps<SVGSVGElement>>;
    export default SVG;
}

declare const __PLATFORM__: 'desktop' | 'mobile';

// declare module '@material-ui/core/styles' {
// import { PaletteColor, PaletteColorOptions } from "@material-ui/core/styles/createPalette";

//   interface Palette {
//     danger: PaletteColor;
//     success: PaletteColor;
//     warning: PaletteColor;
//   }
//   interface PaletteOptions {
//     danger?: PaletteColorOptions;
//     success?: PaletteColorOptions;
//     warning?: PaletteColorOptions;
//   }
// }

// declare module '@material-ui/core/Button' {
//   interface ButtonPropsColorOverrides {
//     danger: true;
//     success: true;
//     warning: true;
//   }
// }