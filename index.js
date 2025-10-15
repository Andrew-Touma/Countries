let countries=[];

function handleSelection(){
    let ddl_countries = document.getElementById('ddl_countries');
    let selected_country = ddl_countries.value;

    fetch(`https://restcountries.com/v3.1/name/${selected_country}`)
        .then((response) => response.json())
        .then((json) => {
            let country_info = document.getElementById('country_info');
            let capital = json[0].capital[0];
            let population = json[0].population;
            country_info.innerHTML = `The capital of ${json[0].name.common} is : ${capital} with a population equal to ${population}`;
            // printing population
        });
}
function ConsumeAPIData(){
    fetch('https://restcountries.com/v3.1/all?fields=name,flags')
        .then((response) => response.json())
        .then((json) => {
            json.forEach(element => {
                countries.push( {
                    name: element.name.common,
                    flag: element.flags.png,
                });
            });
        })
}
ConsumeAPIData();

function loadCountries()
{
    let ddl_countries = document.getElementById('ddl_countries');
    let div_flags = document.getElementById('div_flags');

   countries.forEach((x) => {
    let option = document.createElement('option');
    option.innerHTML = x.name;
    ddl_countries.appendChild(option);

    let img_flag = document.createElement('img');
    img_flag.src = x.flag;
    img_flag.className ='ClassFlag';
    img_flag.addEventListener('click', () => {
        alert(x.name);
    })
        div_flags.appendChild(img_flag);
   })

}