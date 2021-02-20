const params = getHashParams(),
  mode = typeof (params.mode) == 'undefined' ? 'webrtc' : params.mode,
  password = 'Qazxcdew13',
  application_name = 'videochat',
  account_name = 'berserg2010',
  showLog = true,
  widthRemoteVideo = 600
  heightRemoteVideo = 400

// let dialog,
let currentCall = null,
  outboundCall = null,
  showLocalVideoState = false,
  shareScreenState = false,
  fullScreenState = false,
  micState = true

// Control button
const switchMicStateButton = document.getElementById('switchMicStateButton')
const showLocalVideoButton = document.getElementById('showLocalVideoButton')
const shareScreenButton = document.getElementById('shareScreenButton')
const fullScreenButton = document.getElementById('fullScreenButton')
const callButton = document.getElementById('callButton')
const cancelButton = document.getElementById('cancelButton')

const remoteVideoContainer = document.getElementById('remoteVideoContainer')

function getHashParams() {
  let hashParams = {},
    e
  const a = /\+/g,  // Regex for replacing addition symbol with a space
    r = /([^&;=]+)=?([^&;]*)/g,
    d = (s) => {
      return decodeURIComponent(s.replace(a, " "))
    },
    q = window.location.hash.substring(1)

  while (e = r.exec(q))
    hashParams[d(e[1])] = d(e[2])

  return hashParams
}

switchMicStateButton.addEventListener('click', () => {
  log(`switchMicStateButton --> click : ${micState} -->`)
  switchMicState()
  log(`switchMicStateButton --> click : --> ${micState}`)
})

showLocalVideoButton.addEventListener('click', () => {
  log(`showLocalVideoButton -> click : ${showLocalVideoState} --`)

  showLocalVideo(!showLocalVideoState)
  currentCall !== null ? sendVideo(!showLocalVideoState) : null
  showLocalVideoState = !showLocalVideoState

  log(`showLocalVideoButton -> click : -- ${showLocalVideoState}`)
})

shareScreenButton.addEventListener('click', () => {
  log(`shareScreenButton -> click (${currentCall !== null})`)

  currentCall !== null ? shareScreen(!shareScreenState) : null
  shareScreenState = !shareScreenState
})

document.addEventListener('fullscreenchange', (e) => {
  log('fullscreenchange event -->')
  fullScreenState = document.fullscreenElement !== null
  console.info(`fullscreenchange event --> ${fullScreenState}`)
})

fullScreenButton.addEventListener('click', () => {
  log(`fullScreenButton --> ${fullScreenState}`)

  fullScreenMode(!fullScreenState)
  // fullScreenState = !fullScreenState
})

const callControlState = (disconnect = true) => {
  if (disconnect) {
    switchMicStateButton.setAttribute('disabled', 'disabled')
    shareScreenButton.setAttribute('disabled', 'disabled')
    fullScreenButton.setAttribute('disabled', 'disabled')

    cancelButton.setAttribute('hidden', 'hidden')
    cancelButton.removeEventListener('click', cancelButtonHandler)

    callButton.removeAttribute('hidden')
    callButton.addEventListener('click', createCall)

    // exitFullscreen()
  } else {
    switchMicStateButton.removeAttribute('disabled')
    shareScreenButton.removeAttribute('disabled')
    fullScreenButton.removeAttribute('disabled')

    callButton.setAttribute('hidden', 'hidden')
    callButton.removeEventListener('click', createCall)

    cancelButton.removeAttribute('hidden')
    cancelButton.addEventListener('click', cancelButtonHandler)
  }
}

const addHandlers = () => {
  currentCall.addEventListener(VoxImplant.CallEvents.Connected, onCallConnected)
  currentCall.addEventListener(VoxImplant.CallEvents.Disconnected, onCallDisconnected)
  currentCall.addEventListener(VoxImplant.CallEvents.Failed, onCallFailed)
  currentCall.addEventListener(VoxImplant.CallEvents.MediaElementCreated, onMediaElement)
  currentCall.addEventListener(VoxImplant.CallEvents.LocalVideoStreamAdded, onLocalVideoStream)
  currentCall.addEventListener(VoxImplant.CallEvents.EndpointAdded, onEndpointAdded)
}

const log = (str) => {
  console.info(str)
}

