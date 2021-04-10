import { Subnet } from 'netmap';
import { readJson } from "./cadastro.js";

const getDevices = async () => {
    const config = readJson();
    const subnet = new Subnet(config.subnetIp, { outputFile: './data.json' })
    return await subnet.getHosts()
}
export default getDevices
