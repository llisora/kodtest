
fetch("https://www.forsakringskassan.se/fk_apps/MEKAREST/public/v1/iv-planerad/IVplaneradvardland.json").then((data) => {
    /*console.log(data); */
    return data.json();
}).then((objectData) => {

    const kon_K = objectData.filter(({ dimensions }) => dimensions.kon_kod === "K");
    const kon_M = objectData.filter(({ dimensions }) => dimensions.kon_kod === "M");

    let tableData = "";

    kon_K.map((values, index) => {
        const array = kon_M[index];
        console.log(array)

        if (values.observations.antal.value == null) {
            values.observations.antal.value = 0;
        }

        if (array.observations.antal.value == null) {
            array.observations.antal.value = 0;
        }
        tableData += `            
    <tr>
        <td>${values.dimensions.vardland_kod}</td>
        <td>${values.observations.antal.value}</td>
        <td>${array.observations.antal.value}</td>
        
    </tr>`
    });
    document.getElementById("table1").innerHTML = tableData;
}).catch((err) => {

    console.log(err);
})