// create VoxImplant instance
const voxAPI = VoxImplant.getInstance()
// assign handlers
voxAPI.addEventListener(VoxImplant.Events.SDKReady, onSdkReady)
voxAPI.addEventListener(VoxImplant.Events.ConnectionEstablished, onConnectionEstablished)
voxAPI.addEventListener(VoxImplant.Events.ConnectionFailed, onConnectionFailed)
voxAPI.addEventListener(VoxImplant.Events.ConnectionClosed, onConnectionClosed)
voxAPI.addEventListener(VoxImplant.Events.AuthResult, onAuthResult)
voxAPI.addEventListener(VoxImplant.Events.IncomingCall, onIncomingCall)
voxAPI.addEventListener(VoxImplant.Events.MicAccessResult, onMicAccessResult)
voxAPI.addEventListener(VoxImplant.Events.SourcesInfoUpdated, onSourcesInfoUpdated)

// initialize SDK
try {
  voxAPI.init({
    micRequired: true, // force microphone/camera access request
    videoSupport: true, // enable video support
    progressTone: true, // play progress tone
    progressToneCountry: 'RU',
    localVideoContainerId: 'localVideoContainer', // element id for local video from camera or screen sharing
    remoteVideoContainerId: 'remoteVideoContainer',
    // showDebugInfo: true,
    // showWarnings: true,
  })
} catch (e) {
  log(e)
}

// SDK ready - functions can be called now
function onSdkReady() {
  log('onSdkReady')
  log(`onSDKReady version ${VoxImplant.version}`)
  log(`WebRTC supported: ${voxAPI.isRTCsupported()}`)

  voxAPI.connect()
}

// Connection with VoxImplant established
function onConnectionEstablished() {
  log(`onConnectionEstablished : ${voxAPI.connected()}`)

  login()
}

// Connection with VoxImplant failed
function onConnectionFailed() {
  log('onConnectionFailed')

  callControlState()

  // exitFullscreen()

  reconnectCall()
}

// Connection with VoxImplant closed
function onConnectionClosed() {
  log('onConnectionClosed')

  callControlState()

  // exitFullscreen()

  reconnectCall()
}

const reconnectCall = () => {
  setTimeout(() => {
    voxAPI.connect()
  }, 1000)
}

// Handle authorization result
function onAuthResult(e) {
  log(`onAuthResult : ${e.result}`)

  if (e.result) {
    const title = $('.personalArea-block__title').html() + ': logged in as ' + username
    $('.personalArea-block__title').html(title)

    callControlState()
    showLocalVideoButton.removeAttribute('disabled')
  } else {
    log(`Code: ${e.code}`)
  }
}

// Incoming call
function onIncomingCall(e) {
  currentCall = e.call

  log(`onIncomingCall : ${currentCall.number()}`)

  addHandlers()

  // Answer automatically
  currentCall.answer({
    receiveVideo: true,
    sendVideo: showLocalVideoState
  })
}

// Camera/mic access result
function onMicAccessResult(e) {
  log(`onMicAccessResult : ${e.result}`)

  // if (e.result) {
  //   // Access was allowed
  //   if (mode == 'webrtc') dialog.close();
  // } else {
  //   // Access was denied
  //   $('div.bootstrap-dialog').addClass('type-danger');
  //   dialog.setMessage('You have to allow access to your microphone to use the service');
  // }
}

// Audio & video sources info available
function onSourcesInfoUpdated() {
  log(`onSourcesInfoUpdated`)
  // var audioSources = voxAPI.audioSources(),
  //   videoSources = voxAPI.videoSources()
}

// Login function
const login = () => {
  log(username + '@' + application_name + '.' + account_name + '.voximplant.com')

  voxAPI.login(username + '@' + application_name + '.' + account_name + '.voximplant.com', password)
}

// Call connected
function onCallConnected(e) {
  log(`onCallConnected: ${currentCall.id()}`)

  remoteVideoContainer.classList.add('video-call--connected')
  callControlState(false)
}

// Call disconnected
function onCallDisconnected(e) {
  log('onCallDisconnected: ' + currentCall.id() + ' Call state: ' + currentCall.state())

  remoteVideoContainer.classList.remove('video-call--connected')
  exitFullscreen()

  // currentCall.hangup()
  currentCall = null

  callControlState()

}

