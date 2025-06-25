export default function LoadingRipple({
  color = "#6B46C1", 
  duration = "2s",
  thickness = "4px",
  initialSize = "0px",
  finalSize = "100px",
  startOpacity = 0.7,
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
    </div>
  );
}