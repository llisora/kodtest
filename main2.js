
fetch("https://www.forsakringskassan.se/fk_apps/MEKAREST/public/v1/iv-planerad/IVplaneradvardland.json").then((data) => {
    /*console.log(data); */
    return data.json();
}).then((objectData) => {

    const kon_K = objectData.filter(({ dimensions }) => dimensions.kon_kod === "K");
    const kon_M = objectData.filter(({ dimensions }) => dimensions.kon_kod === "M");

    const land = kon_K.map(({ dimensions }) => dimensions.vardland_kod);
    const kvinnor = kon_K.map(({ observations }) => observations.antal.value ?? 0);
    const man = kon_M.map(({ observations }) => observations.antal.value ?? 0);

    // Define the data for the Plotly chart
    const chartData = [
        {
            x: land,
            y: kvinnor,
            type: "bar",
            name: "Kvinnor"
        },
        {
            x: land,
            y: man,
            type: "bar",
            name: "Män"
        }
    ];

    // Define the layout for the Plotly chart
    const chartLayout = {
        title: "Antal planerade insatser per län och kön",
        xaxis: {
            title: "Vårdlandskod"
        },
        yaxis: {
            title: "Antal insatser"
        }
    };

    // Create the Plotly chart
    Plotly.newPlot("chart", chartData, chartLayout);


}).catch((err) => {

    console.log(err);
})