let net;
const webcamElement = document.getElementByID('webcam');

// This is the 'app' function
async function app() {
    console.log('Loading mobilenet..')

    // Load the model.
    net = await mobilenet.load();
    console.log('Sucessfully loaded model');

    await setupWebcam();
    while (true) {
        const result = await net.classify(webcamElement);
        
        document.getElementById('console').innerText = '
        prediction: ${result[0].className}\n
        probability: ${result[0].probability}
    ';
    
    // Give some breathing room by waiting for the next animation frame to fire.
    await tf.nextFrame();
    }
}

// This is the setup webcam function which will get media from user webcam
async function setupWebcam() {
    return new Promise((resolve,reject) => {
        const navigatorAny = navigator;
        navigator.getUserMedia = navigator.getUserMedia ||
            navigatorAny.webkitGetUserMedia || navigatorAny.mozGetuserMedia ||
            navigatorAny.msGetUserMedia;
        if (nagivator.getUserMedia) {
            navigator.getUserMedia({video: true},
                stream => {
                    webcamElement.srcObject = strem;
                    webcamElement.addEventListener('loadeddata', () => resolve(), false);
            },
            error => reject());
        } else {
            reject();
        }
    });
}

app();
