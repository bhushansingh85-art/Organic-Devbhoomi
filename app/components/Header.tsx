<style>{`
        @keyframes overlayStepReveal {
          0% {
            opacity: 0;
            clip-path: inset(68px 0 85% 0);
          }
          30% {
            opacity: 1;
            clip-path: inset(68px 0 62% 0);
          }
          65% {
            opacity: 1;
            clip-path: inset(68px 0 32% 0);
          }
          100% {
            opacity: 1;
            clip-path: inset(68px 0 0 0);
          }
        }

        @keyframes bigLeafEnter {
          0% {
            opacity: 0;
            transform: translate3d(-70px, 20px, 0) rotate(-14deg) scale(0.84);
          }
          35% {
            opacity: 0.9;
            transform: translate3d(-28px, 8px, 0) rotate(-6deg) scale(0.94);
          }
          72% {
            opacity: 1;
            transform: translate3d(8px, -2px, 0) rotate(2deg) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
          }
        }

        .leaf-screen-overlay {
          position: fixed;
          inset: 0;
          padding: 84px 20px 28px;
          background: rgba(12, 34, 24, 0.72);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          z-index: 9999;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 14px;
          overflow-y: auto;
          will-change: clip-path, opacity;
          animation: overlayStepReveal 0.85s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .big-leaf-btn {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          width: 100%;
          min-height: 68px;
          padding: 16px 24px;
          text-decoration: none;
          font-size: 20px;
          font-weight: 700;
          color: #ffffff;
          background-color: #40916c;
          border: 2px solid #74c69d;
          border-radius: 8px 56px 10px 56px;
          box-shadow: 0 14px 28px rgba(0, 0, 0, 0.28);
          cursor: pointer;
          will-change: transform, opacity;
          animation: bigLeafEnter 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
          transition: transform 0.22s ease, background-color 0.22s ease;
        }

        .big-leaf-btn:hover {
          transform: translateX(8px) scale(1.01);
          background-color: #2d6a4f;
        }
      `}</style>