const personagensContador = document.getElementById('qtdP')
const veiculosContador = document.getElementById('qtdV')
const planetasContador = document.getElementById('qtdPL')
const starShipsContador = document.getElementById('qtdE')
const charactersList = document.getElementById('plist')
swipiGet("people/")
preencherContadores()




function preencherContadores() {
    // personagensContador.innerHTML = swipiGet("people/").count


    Promise.all([swipiGet("people/"),
            swipiGet("vehicles/"),
            swipiGet("planets/"),
            swipiGet("starships/"),
            swipiGet("species/")

        ])
        .then(function(results) {
            console.log(results)
            personagensContador.innerHTML = results[0].data.count
            veiculosContador.innerHTML = results[1].data.count
            planetasContador.innerHTML = results[2].data.count
            starShipsContador.innerHTML = results[3].data.count
            console.log(results[4].data)
                // Funcoes
            function procurarPlaneta(PL) {
                var home = PL.homeworld.charAt(30)
                const buscarPL = results[2].data.results[home]
                var planetaF = buscarPL.name
                return planetaF
            }

            function buscarEspecie(ES) {
                var SpecieLink = ES.species.toString().charAt(30)
                var buscarS = results[2].data.results[SpecieLink]
                if (buscarS == undefined) {
                    buscarS = "Não informado"
                } else {
                    buscarS = buscarS.name
                }
                return buscarS
            }

            var personagens = results[0].data.results
            personagens.map(function(e) {
                console.log(e)
                var divNova = document.createElement("div");
                var Altura = e.height.toString()
                var tirar_One = Altura.charAt(0)
                var contadorDeString = Altura.length
                if (contadorDeString >= 3) {
                    Altura = Altura.replace(tirar_One, `${tirar_One}.`)
                    Altura = `${Altura} m`
                } else {
                    Altura = `${Altura} cm`

                }

                var genero = e.gender
                if (genero == 'male') {
                    genero = 'Masculino'
                }
                if (genero == 'female') {
                    genero = 'Feminino'
                }
                if (genero == 'n/a') {
                    genero = 'Nenhum'

                }
                divNova.
                className = "personagens_card"
                divNova.innerHTML = `<h1>Nome: ${e.name}</h1>
                <div class="content_personagens_card"> 
                    <p>Altura: ${Altura}</p>
                    <p>Genero: ${genero}</p>
                    <p>Especie: ${buscarEspecie(e)}</p>
                    <p>Planeta de origem: ${procurarPlaneta(e)}</p>
                </div>
              

                `


                console.log(divNova)
                charactersList.appendChild(divNova)

            })
        });
}


function swipiGet(param) {
    return axios.get(`https://swapi.dev/api/${param}`)
}