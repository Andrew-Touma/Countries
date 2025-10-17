let countries = [];

function handleSelection() {
    let ddl_countries = document.getElementById('ddl_countries');
    let selected_country = ddl_countries.value;
    let div_flags = document.getElementById('div_flags')
    div_flags.innerHTML = '';

    fetch(`https://restcountries.com/v3.1/name/${selected_country}`)
        .then((response) => response.json())
        .then((json) => {
            let country_info = document.getElementById('country_info');
            let capital = json[0].capital[0];
            let population = json[0].population;
            country_info.className = "Info"
            country_info.innerHTML = `The capital of ${json[0].name.common} is : ${capital}.
            ${json[0].name.common} has a population equal to ${population}`;

            let img_flag = document.createElement('img');
            img_flag.src = json[0].flags.png;
            img_flag.className = 'ClassFlag';
            div_flags.appendChild(img_flag);
        });
}
function ConsumeAPIData() {
    fetch('https://restcountries.com/v3.1/all?fields=name,flags')
        .then((response) => response.json())
        .then((json) => {
            json.forEach(element => {
                countries.push({
                    name: element.name.common,
                    flag: element.flags.png,
                });
            });
        })
}
ConsumeAPIData();

function loadCountries() {
    let ddl_countries = document.getElementById('ddl_countries');
    let div_flags = document.getElementById('div_flags');
    let country_info = document.getElementById('country_info');
    country_info.innerHTML = '';
    div_flags.innerHTML = '';
    countries.sort((a, b) => {
        return a.name.localeCompare(b.name);
    })

    countries.forEach((x) => {
        let option = document.createElement('option');
        option.innerHTML = x.name;
        ddl_countries.appendChild(option);

        let img_flag = document.createElement('img');
        img_flag.src = x.flag;
        img_flag.className = 'ClassFlag';
        img_flag.addEventListener('click', () => {
            alert(x.name);
        })
        div_flags.appendChild(img_flag);
    })

}