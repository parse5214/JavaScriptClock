const App = () => {

  const [title, setTitle] = React.useState("Session")
  const [playing, setPlaying] = React.useState(false);
  const [breakLength, setBreakLength] = React.useState(5)
  const [sessionLength, setSessionLength] = React.useState(25)
  const [timeLeft, seTtimeLeft] = React.useState(1500)

  const timeout = setTimeout(() => {
    if(timeLeft && playing) seTtimeLeft(timeLeft - 1)
  }, 1000)

  const handleBreakIncrease = () => {
    if(breakLength < 60) setBreakLength(breakLength + 1)
  }

  const handleBreakDecrease = () => {
    if(breakLength > 1) setBreakLength(breakLength - 1)
  }

  const handleSessionIncrease = () => {
    if(sessionLength < 60){
      setSessionLength(sessionLength + 1)
      seTtimeLeft(timeLeft + 60)
    }
  }
  
  const handleSessionDecrease = () => {
    if(sessionLength > 1){
      setSessionLength(sessionLength - 1)
      seTtimeLeft(timeLeft - 60)
    }
  }

  const handleReset = () => {
    clearTimeout(timeout)
    setPlaying(false)
    seTtimeLeft(1500)
    setBreakLength(5)
    setSessionLength(25)
    setTitle("Session");
    const audio = document.getElementById("audioClip")
    audio.pause()
    audio.currentTime = 0
  }

  const handlePlay = () => {
    clearTimeout(timeout)
    setPlaying(!playing)
  }

  const resetTimer = () => {
    const audio = document.getElementById("audioClip");
    if(!timeLeft && title === "Session"){
      seTtimeLeft(breakLength * 60)
      setTitle("Break")
      audio.play()
    }
    if(!timeLeft && title === "Break"){
      seTtimeLeft(sessionLength * 60)
      setTitle("Session")
      audio.pause()
      audio.currentTime = 0
    }
  }

  const clock = () => {
    if(playing){
      timeout
      resetTimer()
    }else {
      clearTimeout(timeout)
    }
  }

  React.useEffect(() => {
    clock()
  }, [playing, timeLeft, timeout])

  const timeFormatter = () => {
    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft - minutes * 60
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds
    return `${formattedMinutes}:${formattedSeconds}`
  }

  return (
    <div className="container-fluid bg-dark min-vh-100 text-white">
      <div className="row text-center p-5">
        <h1>25 + 5 Clock</h1>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="row justify-content-center">
            <div className="col-6 text-center">
              <h3 id="break-label">Break<br />Length</h3>
            </div>
            <div className="col-6 text-center">
              <h3 id="session-label">Session<br />Length</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="row py-3 justify-content-center">
            <div className="col-6 text-center"><h3>{breakLength}</h3></div>
            <div className="col-6 text-center"><h3>{sessionLength}</h3></div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="row py-3 justify-content-center">
            {/*For break*/}
            <div className="col-3 text-center">
              <button type="button" className="btn btn-outline-info form-control" disabled={playing} onClick={handleBreakIncrease} id="break-increment"><h4>+</h4></button>
            </div>
            <div className="col-3 text-center">
              <button type="button" className="btn btn-outline-light form-control" disabled={playing} onClick={handleBreakDecrease} id="break-decrement"><h4>-</h4></button>
            </div>
            {/*For session*/}
            <div className="col-3 text-center">
              <button type="button" className="btn btn-outline-info form-control" disabled={playing} onClick={handleSessionIncrease} id="session-increment"><h4>+</h4></button>
            </div>
            <div className="col-3 text-center">
              <button type="button" className="btn btn-outline-light form-control" disabled={playing} onClick={handleSessionDecrease} id="session-decrement"><h4>-</h4></button>
            </div>
          </div>
        </div>
      </div>
      <div className="row py-5 justify-content-center">
        <div className="col-md-3 col-6">
          <div className="row border rounded-pill text-center">
            <div className="py-3"><h3 id="timer-label">{title}</h3></div>
            <div className="py-3"><h3 id="timer-left">{timeFormatter()}</h3></div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="row justify-content-center">
            <div className="col-6 text-center">
              <button type="button" className="btn btn-success form-control" onClick={handlePlay} id="start_stop"><h4>Start/Stop</h4></button>
            </div>
            <div className="col-6 text-center">
              <button type="button" className="btn btn-danger form-control" onClick={handleReset} id="reset"><h4>Reset</h4></button>
            </div>
          </div>
        </div>
      </div>
      <audio id="audioClip" preload="auto" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" />
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)