// var firstHref = $("a[href^='http']").eq(0).attr("href");
// alert(firstHref )
// console.log(firstHref);
console.log('Hei!');


chrome.runtime.onMessage.addListener(recievedMessage);

function recievedMessage(messageResponse, sender, sendResponse) {
    console.log(messageResponse.response);

    var sc = document.createElement("script");
    sc.setAttribute("src", "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest");
    sc.setAttribute("type", "text/javascript");
    document.head.appendChild(sc);
    sc.async = true;
    sc.onload = function() {
        // alert("Tf js Script loaded and ready for usage!");
        console.log("Tf js Script loaded and ready for usage!");
    };
   
    var st = document.createElement("script");
    st.setAttribute("src", "https://cdn.jsdelivr.net/npm/@tensorflow-models/toxicity");
    st.setAttribute("type", "text/javascript");
    st.async = true;
    document.head.appendChild(st);
    st.onload = function() {
        // alert("Model is loaded for inference!");
        console.log("Toxicity Model script is started loading!");
    };    

    var newHTML = document.documentElement.innerHTML;
    var separat = newHTML.split(".");
    console.log(separat);


    var isload = "0";
    console.log('start');
    function waitForElement(text){
        console.log(window.isload);
        if(typeof window.isload == typeof "1" ){

            //variable exists, do what you want
            console.log('Toxicity Model is loaded and ready for inference!');

            
            
            var counter = 0;
            const threshold = 0.9;
            toxicity.load(threshold).then(model => {
                for (index = 0; index < text.length; index++) {
                    model.classify(text).then(predictions => {
                    //console.log(predictions);
                    for(i=0; i<7; i++){
                        if(predictions[i].results[0].match){
                            counter++;
                            
                            }  
                        }
                    });
                }
            })
            alert(counter)

        }
        else{
            console.log('Toxicity Model not found, waiting for 5 seconds!');
            // 0.50 seconds => 500
            setTimeout(waitForElement, 5000);
            window.isload="1";
        }
    }

    waitForElement(separat);
}