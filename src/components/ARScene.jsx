import { useEffect, useRef } from 'react';

import 'aframe';
import 'mind-ar/dist/mindar-image-aframe.prod.js';

export const ARScene = () => {
  const sceneRef = useRef(null);

  useEffect(() => {
    if (!sceneRef.current) {
      return;
    }

    const sceneElement = sceneRef.current;

    let arSystem;
    const sceneLoadedListener = () => {
      arSystem = sceneElement.systems['mindar-image-system'];
      arSystem.start();
    };
    sceneElement.addEventListener('loaded', sceneLoadedListener);

    return () => {
      arSystem?.stop();
      sceneElement.removeEventListener('loaded', sceneLoadedListener);
    };
  }, []);

  return (
    <a-scene
      ref={sceneRef}
      mindar-image="imageTargetSrc: /targets/presentation.mind; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;"
      color-space="sRGB"
      renderer="colorManagement: true, physicallyCorrectLights"
      vr-mode-ui="enabled: false"
      device-orientation-permission-ui="enabled: false"
    >
      <a-assets>
        <img id="english" src="/jalasoft/english.webp" />
        <a-asset-item id="doubleBass" src="/university/double-bass.glb"></a-asset-item>
        <a-asset-item id="laboratory" src="/jalafoundation/laboratory.glb"></a-asset-item>
        <a-asset-item id="question" src="/jalasoft/question.glb"></a-asset-item>
        <a-asset-item id="heads" src="/end/heads.glb"></a-asset-item>
        <a-asset-item id="books" src="/jalasoft/books.glb"></a-asset-item>
      </a-assets>

      <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

      {/* University */}
      <a-entity mindar-image-target="targetIndex: 0">
        <a-gltf-model
          rotation="0 0 "
          position="0 -0.7 0"
          scale="0.005 0.005 0.005"
          src="#doubleBass"
        />
      </a-entity>

      {/* AT */}
      <a-entity mindar-image-target="targetIndex: 1">
        <a-gltf-model rotation="0 0 0" position="0 0 0" scale="1 1 1" src="#laboratory" />
      </a-entity>

      {/*Jalasoft*/}
      <a-entity mindar-image-target="targetIndex: 2">
        <a-plane
          src="#english"
          position="0 0 0"
          height="0.726"
          width="2"
          rotation="0 0 0"
        ></a-plane>
        <a-gltf-model
          rotation="0 0 0 "
          position="0 0 0.1"
          scale="0.1 0.1 0.1"
          src="#question"
          animation="property: position; to: 0 0 1; dur: 1000; easing: easeInOutQuad; loop: true; dir: alternate"
        />
      </a-entity>

      {/* Research */}
      <a-entity mindar-image-target="targetIndex: 3">
        <a-gltf-model rotation="0 0 0" position="0.2 -0.2 0" scale="0.01 0.01 0.01" src="#books" />
      </a-entity>

      {/* Words */}
      <a-entity mindar-image-target="targetIndex: 4">
        <a-gltf-model rotation="0 0 0 " position="-0.3 0 0.1" scale="0.4 0.4 0.4" src="#heads" />
      </a-entity>
    </a-scene>
  );
};
