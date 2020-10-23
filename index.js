/*
Asynchronous Web App that sends an API request for park data from National Park Service. 
App allows user to search U.S National Parks by state and returns: 
park names, description, address, and park website.
*/


function displayResults(data,selectedStates){

    //clears out results div for new search results
    $('#ol-results').empty();

        console.log(data);
        console.log(typeof(data));

    /*Personal Note on the json data in for loop below:
        //we have an object, inside the object we have an array, 
        //inside the array we have multiple objects
        //inside those multiple objects are the results
        //{[{key:value}]}  */

    let outputResults = [];

    //for loop to iterate through responsed data and push: name, description, website results to HTML
    //pushes results to outputResults array
    for (let i=0; i<data.data.length;i++){
        if(data.data[i].addresses[0] !== undefined){
            outputResults.push(
            `<li><h3>⛰️Park Name: <u>${data.data[i].fullName}</u></h3>
            <p>Description: ${data.data[i].description}</p> 
            <p>🔗 Website: <a href=${data.data[i].url} target="_blank">${data.data[i].fullName}</a></p>
            <p>📍 Physical Address: ${data.data[i].addresses[0].line1},
            ${data.data[i].addresses[0].city},
            ${data.data[i].addresses[0].stateCode},
            ${data.data[i].addresses[0].postalCode}</p></li>`
            )}
        else outputResults.push(
            `<li><h3>⛰️Park Name: <u>${data.data[i].fullName}</u></h3>
            <p>Description: ${data.data[i].description}</p> 
            <p>🔗 Website: <a href=${data.data[i].url} target="_blank">${data.data[i].fullName}</a></p>`
        )
    };

    console.log(`this is output results: ${outputResults}`);

    //call Zoom Out function before appending results
    zoomOut();

    //append results to HTML
    $('#ol-results').append(`<h3>Results for ${selectedStates}🏕️${data.data.length} total national parks found:</h3>`);
    $('#ol-results').append(outputResults);

}


function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }


function getResults(selectedStates, quantity){

const baseURL= `https://developer.nps.gov/api/v1/parks`
const apiKey= `DbVFxURkdXI4bDhTSLA4yFwEbZ86xYO5RpfjQ8f3`

    const params = {
        stateCode: selectedStates,
        limit: quantity,
        api_key: apiKey,
      };
      const queryString = formatQueryParams(params)
      const stringedURL = baseURL + '?' + queryString;
    
    /* ALTERNATE METHOD OF STRINGING QUERY PARAMS 
    let stringStatesResults = [];

    //if user selects multiple states, this for loop through selected states
    for (let i=0; i<selectedStates.length;i++){
        //note: review .push() method vs append and when to use them in arrays vs etc
        stringStatesResults.push(selectedStates[i])
        }

    ALTERNATE METHOD OF STRINGING QUERY PARAMS note: some of the var names are different
        //let stateSearchString = "stateCode="+stringStatesResults;
        //let limitResults = "&limit="+quantity;
        //let stringedURL = baseURL+stateSearchString+limitResults+apiKey; */

    console.log(`Fetch Request to URL: ${stringedURL}`);

    fetch(stringedURL)
    .then(response => response.json())
    .then(data => displayResults(data,selectedStates))
    .catch(console.error)
}

//Zoom Out function to Zoom Out display after submit click. (for mobile responsive design)
function zoomOut(){
    $('#submit-button').on('click', function(){
        $('.container').toggleClass('fullscreen');
   })
 }


// Function watches for click of submit button
function watchForm(){
    console.log('watch form function initiated')
    $('#submit-button').click(event=>{
        event.preventDefault();
        console.log('submit button clicked')
        let quantity = $('.js-query-number').val();
        let selectedStates = $('#states').val();
        console.log(`# of search results selected: ${quantity}`);
        console.log(`states user selected: ${selectedStates}`);
        getResults(selectedStates,quantity);
    });
}


watchForm();














