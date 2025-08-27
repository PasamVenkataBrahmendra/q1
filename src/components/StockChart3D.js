import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Line } from '@react-three/drei';
import * as THREE from 'three';
import './StockChart3D.css';

// 3D Line component for stock data visualization
const StockLine = ({ points, color, width = 0.05 }) => {
  const lineRef = useRef();
  
  useFrame(() => {
    if (lineRef.current) {
      lineRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={lineRef}>
      <Line
        points={points}
        color={color}
        lineWidth={width}
        dashed={false}
      />
      {/* Add points at each data point */}
      {points.map((point, index) => (
        <mesh key={index} position={point}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
        </mesh>
      ))}
    </group>
  );
};

// Prediction marker component
const PredictionMarker = ({ position, prediction }) => {
  const color = prediction === 'up' ? '#00c853' : '#ff3d00';
  const arrowDirection = prediction === 'up' ? [0, 1, 0] : [0, -1, 0];
  
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.7} />
      </mesh>
      <arrowHelper args={[new THREE.Vector3(...arrowDirection), new THREE.Vector3(0, 0, 0), 0.5, color, 0.2, 0.1]} />
      <Text
        position={[0.3, prediction === 'up' ? 0.3 : -0.3, 0]}
        fontSize={0.15}
        color={color}
        anchorX="left"
        anchorY="middle"
      >
        {prediction === 'up' ? 'BUY' : 'SELL'}
      </Text>
    </group>
  );
};

// Grid component
const Grid = ({ size = 10, divisions = 10, color = '#444444' }) => {
  return (
    <>
      <gridHelper args={[size, divisions, color, color]} />
      <axesHelper args={[5]} />
    </>
  );
};

// Main 3D Stock Chart component
const StockChart3D = ({ stockData, prediction }) => {
  // Process stock data into 3D points
  const processData = () => {
    if (!stockData || stockData.length === 0) {
      return {
        pricePoints: [],
        volumePoints: [],
        predictionPoint: [0, 0, 0]
      };
    }

    // Normalize data for visualization
    const maxPrice = Math.max(...stockData.map(d => d.price));
    const minPrice = Math.min(...stockData.map(d => d.price));
    const maxVolume = Math.max(...stockData.map(d => d.volume));
    
    const priceRange = maxPrice - minPrice;
    const pricePoints = stockData.map((d, i) => {
      const x = i * 0.5 - (stockData.length * 0.5) / 2; // Spread points along x-axis
      const y = ((d.price - minPrice) / priceRange) * 3; // Normalize price to y-axis
      const z = 0; // Keep prices on z=0 plane
      return [x, y, z];
    });

    const volumePoints = stockData.map((d, i) => {
      const x = i * 0.5 - (stockData.length * 0.5) / 2; // Same x position as price
      const y = 0; // Keep volumes at y=0
      const z = (d.volume / maxVolume) * 2; // Normalize volume to z-axis
      return [x, y, z];
    });

    // Last point for prediction marker
    const lastIndex = stockData.length - 1;
    const predictionPoint = [
      lastIndex * 0.5 - (stockData.length * 0.5) / 2 + 0.5,
      ((stockData[lastIndex].price - minPrice) / priceRange) * 3,
      0
    ];

    return { pricePoints, volumePoints, predictionPoint };
  };

  const { pricePoints, volumePoints, predictionPoint } = processData();

  return (
    <div className="stock-chart-3d">
      <Canvas camera={{ position: [5, 5, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <fog attach="fog" args={['#070b34', 10, 20]} />
        
        {/* Controls */}
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
        
        {/* Grid and axes */}
        <Grid />
        
        {/* Stock data visualization */}
        {pricePoints.length > 0 && (
          <>
            <StockLine points={pricePoints} color="#6c63ff" width={0.1} />
            <StockLine points={volumePoints} color="#00d4ff" width={0.05} />
            <PredictionMarker position={predictionPoint} prediction={prediction} />
          </>
        )}
        
        {/* Labels */}
        <Text position={[-5, 3, 0]} fontSize={0.3} color="white" anchorX="left">
          Price
        </Text>
        <Text position={[-5, 0, 2]} fontSize={0.3} color="white" anchorX="left">
          Volume
        </Text>
        <Text position={[0, -1, 0]} fontSize={0.3} color="white" anchorY="top">
          Time
        </Text>
      </Canvas>
    </div>
  );
};

export default StockChart3D;