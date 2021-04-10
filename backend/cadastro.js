import fs from 'fs';
const configDefault = {
    "subnetIp": "10.0.0.1",
};

let configuracao = configDefault

const fileName = 'config.json';

const readJson = () => configuracao

const writeJson = (config = configDefault) => {
    configuracao = config
}

export { readJson, writeJson, configDefault }



