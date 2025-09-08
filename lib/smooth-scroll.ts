export function smoothScrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);
  if (!element) return;

  const headerHeight = 80;
  const elementPosition = element.offsetTop - headerHeight;
  
  // More sophisticated easing function
  const easeInOutQuart = (t: number): number => {
    return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
  };

  const startPosition = window.pageYOffset;
  const distance = elementPosition - startPosition;
  const duration = Math.min(Math.max(Math.abs(distance) / 3, 400), 1200); // Between 400ms and 1.2s
  let startTime: number | null = null;

  function animation(currentTime: number) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    
    const easedProgress = easeInOutQuart(progress);
    const newPosition = startPosition + distance * easedProgress;
    
    window.scrollTo(0, newPosition);
    
    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  }
  
  requestAnimationFrame(animation);
}