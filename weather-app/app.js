const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");
const yargs = require("yargs");

yargs.command({
    command: "geocode",
    builder: {
        city: {
            describe: "City to check",
            demandOption: true,
            type: "string"
        }
    },
    handler: (argv) => {
        geocode(argv.city, (error, { latitude, longitude, location }) => {
            if (error) {
                return console.log(error);
            };

            forecast(latitude, longitude, (error, { summary, temperature, precipProbability }) => {
                if (error) {
                    return console.log(error);
                }

                console.log(location);

                const textCallback = summary + " It is currently " + temperature + " degress out. There is a " +
                    precipProbability + "% chance of rain.";
                console.log(textCallback);
            });
        });
    }
})

yargs.parse();