"use client";

import { useEffect, useRef } from "react";

interface LiquidEtherProps {
  colors?: string[];
  mouseForce?: number;
  cursorSize?: number;
  isViscous?: boolean;
  viscous?: number;
  iterationsViscous?: number;
  iterationsPoisson?: number;
  resolution?: number;
  isBounce?: boolean;
  autoDemo?: boolean;
  autoSpeed?: number;
  autoIntensity?: number;
  takeoverDuration?: number;
  autoResumeDelay?: number;
  autoRampDuration?: number;
}

export default function LiquidEther({
  colors = ["#FAA31B", "#FFB84D", "#FFD700"],
  mouseForce = 20,
  cursorSize = 100,
  isViscous = false,
  viscous = 30,
  iterationsViscous = 32,
  iterationsPoisson = 32,
  resolution = 0.5,
  isBounce = false,
  autoDemo = true,
  autoSpeed = 0.5,
  autoIntensity = 2.2,
  takeoverDuration = 0.25,
  autoResumeDelay = 3000,
  autoRampDuration = 0.6,
}: LiquidEtherProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create canvas for liquid effect
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.pointerEvents = "none";
    canvas.style.opacity = "0.6";
    canvas.style.zIndex = "1";

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    container.appendChild(canvas);

    // Liquid simulation variables
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
    }> = [];

    const numParticles = 15;
    const baseRadius = 80;

    // Initialize particles
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: baseRadius + Math.random() * 40,
        color: colors[i % colors.length],
      });
    }

    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;
    let isMouseActive = false;

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      isMouseActive = true;
    };

    const handleMouseLeave = () => {
      isMouseActive = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Animation loop
    let animationId: number;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      time += autoSpeed * 0.01;

      particles.forEach((particle, i) => {
        // Auto demo movement
        if (autoDemo && !isMouseActive) {
          particle.x += Math.sin(time + i) * autoIntensity;
          particle.y += Math.cos(time + i * 0.5) * autoIntensity;
        }

        // Mouse interaction
        if (isMouseActive) {
          const dx = mouseX - particle.x;
          const dy = mouseY - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = cursorSize;

          if (distance < maxDistance) {
            const force = (1 - distance / maxDistance) * mouseForce;
            particle.vx += (dx / distance) * force * 0.01;
            particle.vy += (dy / distance) * force * 0.01;
          }
        }

        // Apply viscosity
        if (isViscous) {
          particle.vx *= 1 - viscous * 0.001;
          particle.vy *= 1 - viscous * 0.001;
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Boundary collision
        if (isBounce) {
          if (particle.x < particle.radius || particle.x > canvas.width - particle.radius) {
            particle.vx *= -0.8;
            particle.x = Math.max(particle.radius, Math.min(canvas.width - particle.radius, particle.x));
          }
          if (particle.y < particle.radius || particle.y > canvas.height - particle.radius) {
            particle.vy *= -0.8;
            particle.y = Math.max(particle.radius, Math.min(canvas.height - particle.radius, particle.y));
          }
        } else {
          // Wrap around
          if (particle.x < -particle.radius) particle.x = canvas.width + particle.radius;
          if (particle.x > canvas.width + particle.radius) particle.x = -particle.radius;
          if (particle.y < -particle.radius) particle.y = canvas.height + particle.radius;
          if (particle.y > canvas.height + particle.radius) particle.y = -particle.radius;
        }

        // Draw particle with gradient
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.radius
        );
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(0.5, particle.color + "80");
        gradient.addColorStop(1, particle.color + "00");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    };
  }, [
    colors,
    mouseForce,
    cursorSize,
    isViscous,
    viscous,
    resolution,
    isBounce,
    autoDemo,
    autoSpeed,
    autoIntensity,
  ]);

  return <div ref={containerRef} style={{ width: "100%", height: "100%", position: "relative" }} />;
}



