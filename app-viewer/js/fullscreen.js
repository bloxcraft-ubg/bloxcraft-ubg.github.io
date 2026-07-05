function toggleIframeFullscreen() {
        const container = document.getElementById('iframe-container');
        let targetFrame = container ? container.querySelector('iframe') : null;
        
        if (!targetFrame) {
          targetFrame = document.getElementById('viewerFrame');
        }

        if (targetFrame) {
          if (!document.fullscreenElement) {
            if (targetFrame.requestFullscreen) {
              targetFrame.requestFullscreen();
            } else if (targetFrame.webkitRequestFullscreen) { 
              targetFrame.webkitRequestFullscreen();
            } else if (targetFrame.msRequestFullscreen) { 
              targetFrame.msRequestFullscreen();
            }
          } else {
            document.exitFullscreen();
          }
        } else {
          console.warn("Fullscreen target frame not found.");
        }
      }
