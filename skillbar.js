
    const progText = document.querySelectorAll(".prog-text");
    const progress = document.querySelectorAll(".progress");
    const progContainer = document.querySelector(".container");
    let started = false;

    function startProgressAnimation() {
      if (started) return;
      started = true;

      progText.forEach((text, i) => {
        let count = 0;
        const target = parseInt(text.dataset.count);

        const animate = () => {
          if (count <= target) {
            progress[i].style.background = `conic-gradient(#16ff86 ${count * 3.6}deg, #222 0deg)`;
            text.innerText = count + "%";
            count++;
            requestAnimationFrame(animate);
          } else {
            text.innerText = target + "%";
          }
        };
        animate();
      });
    }

    window.addEventListener("scroll", () => {
      const triggerPoint = progContainer.offsetTop - window.innerHeight + 200;
      if (window.scrollY > triggerPoint) {
        startProgressAnimation();
      }
    });