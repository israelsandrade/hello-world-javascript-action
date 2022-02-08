const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

try {
  // `who-to-greet` input defined in action metadata file
  // const nameToGreet = core.getInput('who-to-greet');
  // console.log(`Hello ${nameToGreet}!`);
  const sigla = core.getInput('sigla');
  const tipo = core.getInput('tipo');
  const tecnologia = core.getInput('tecnologia');
  
  if (sigla == 'EA9') {
    console.log('Sigla do GitLab');
  }
  else{
    console.log(`Sigla informada: {sigla}`)
  }

  if (['app', 'application', 'aplicação', 'aplicacao'].indexOf(tipo) > -1) {
    console.log('Preparando criação de repositorio de aplicação')
  } else if (['dep', 'dependence', 'dependencia'].indexOf(tipo) > -1){
    console.log('Preparando criação de repositorio de dependencia')
  } else{
    console.log('Tipo de repositorio invalido')
    core.setFailed('Tipo de repositorio invalido');
  }


  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  //const payload = JSON.stringify(github.context.payload, undefined, 2)
  //console.log(`The event payload: ${payload}`);
  axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
    .then(response => {
      console.log(response.data.url);
      console.log("pão");
      console.log(response.data.explanation);
    })
    .catch(error => {
      console.log(error);
    });
} catch (error) {
  core.setFailed(error.message);
}
