export default function LoadingRipple({
  color = "#ADD8E6", 
  duration = "3s",
  thickness = "5px",
  initialSize = "0px",
  finalSize = "200px",
  startOpacity = 0.9,
  endOpacity = 0,
  easeFunction = "cubic-bezier(0, 0.2, 0.8, 1)"
}) {
  return (
    <div
      style={{
        '--ripple-main-color': color,
        '--ripple-animation-duration': duration,
        '--ripple-border-thickness': thickness,
        '--ripple-initial-size': initialSize,
        '--ripple-final-size': finalSize,
        '--ripple-start-opacity': startOpacity,
        '--ripple-end-opacity': endOpacity,
        '--ripple-ease-function': easeFunction,
      }}
      className="ripple-loader" 
    >
      <span></span>
      <span></span>
      <span></span> 
      <span></span> 
      <span></span> 
      <span></span> 
    </div>
  );
}