// Call failed
function onCallFailed(e) {
  log(`
    CallFailed: ${currentCall.id()}, 
    code: ${e.code}, 
    reason: ${e.reason}
  `)

  callControlState()
  // exitFullscreen()
}

// Call's media element created
function onMediaElement(e) {
  // For WebRTC just using JS/CSS for transformation
  log(`onMediaElement`)
  console.info(e)
  // console.info(typeof e.element === 'HTMLVideoElement')
  // $video = $(e.element);
  // $video.appendTo('#voximplant_container');
  // $video.css('margin-left', '10px').css('width', '320px').css('height', '240px').css('float', 'left');
  // $video[0].play();
}

// Video stream from local screen sharing
const onLocalVideoStream = (e) => {
  console.log('onLocalVideoStream')
  console.log(e)

  if (e.type == 'sharing') {

    log(`onLocalVideoStream - if`)

    // shareButton.off('click').click(() => {
    //   currentCall.stopSharingScreen()
    //
    //   shareButton.off('click').click(function () {
    //     currentCall.shareScreen()
    //   })
    // })
  }
}

function onEndpointAdded(e) {
  log(`onEndpointAdded`)
  console.info(e)

  const endpoint = e.endpoint

  // remove the display element with this endpoint
  endpoint.on(VoxImplant.EndpointEvents.Removed, onEndpointRemoved)

  endpoint.addEventListener(VoxImplant.EndpointEvents.RemoteMediaAdded, onRemoteMediaAdded)
  endpoint.addEventListener(VoxImplant.EndpointEvents.RemoteMediaRemoved, onRemoteMediaRemoved)
}

function onRemoteMediaAdded(e) {
  log('RemoteMediaAdded')
  console.info(e)

  e.mediaRenderer.element.width=widthRemoteVideo
  e.mediaRenderer.element.height=heightRemoteVideo
  e.mediaRenderer.render(remoteVideoContainer)

  remoteVideoContainer.classList.add('video-call--connected')
}

function onEndpointRemoved(e) {
  log('onEndpointRemoved')

  remoteVideoContainer.classList.remove('video-call--connected')
}

function onRemoteMediaRemoved(e) {
  log(`onRemoteMediaRemoved`)

  remoteVideoContainer.classList.remove('video-call--connected')
}

// Create outbound call
function createCall() {
  log('createCall')

  callControlState(false)

  log(`Calling to ${getUser(false)}`)

  outboundCall = currentCall = voxAPI.call({
    number: getUser(false),
    video: {
      receiveVideo: true,
      sendVideo: showLocalVideoState
    },
    // H264first: true
  })

  addHandlers()
}

// Show/hide local video
const showLocalVideo = (flag = true) => {
  log(`showLocalVideo : ${flag}`)

  voxAPI.showLocalVideo(flag)
}

const switchMicState = () => {
  log(`switchMicState`)

  micState ? currentCall.muteMicrophone() : currentCall.unmuteMicrophone()

  micState = !micState
}

// Start/stop sending video
const sendVideo = (flag = true) => {
  currentCall.sendVideo(flag)
}

const shareScreen = (flag = true) => {
  flag ? currentCall.shareScreen(true, true) : currentCall.stopSharingScreen()
}

// Enable fullscreen
const fullScreenMode = (flag = true) => {
  if (mode == 'webrtc') {

    if (flag === true && currentCall != null) {
      // const elem = document.getElementById(currentCall.id())
      // const elem = remoteVideoContainer.querySelector('video')
      const elem = document.querySelector('.videoCall-main')

      if (elem.requestFullscreen) {
        elem.requestFullscreen('show')
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen('show')
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen('show')
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen('show')
      }
    } else {
      exitFullscreen()
    }
  }
}

const exitFullscreen = () => {
  document.exitFullscreen()
}

const cancelButtonHandler = () => {
  log('cancelButtonHandler')
  if (currentCall != null) {
    currentCall.hangup()
    // currentCall = null
  }
  callControlState()
}

const MicStatusHandler = (flag = false) => {
  log(`MicStatusHandler: ${flag}`)

  currentCall.handleMicStatus(flag)
}

// // Close connection with VoxImplant
// function closeConnection() {
//   voxAPI.disconnect()
// }
