import React, { useState, useEffect, useRef } from "react";

export default function useScroll(target, setViewbox) {
  //scroll
  useEffect(
    () => {
      const onWheel = e => {
        e.preventDefault();
        if (e.ctrlKey) {
          //zoom
          const perX = e.offsetX / target.clientWidth;
          const perY = e.offsetY / target.clientHeight;
          const scale = 1 + e.deltaY * 0.01;
          setViewbox(prev => ({
            x: prev.x - prev.width * perX * e.deltaY * 0.01,
            y: prev.y - prev.height * perY * e.deltaY * 0.01,
            width: prev.width * scale,
            height: prev.height * scale
          }));
        } else {
          //translate
          setViewbox(prev => {
            const scale = prev.width / target.clientWidth;
            return {
              ...prev,
              x: prev.x + scale * e.deltaX,
              y: prev.y + scale * e.deltaY
            };
          });
        }
      };
      window.addEventListener("wheel", onWheel, { passive: false });
      return () => window.removeEventListener("wheel", onWheel);
    },
    [target]
  );
}
